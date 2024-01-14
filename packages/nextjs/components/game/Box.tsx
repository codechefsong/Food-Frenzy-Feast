import React from "react";

const Box = ({ color, index, totalBoxes }: any) => {
  const angle = (360 / totalBoxes) * index;
  const transformStyle = `rotate(${angle}deg) translate(100px) rotate(${-angle}deg)`;

  return (
    <div className="box" style={{ backgroundColor: color, transform: transformStyle }}>
      {index + 1}
    </div>
  );
};

export default Box;
