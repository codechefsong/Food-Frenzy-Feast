import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const menuItems = [
  { url: "/orange.png", points: 3 },
  { url: "/apple.png", points: 4 },
  { url: "/pumpkin.png", points: 5 },
  { url: "/egg.png", points: 6 },
  { url: "/pizza.png", points: 7 },
  { url: "/pie.png", points: 8 },
  { url: "/hamburger.png", points: 9 },
  { url: "/cake.png", points: 10 },
];

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

  const { data: players } = useScaffoldContractRead({
    contractName: "FoodFrenzyFeast",
    functionName: "getPlayersByID",
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

  const { writeAsync: moveTableToRight } = useScaffoldContractWrite({
    contractName: "FoodFrenzyFeast",
    functionName: "moveTableToRight",
    args: [id as any],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center mt-7 mb-5">
        <span className="block text-2xl mb-2">Match #{id}</span>
      </h1>
      <div className="grid lg:grid-cols-2">
        <div className="px-5">
          <p>Table</p>
          <div className="relative w-[400px] h-[400px] bg-blue-400 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] rounded-full bg-amber-400 ">
              {foods?.map((f, index) => (
                <p key={index} className={`absolute w-[50px] h-[50px] bg-white rounded-full food-${index}`}>
                  {/* {f.toString()} */}
                  <Image className="mt-1 ml-1" alt="Food" width={40} height={40} src={menuItems[Number(f)].url} />
                </p>
              ))}
            </div>
            {players?.map((p, index) => (
              <p key={index} className={`absolute w-[50px] h-[50px] bg-white chair-${index}`}>
                <Address address={p} />
                {p === address && <p className="mt-0">(You)</p>}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p>Your Foods</p>
          <div className="flex flex-wrap w-[400px] gap-3 mb-3">
            {playerBag?.map((p, index) => (
              <p key={index} className="w-[70px] h-[70px] bg-white rounded-full">
                <Image className="mt-1 ml-1" alt="Food" width={60} height={60} src={menuItems[Number(p)].url} />
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {!matchData?.isStarted && (
              <button
                className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
                onClick={() => startGame()}
              >
                Start Game
              </button>
            )}
            {matchData?.isStarted && (
              <button
                className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
                onClick={() => takeFood()}
              >
                Take Food
              </button>
            )}
            {matchData?.isStarted && (
              <button
                className="py-2 px-16 mb-1 mt-3 bg-orange-500 rounded baseline hover:bg-orange-300 disabled:opacity-50"
                onClick={() => moveTableToRight()}
              >
                Move Table
              </button>
            )}
            <button
              className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
              onClick={() => router.push("/lobby")}
            >
              Back
            </button>
            <h2 className="mt-5 text-[20px]">Points</h2>
            <ul className="bg-white">
              {menuItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <Image className="mt-1 ml-1" alt="Food" width={40} height={40} src={item.url} />
                    <span className="font-bold ml-3">3X</span>
                  </div>
                  <span className="font-bold">{item.points} points</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchRoom;
