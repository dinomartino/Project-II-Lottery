# Lottery DApp Frontend

This is the frontend for the Lottery DApp, a decentralized application built on the Ethereum Sepolia testnet. The frontend, developed with React and Vite, allows users to interact with a Solidity-based lottery smart contract. Users can connect their MetaMask wallet, view the current prize pool, list of participants, and last winner, and perform actions such as entering the lottery or starting/picking a winner (for the contract owner).

## Overview

The Lottery DApp frontend is a React application built with Vite, integrated with Web3.js for blockchain interaction. It connects to a smart contract deployed on the Sepolia testnet at address [0x7D2c93843CA0C242635ac33A6FBc1d8387f3da58](https://sepolia.etherscan.io/address/0x7D2c93843CA0C242635ac33A6FBc1d8387f3da58). The interface provides a responsive, Tailwind CSS-styled UI for users to participate in the lottery, view real-time data, and monitor contract events.

## Features

- **Wallet Integration**: Connects to MetaMask for user authentication and transaction signing.
- **Real-Time Data**: Displays the current prize pool, list of participants, and last winner.
- **Lottery Actions**: Allows users to:
  - Enter the lottery by paying a 0.001 ETH fee.
  - Start a new lottery round (owner only).
  - Pick a winner after the lottery interval (owner only).
- **Event Monitoring**: Subscribes to contract events (`Enter_lottery`, `Picked_winner`, `Lottery_starts`) for real-time updates.
- **Responsive Design**: Styled with Tailwind CSS for desktop and mobile compatibility.

## Installation

### 1. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 2. Update Contract ABI

Ensure `src/contractInfo.js` contains the correct ABI for the Lottery smart contract and the address `0x7D2c93843CA0C242635ac33A6FBc1d8387f3da58`.

## Usage

### 1. Start the Development Server

Run the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` (or the port displayed in the terminal) in your browser.

### 2. Interact with the DApp

- Connect your MetaMask wallet to the Sepolia testnet.
- **Owner**: Use the “Start Lottery” button to begin a new round or “Pick Winner” after the interval.
- **Participants**: Click “Enter Lottery” to join by paying the 0.001 ETH entrance fee.
- View the prize pool, participants, and last winner in real-time.

## Deployment

Build the frontend for production:

```bash
npm run build
```

Deploy the `dist` folder to a hosting service, such as:

- **Vercel**: Connect your repository and deploy using Vercel’s CLI or GitHub integration.
- **Netlify**: Drag and drop the `dist` folder or link your repository.
- **IPFS**: Upload the `dist` folder for decentralized hosting.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file in the main repository for details.
