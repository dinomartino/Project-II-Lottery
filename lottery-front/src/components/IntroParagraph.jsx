function IntroParagragh() {
  return (
    <div className="text-white flex-col border-1 border-white bg-[#8080804b] rounded-xl sm:px-10 sm:py-3 ml-48 mr-48 open-sans">
      <h2 className="text-xl font-bold text-white mb-1 text-center">
        About My Lottery DApp
      </h2>
      <p className="mb-1">
        My Lottery DApp is a decentralized application built on Ethereum Speolia
        testnet, allowing users to participate in a transparent and fair lottery
        system. As the contract owner, you can start a new lottery round,
        setting the stage for players to join. Anyone can enter by paying a
        small entrance fee, which contributes to the prize pool. Once the
        lottery duration ends, the owner selects a winner randomly, distributing
        95% of the pool to the winner and 5% as a commission to the owner. All
        transactions are securely handled on the blockchain, ensuring trust and
        immutability.
      </p>
    </div>
  );
}

export default IntroParagragh;
