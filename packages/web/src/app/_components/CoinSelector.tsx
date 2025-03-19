import Image from "next/image";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  defaultValue?: string;
  placeholder: string;
};

const CoinSelector = ({ defaultValue, placeholder }: Props) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="blue">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="yellow">
        <SelectGroup>
          <SelectLabel>Coins</SelectLabel>
          <SelectItem value="usdc">
            <div className="flex items-center gap-2">
              <Image
                alt="ethereum"
                src="/assets/icons/usdc.png"
                height={20}
                width={20}
              />
              <span>USDC</span>
            </div>
          </SelectItem>
          <SelectItem value="hudl">
            <div className="flex items-center gap-2">
              <Image
                alt="ethereum"
                src="/assets/icons/hudl.png"
                height={20}
                width={20}
                className="rounded-full"
              />
              <span>HUDL</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CoinSelector;
