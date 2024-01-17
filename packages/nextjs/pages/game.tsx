import React, { useState } from "react";
import dynamic from "next/dynamic";
import Box from "../components/game/Box";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then(mod => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then(mod => {
      return mod.Droppable;
    }),
  { ssr: false },
);

const Board: NextPage = () => {
  const [boxes, setBoxes] = useState([
    { id: "box-0", color: "#ff6347" },
    { id: "box-1", color: "#ffd700" },
    { id: "box-2", color: "#32cd32" },
    { id: "box-3", color: "#6495ed" },
    { id: "box-4", color: "#ff69b4" },
    { id: "box-5", color: "#00ced1" },
    { id: "box-6", color: "#8a2be2" },
    { id: "box-7", color: "#ff4500" },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedBoxes = Array.from(boxes);
    const [movedBox] = updatedBoxes.splice(result.source.index, 1);
    updatedBoxes.splice(result.destination.index, 0, movedBox);

    setBoxes(updatedBoxes);
  };

  return (
    <>
      <MetaHeader />
      <div className="flex justify-center h-screen mt-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="table" direction="horizontal">
            {provided => (
              <div
                className="relative w-[500px] h-[400px] bg-slate-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boxes.map((box, index) => (
                  <Box key={box.id} color={box.color} index={index} id={box.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
