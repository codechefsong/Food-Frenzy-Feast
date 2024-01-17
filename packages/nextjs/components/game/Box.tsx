import React from "react";
import dynamic from "next/dynamic";

const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then(mod => {
      return mod.Draggable;
    }),
  { ssr: false },
);

const Box = ({ color, index, id }: any) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`box w-10 h-10 absolute box-${index}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: color,
            boxShadow: snapshot.isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            ...provided.draggableProps.style,
          }}
        >
          <div>{id}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Box;
