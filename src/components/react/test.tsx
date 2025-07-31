"use client";

import { useState } from "react";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarDemo() {
  const [_value, _setValue] = useState(100);

  return <AnimatedCircularProgressBar max={100} min={0} value={50} />;
}
