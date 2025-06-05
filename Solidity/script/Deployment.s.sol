// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {Lottery} from "../src/Lottery.sol";

contract Deployment is Script {
    function run() public returns (Lottery) {
        Lottery lottery;
        vm.startBroadcast();
        lottery = new Lottery(2 minutes, 0.001 ether);
        vm.stopBroadcast();
        return (lottery);
    }
}
