"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import CoinSelector from "./CoinSelector";

type Props = {
  defaultValue?: string;
  className?: string;
  title: string;
  value: string;
  setActiveChain: (value: string) => void;
};

const ChainSelector = ({
  defaultValue,
  className,
  title,
  value,
  setActiveChain,
}: Props) => {
  const ethChains = ["sepolia"];
  return (
    <div
      className={cn(
        "bg-white  border-2 border-b-4 border-r-4 border-black rounded-lg px-6 py-8 md:pr-8",
        // "bg-white/50 backdrop-blur-xl border border-slate-400 rounded-lg px-6 py-8 pr-36 md:pr-8",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="rounded-lg border-2 border-b-4 border-r-4 border-black aspect-square overflow-hidden">
          <Image
            src={`/assets/icons/${ethChains.includes(value) ? "ethereum" : "hudl"}.png`}
            alt="hudlTestnet"
            height={60}
            width={60}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-slate-500 text-sm">{title}</div>
          {/* <div className="text-black text-lg my-1">Hudl Testnet</div> */}
          <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={(value) => {
              setActiveChain(value);
              console.log({ value });
            }}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder={"Select a chain"} />
            </SelectTrigger>
            <SelectContent className="yellow">
              <SelectGroup>
                <SelectLabel>Coins</SelectLabel>
                <SelectItem value="hudl">
                  <div className="flex items-center gap-2">
                    <span>Hudl Testnet</span>
                  </div>
                </SelectItem>
                <SelectItem value="sepolia">
                  <div className="flex items-center gap-2">
                    <span>Sepolia</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bg-zinc-100 text-zinc-500 border border-zinc-300 w-fit mt-4 text-xs px-2 py-1 rounded-lg">
        Balance: 0.0 ETH
      </div>
    </div>
  );
};

export default ChainSelector;
