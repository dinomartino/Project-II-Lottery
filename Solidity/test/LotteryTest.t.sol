// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {console, Test} from "forge-std/Test.sol";
import {Lottery} from "../src/Lottery.sol";
import {Deployment} from "../script/Deployment.s.sol";

contract LotteryTest is Test {
    Lottery lottery;
    address player1 = address(0x2);
    address player2 = address(0x3);
    uint256 constant INTERVAL = 2 minutes;
    uint256 constant ENTRANCE_FEE = 0.001 ether;

    event Enter_lottery(address indexed player);
    event Picked_winner(address indexed winner);
    event Lottery_starts(uint256 indexed startingTime);

    function setUp() public {
        Deployment deployer = new Deployment();
        lottery = deployer.run();
    }

    function testConstructor() public view {
        assertEq(lottery.getInterval(), INTERVAL);
        assertEq(lottery.getEntranceFee(), ENTRANCE_FEE);
        assertEq(lottery.isOpen(), false);
    }

    function testStartLottery() public {
        vm.prank(lottery.getOwner());
        vm.expectEmit(true, false, false, true);
        emit Lottery_starts(block.timestamp);
        lottery.startLottery();
        assertEq(lottery.isOpen(), true);
        assertEq(lottery.getStartingTime(), block.timestamp);
    }

    function testStartLotteryOnlyOwner() public {
        vm.prank(player1);
        vm.expectRevert(Lottery.Function_only_for_owner.selector);
        lottery.startLottery();
    }

    function testStartLotteryAlreadyStarted() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.prank(lottery.getOwner());
        vm.expectRevert(Lottery.Lottery_already_started.selector);
        lottery.startLottery();
    }

    function testEnterLottery() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.deal(player1, 1 ether);
        vm.prank(player1);
        vm.expectEmit(true, false, false, true);
        emit Enter_lottery(player1);
        lottery.enterLottery{value: ENTRANCE_FEE}();
        assertEq(lottery.getPool(), ENTRANCE_FEE);
        address[] memory participants = lottery.getParticipants();
        assertEq(participants.length, 1);
        assertEq(participants[0], player1);
    }

    function testEnterLotteryNotOpen() public {
        vm.prank(player1);
        vm.deal(player1, 1 ether);
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Lottery_not_open.selector)
        );
        lottery.enterLottery{value: ENTRANCE_FEE}();
    }

    function testEnterLotteryAlreadyEntered() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.deal(player1, 1 ether);
        vm.prank(player1);
        lottery.enterLottery{value: ENTRANCE_FEE}();
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Already_entered.selector)
        );
        vm.prank(player1);
        lottery.enterLottery{value: ENTRANCE_FEE}();
    }

    function testEnterLotteryNotEnoughFee() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.deal(player1, 1 ether);
        vm.prank(player1);
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Not_enough_fee.selector)
        );
        lottery.enterLottery{value: ENTRANCE_FEE - 1}();
    }

    function testPickWinner() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);
        uint256 initialPlayer1Balance = player1.balance;
        uint256 initialPlayer2Balance = player2.balance;
        vm.prank(player1);
        lottery.enterLottery{value: ENTRANCE_FEE}();
        vm.prank(player2);
        lottery.enterLottery{value: ENTRANCE_FEE}();
        vm.warp(block.timestamp + INTERVAL + 1);
        uint256 initialOwnerBalance = address(this).balance;

        vm.prank(lottery.getOwner());
        vm.expectEmit(true, false, false, true);
        emit Picked_winner(player1);
        vm.prank(lottery.getOwner());
        lottery.pickWinner();

        assertEq(lottery.isOpen(), false);
        assertEq(lottery.getPool(), 0);
        assertEq(lottery.getParticipants().length, 0);
        uint256 prize = (ENTRANCE_FEE * 2 * 95) / 100;
        uint256 commission = (ENTRANCE_FEE * 2 * 5) / 100;
        address winner = lottery.getWinner();
        if (winner == player1) {
            assertEq(
                player1.balance,
                initialPlayer1Balance - ENTRANCE_FEE + prize
            );
            assertEq(player2.balance, initialPlayer2Balance - ENTRANCE_FEE);
        } else {
            assertEq(
                player2.balance,
                initialPlayer2Balance - ENTRANCE_FEE + prize
            );
            assertEq(player1.balance, initialPlayer1Balance - ENTRANCE_FEE);
        }
        assertEq(lottery.getOwner().balance, initialOwnerBalance + commission);
        // console.log(player2.balance);
        // console.log(player1.balance);
    }

    function testPickWinnerOnlyOwner() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.prank(player1);
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Function_only_for_owner.selector)
        );
        lottery.pickWinner();
    }

    function testPickWinnerStillOngoing() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.prank(lottery.getOwner());
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Lottery_still_ongoing.selector)
        );
        lottery.pickWinner();
    }

    function testPickWinnerNoParticipants() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        vm.warp(block.timestamp + INTERVAL + 1);
        vm.prank(lottery.getOwner());
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.No_participants.selector)
        );
        lottery.pickWinner();
    }

    function testPickWinnerPrizeTransferFailed() public {
        vm.prank(lottery.getOwner());
        lottery.startLottery();
        address payable badRecipient = payable(address(new BadRecipient()));
        vm.deal(badRecipient, 1 ether);
        vm.prank(badRecipient);
        lottery.enterLottery{value: ENTRANCE_FEE}();
        vm.warp(block.timestamp + INTERVAL + 1);
        vm.prank(lottery.getOwner());
        vm.expectRevert(
            abi.encodeWithSelector(Lottery.Prize_transfer_failed.selector)
        );
        lottery.pickWinner();
    }
}

// Contract to simulate a recipient that rejects Ether transfers
contract BadRecipient {
    receive() external payable {
        revert("Rejecting Ether");
    }
}
