# Lottery Smart Contract

## Overview
The **Lottery** smart contract is a decentralized application built on Ethereum, allowing users to participate in a time-based lottery. Players enter by paying an entrance fee, and after a predefined interval, the contract owner selects a winner who receives 95% of the prize pool, with the remaining 5% going to the owner as a commission. The contract is written in Solidity (`^0.8.0`) and uses Foundry for testing and deployment.

## Features
- **Owner-Controlled Lottery**: Only the contract owner can start the lottery and pick a winner.
- **Entrance Fee**: Players must pay a fixed entrance fee (default: 0.001 ETH) to participate.
- **Time-Based**: The lottery runs for a fixed interval (default: 2 minutes), after which a winner is picked.
- **Prize Distribution**: 95% of the pool goes to the winner, and 5% is sent to the owner.
- **Random Winner Selection**: Uses `keccak256` for pseudo-random winner selection (upgradable to Chainlink VRF for true randomness).
- **Events**: Emits events for lottery start (`Lottery_starts`), player entry (`Enter_lottery`), and winner selection (`Picked_winner`).
- **Error Handling**: Custom errors for invalid states (e.g., `Lottery_not_open`, `Not_enough_fee`, `Prize_transfer_failed`).

## Contract Details
- **Solidity Version**: `^0.8.0`
- **License**: MIT
- **Key Functions**:
  - `startLottery()`: Starts a new lottery round (owner-only).
  - `enterLottery()`: Allows players to enter by paying the entrance fee.
  - `pickWinner()`: Selects a winner, distributes prizes, and resets the lottery (owner-only).
  - Getter functions: `getPool`, `getParticipants`, `getWinner`, `isOpen`, `getEntranceFee`, `getInterval`, `getStartingTime`, `getOwner`.

## Setup and Installation
### Prerequisites
- [Foundry](https://github.com/foundry-rs/foundry): For compiling, testing, and deploying the contract.
- [Git](https://git-scm.com/): For cloning the repository.

### Installation
1. **Install Foundry**:
   If not already installed, run:
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

2. **Install Dependencies**:
   Ensure Foundry dependencies are installed:
   ```bash
   forge install
   ```

3. **Compile the Contract**:
   ```bash
   forge build
   ```

## Testing
The contract includes a comprehensive test suite (`LotteryTest.t.sol`) built with Foundry. Tests cover:
- Constructor initialization.
- Starting the lottery (success and failure cases).
- Entering the lottery (success and failure cases).
- Picking a winner, including prize/commission distribution and state resets.
- Edge cases like insufficient fees, non-owner access, and failed transfers.

### Run Tests
```bash
forge test -vvv
```
This command runs all tests with verbose output. The test suite uses a `Deployment.s.sol` script to deploy the contract with:
- `INTERVAL = 2 minutes`
- `ENTRANCE_FEE = 0.001 ether`

## Deployment
The `Deployment.s.sol` script deploys the contract to a network of your choice. To deploy:
1. Configure your `.env` file with:
   ```env
   PRIVATE_KEY=<your-private-key>
   RPC_URL=<your-rpc-url>
   ```
2. Deploy the contract:
   ```bash
   forge script script/Deployment.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
   ```

## Usage
1. **Start the Lottery**:
   - The owner calls `startLottery()` to open the lottery.
   - Emits `Lottery_starts(block.timestamp)`.

2. **Enter the Lottery**:
   - Players send at least `0.001 ETH` to `enterLottery()`.
   - Emits `Enter_lottery(player_address)`.

3. **Pick a Winner**:
   - After `2 minutes`, the owner calls `pickWinner()`.
   - A winner is selected pseudo-randomly, receiving 95% of the pool.
   - The owner receives 5% as commission.
   - Emits `Picked_winner(winner_address)`.

4. **Check State**:
   - Use getters like `getPool()`, `getParticipants()`, or `getWinner()` to query the contract state.

## Security Considerations
- **Randomness**: The current implementation uses `keccak256` with `blockhash` for winner selection, which is pseudo-random and potentially vulnerable to miner manipulation. Consider integrating Chainlink VRF for production.
- **Reentrancy**: The contract uses `call` for transfers, which is safe with proper checks, but ensure recipient contracts are trusted.
- **Gas Optimization**: The `getParticipants()` function creates a new array, which could be costly for large participant lists. Optimize for production if needed.
- **Owner Privileges**: The owner has significant control (starting/picking winners). Consider multi-sig or decentralized governance for fairness.

## Future Improvements
- Integrate Chainlink VRF for secure randomness.
- Add a function to allow the owner to update the entrance fee or interval (with restrictions).
- Implement a pause/unpause mechanism for emergency stops.
- Add support for multiple winners or variable prize distributions.

## License
This project is licensed under the MIT License.
