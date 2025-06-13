import ConnectButton from "./ConnectButton";
import React from "react";

function Navbar() {
  return (
    <nav className="relative flex justify-end items-center px-4 py-3 sm:px-4 sm:py-5">
      <h1 className="text-gradient-reverse absolute inset-0">Lottery Dapp</h1>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
}

export default Navbar;
