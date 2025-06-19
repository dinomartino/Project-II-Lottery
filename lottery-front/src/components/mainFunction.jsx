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
        <section className="relative flex bg-[#8080804b] rounded-xl sm:px-10 sm:py-3 ml-10 mr-10 min-h-[300px]">
          <button onClick={startLottery}>Start Lottery</button>
          <button onClick={enterLottery}>Enter Lottery</button>
          <button onClick={pickWinner}>Pick Winner</button>
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
