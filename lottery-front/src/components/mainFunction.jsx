import { useContext } from "react";
import ConnectContext from "../ConnectContext";

function MainFunction() {
  const { isConnected, account, contract } = useContext(ConnectContext);

  async function startLottery() {
    const check = await contract.methods.isOpen().call();
    console.log("isOpen:", check);
    await contract.methods.startLottery().send({ from: account });
    // console.log();
  }

  async function enterLottery() {
    await contract.methods
      .enterLottery()
      .send({ from: account, value: 1000000000000000 });
  }

  async function pickWinner() {
    await contract.methods.pickWinner().send({ from: account });
  }
  return (
    <>
      {isConnected ? (
        <section className="relative flex items-center gap-2 bg-[#8080804b] rounded-xl sm:px-10 sm:py-3 ml-10 mr-10 min-h-[300px]">
          <div className="flex flex-col h-40 justify-between ">
            <button onClick={startLottery}>Start Lottery</button>
            <button
              onClick={enterLottery}
              className=" bg-linear-to-br from-green-400 to-blue-600  duration-500 hover:bg-linear-to-br hover:to-green-400 hover:from-blue-600 hover:transition hover:duration-300"
            >
              <span className="text-[#b0f5fc]">Enter Lottery</span>
            </button>
            <button onClick={pickWinner}>Pick Winner</button>
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
