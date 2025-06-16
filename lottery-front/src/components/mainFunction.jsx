import { useContext } from "react";
import ConnectContext from "../ConnectContext";

function MainFunction() {
  const { isConnected } = useContext(ConnectContext);
  return (
    <>
      {isConnected ? (
        <div className="relative flex bg-[#8080804b] rounded-xl sm:px-10 sm:py-3 ml-10 mr-10 min-h-[300px]">
          <p className="text-white">sdfafasdfasdfsdf</p>
        </div>
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
