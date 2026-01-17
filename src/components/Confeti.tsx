import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "../Utilities/useWindowSize";


export default function ConfetiUI() {

  
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={false}
    />
  );
}
