"use client";

import React, { useState } from "react";
import ChainSelector from "./ChainSelector";
import { Button } from "~/components/ui/button";
import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";

const BridgeSelector = () => {
  const [chains, setChains] = useState({
    from: "sepolia",
    to: "hudl",
  });

  const switchChains = () =>
    setChains((prev) => ({ from: prev.to, to: prev.from }));

  return (
    <div className="flex flex-col gap-2 relative mx-auto ">
      <ChainSelector
        className="translate-y-5"
        title="From"
        defaultValue="sepolia"
        value={chains.from}
        setActiveChain={(activeChain) => {
          if (activeChain === chains.to) {
            switchChains();
          } else {
            setChains((prev) => ({ ...prev, from: activeChain }));
          }
        }}
      />
      <Button
        onClick={switchChains}
        className=" bg-white gap-2 text-black w-fit mx-auto z-10  flex items-center border border-zinc-300 text-sm px-3 py-2 rounded-lg"
      >
        Swap
        <ArrowsUpDownIcon className="h-4 font-thin" />
      </Button>
      <ChainSelector
        className="-translate-y-5"
        title="To"
        defaultValue="hudl"
        value={chains.to}
        setActiveChain={(activeChain) => {
          if (activeChain === chains.from) {
            switchChains();
          } else {
            setChains((prev) => ({ ...prev, to: activeChain }));
          }
        }}
      />
    </div>
  );
};

export default BridgeSelector;
