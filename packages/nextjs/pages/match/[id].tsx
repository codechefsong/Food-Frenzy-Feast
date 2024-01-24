import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MatchRoom: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { id } = router.query;

  const { data: matchData } = useScaffoldContractRead({
    contractName: "FoodFrenzyFeast",
    functionName: "getMatcheByID",
    args: [id as any],
  });

  const { data: foods } = useScaffoldContractRead({
    contractName: "FoodFrenzyFeast",
    functionName: "getGame",
    args: [id as any],
  });

  const { data: playerBag } = useScaffoldContractRead({
    contractName: "FoodFrenzyFeast",
    functionName: "getPlayerBag",
    args: [address as any],
  });

  const { writeAsync: startGame } = useScaffoldContractWrite({
    contractName: "FoodFrenzyFeast",
    functionName: "startGame",
    args: [id as any],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  const { writeAsync: takeFood } = useScaffoldContractWrite({
    contractName: "FoodFrenzyFeast",
    functionName: "takeFood",
    args: [id as any],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Match #{id}</span>
        </h1>

        <p>Table</p>
        <div className="relative w-[400px] h-[400px] rounded-full bg-amber-400">
          {foods?.map((f, index) => (
            <p key={index} className={`absolute w-[70px] h-[70px] bg-white rounded-full food-${index}`}>
              {f.toString()}
              <Image className="mt-1 ml-1" alt="Food" width={60} height={60} src="/pie.png" />
            </p>
          ))}
        </div>

        <p>Your Foods</p>
        <div className="flex flex-wrap w-[400px] gap-3 mb-3">
          {playerBag?.map((p, index) => (
            <p key={index} className="w-[70px] h-[70px] bg-white rounded-full">
              {p.toString()}
              <Image className="mt-1 ml-1" alt="Food" width={60} height={60} src="/pie.png" />
            </p>
          ))}
        </div>
        {!matchData?.isStarted && (
          <button
            className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => startGame()}
          >
            Start Game
          </button>
        )}
        {matchData?.isStarted && (
          <button
            className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => takeFood()}
          >
            Take Food
          </button>
        )}
        <button
          className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
          onClick={() => router.push("/lobby")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MatchRoom;
