"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(100);

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={50}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
