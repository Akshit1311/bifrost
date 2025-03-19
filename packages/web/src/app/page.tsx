import {
  ArrowRightCircleIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/16/solid";

import { api, HydrateClient } from "~/trpc/server";
import ChainSelector from "./_components/ChainSelector";
import HeroTitle from "./_components/HeroTitle";
import { Input } from "~/components/ui/input";
import CoinSelector from "./_components/CoinSelector";
import { Button } from "~/components/ui/button";
import { Terminal } from "lucide-react";
import Image from "next/image";
import BridgeSelector from "./_components/BridgeSelector";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      {/* <main className="text-white flex min-h-screen flex-col items-center justify-center bg-blue-500 bg-cover bg-center"> */}
      <main className="text-white flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(rgba(0,100,255,0),rgba(0,100,255,0.8)),url(/assets/images/bifrost.webp)] bg-cover bg-center">
        <div className="w-fit ">
          <HeroTitle />

          <div className="md:w-[450px] mx-auto px-2">
            <BridgeSelector />

            <div className="my-2 flex gap-2">
              <CoinSelector placeholder="Select Asset" defaultValue="hudl" />
              <Input placeholder="Amount" />
            </div>

            <Button className="w-full my-4">Bridge</Button>

            <div className="text-center text-sm my-4">
              Made with ❤️ by axit.eth
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
