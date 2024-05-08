"use client"
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <>
      <Typewriter
        words={["Fullstack software developer", "Fullstack web developer","Mobile app developer","tech enthusiast"]}
        loop={false}
        cursor
        cursorStyle="|"
        typeSpeed={150}
        deleteSpeed={120}
        delaySpeed={1000}      
      />
    </>
  );
};

export default TypeWriter;
