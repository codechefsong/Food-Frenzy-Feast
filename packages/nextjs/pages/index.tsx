import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Food Frenzy Feast</span>
          </h1>
          <Image className="ml-8" alt="Game" width={400} height={350} src="/game.png" />
          <p className="text-center text-lg mb-0">Choose 10 random foods from a table</p>
          <p className="text-center text-lg mt-0">Receive bonus points for matching foods</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/board"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Play
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl">How to Play</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <h3 className="text-2xl">To win:</h3>
              <p>
                Earn the highest score by strategically selecting 10 random foods from the table, matching them for
                bonus points
              </p>
              <h2 className="mt-3 text-2xl">Gameplay</h2>
              <ul className="list-disc" style={{ width: "600px" }}>
                <li>A table is set with an assortment of random foods, each assigned different point values</li>
                <li>Earn bonus points by matching identical food items</li>
                <li>When a food is taken, a new random one is replaced</li>
                <li>You can rotate the table to the right</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
