// Contract elements should be laid out in the following order:
// Pragma statements
// Import statements
// Events
// Errors
// Interfaces
// Libraries
// Contracts

// Inside each contract, library or interface, use the following order:
// Type declarations
// State variables
// Events
// Errors
// Modifiers
// Functions

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract Lottery {
    uint256 private immutable i_interval;
    uint256 private immutable i_entranceFee;
    address private immutable i_owner;

    uint256 private s_pool;
    uint256 private s_winnerId;
    uint256 private s_startingTime;
    bool private s_isOpen = false;
    address private s_winnerAddress;

    address payable[] private s_holders;
    mapping(address => bool) private address_isEntered;

    event Enter_lottery(address indexed player);
    event Picked_winner(address indexed winner);
    event Lottery_starts(uint256 indexed startingTime);

    error Lottery_not_open();
    error Already_entered();
    error Not_enough_fee();
    error Prize_transfer_failed();
    error Commission_transfer_failed();
    error Function_only_for_owner();
    error Lottery_already_started();
    error Lottery_still_ongoing();
    error No_participants();

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert Function_only_for_owner();
        _;
    }

    constructor(uint256 interval, uint256 entranceFee) {
        i_interval = interval;
        i_entranceFee = entranceFee;
        i_owner = msg.sender;
    }

    function startLottery() public onlyOwner {
        if (!s_isOpen) {
            s_isOpen = true;
            s_startingTime = block.timestamp;
            emit Lottery_starts(s_startingTime);
        } else revert Lottery_already_started();
    }

    function enterLottery() external payable {
        if (!s_isOpen) revert Lottery_not_open();
        if (address_isEntered[msg.sender]) revert Already_entered();
        if (msg.value < i_entranceFee) revert Not_enough_fee();
        s_holders.push(payable(msg.sender));
        address_isEntered[msg.sender] = true;

        s_pool += msg.value;

        emit Enter_lottery(msg.sender);
    }

    function pickWinner() public onlyOwner {
        if (block.timestamp < (s_startingTime + i_interval)) {
            revert Lottery_still_ongoing();
        }
        if (s_holders.length == 0) revert No_participants();
        uint256 prize = (s_pool * 95) / 100;
        uint256 commission = (s_pool * 5) / 100;

        s_isOpen = false;
        // randomness using keccak256, may modify to chainlinkVRF in the future
        s_winnerId =
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        s_holders.length
                    )
                )
            ) %
            s_holders.length;
        address payable recentWinner = s_holders[s_winnerId];
        s_winnerAddress = recentWinner;

        // Reset address_isEntered mapping before clearing s_holders
        for (uint256 i = 0; i < s_holders.length; i++) {
            address_isEntered[s_holders[i]] = false;
        }
        s_holders = new address payable[](0);

        (bool w_success, ) = recentWinner.call{value: prize}("");
        (bool o_success, ) = i_owner.call{value: commission}("");
        if (!w_success) revert Prize_transfer_failed();
        if (!o_success) revert Commission_transfer_failed();
        s_pool = 0;

        emit Picked_winner(s_winnerAddress);
    }

    receive() external payable {
        revert("Rejecting Ether");
    }

    // Getter Functions
    function getOwner() external view returns (address) {
        return i_owner;
    }

    function getPool() external view returns (uint256) {
        return s_pool;
    }

    function getParticipants() external view returns (address[] memory) {
        address[] memory participants = new address[](s_holders.length);
        for (uint256 i = 0; i < s_holders.length; i++) {
            participants[i] = s_holders[i];
        }
        return participants;
    }

    function getWinner() external view returns (address) {
        return s_winnerAddress;
    }

    function isOpen() external view returns (bool) {
        return s_isOpen;
    }

    function getEntranceFee() external view returns (uint256) {
        return i_entranceFee;
    }

    function getInterval() external view returns (uint256) {
        return i_interval;
    }

    function getStartingTime() external view returns (uint256) {
        return s_startingTime;
    }
}
