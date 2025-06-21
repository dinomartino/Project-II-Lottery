import { useContext, useEffect } from "react";
import ConnectContext from "../ConnectContext";

function MainFunction() {
  const {
    web3,
    isConnected,
    account,
    contract,
    participants,
    prizepool,
    winner,
  } = useContext(ConnectContext);

  async function startLottery() {
    const check = await contract.methods.isOpen().call();
    // console.log("isOpen:", check);
    await contract.methods.startLottery().send({ from: account });
  }

  async function enterLottery() {
    await contract.methods
      .enterLottery()
      .send({ from: account, value: 1000000000000000 });
  }

  async function pickWinner() {
    await contract.methods.pickWinner().send({ from: account });
  }

  function truncateAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  }
  const showResult =
    web3 && prizepool ? web3.utils.fromWei(prizepool, "ether") : "0";

  return (
    <>
      {isConnected ? (
        <section className="flex items-center gap-10 bg-[#8080804b] rounded-xl sm:px-10 sm:py-3 ml-30 mr-30 min-h-[300px]">
          <div className="flex flex-col h-40 justify-between  w-40">
            <button onClick={startLottery}>Start Lottery</button>
            <button
              onClick={enterLottery}
              className=" bg-linear-to-br from-green-400 to-blue-600  duration-500 hover:bg-linear-to-br hover:to-green-400 hover:from-blue-600 hover:transition hover:duration-300"
            >
              <span className="text-[#b0f5fc]">Enter Lottery</span>
            </button>
            <button onClick={pickWinner}>Pick Winner</button>
          </div>
          <div className=" w-full min-h-[260px]  flex text-white ">
            <div className="pl-5 pt-2 text-lg">
              Current participants:
              <br />
              <>
                {participants.length > 0 ? (
                  <ul className="pl-6">
                    {participants.map((address, index) => (
                      <li key={index} className="">
                        {address}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="pl-6">No participants yet</p>
                )}
              </>
            </div>
            <div className="flex flex-col justify-center gap-10 ml-28 mr-28 text-2xl">
              <div className="flex flex-col items-center w-fit chakra-petch-bold text-center  w-full">
                PRIZEPOOL
                <span className=" text-[#FFD700]"> {showResult} ETH</span>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                Last winner
                <span className="text-gradient">{truncateAddress(winner)}</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-[#8080804b] max-w-max mx-auto p-3.5 rounded-lg flex flex-row items-center gap-2 ">
          <img src="caution.svg" className="w-6 h-6" />

          <p className="text-xl font-bold text-[#ec1010] ">
            Please connect your wallet to continue
          </p>
        </div>
      )}
    </>
  );
}

export default MainFunction;
