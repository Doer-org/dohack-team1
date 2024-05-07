"use client";
import Image from "next/image";
import React, { useState } from "react";
const printWorld = (s: string) => {
  console.log(s);
};
type MyButtonProps = {
  onClick: () => void;
  text: string;
};
const MyButton: React.FC<MyButtonProps> = (props) => {
  return (
    <button
      style={{
        padding: "0.5rem 1.5rem",
        borderRadius: "1rem",
        border: "solid 1px #bbbbbb",
        backgroundColor: "white",
        fontWeight: "bold",
      }}
      // onClick={() => printWorld("World")}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
export default function Home() {
  const [count, setCount] = useState(0);
  console.log(`pokemon ${count}`);
  return (
    <>
      apple {count}
      <button onClick={() => setCount((v) => v + 10)}>plus</button>
      <button onClick={() => setCount((v) => v - 1)}>minus</button>
      <MyButton onClick={() => printWorld("World")} text={"mikan"} />
      <MyButton onClick={() => printWorld("World")} text={"budou"} />
    </>
  );
}
