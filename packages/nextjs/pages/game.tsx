import Box from "../components/game/Box";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Board: NextPage = () => {
  const totalBoxes = 8;
  const colors = ["#ff6347", "#ffd700", "#32cd32", "#6495ed", "#ff69b4", "#00ced1", "#8a2be2", "#ff4500"];

  return (
    <>
      <MetaHeader />
      <div className="flex items-center justify-center h-screen">
        {colors.map((color, index) => (
          <Box key={index} color={color} index={index} totalBoxes={totalBoxes} />
        ))}
      </div>
    </>
  );
};

export default Board;
