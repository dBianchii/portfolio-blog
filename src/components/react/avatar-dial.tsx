import { useAtom } from "jotai/react";
import { colorBrightnessPercentAtom, useColor } from "./atoms";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";

export function AvatarDial({ children }: { children?: React.ReactNode }) {
  const [value, setValue] = useAtom(colorBrightnessPercentAtom);
  const { changeHue } = useColor();

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      onClickRing={() => {
        changeHue();
      }}
      value={value}
      onChange={setValue}
    >
      {children}
    </AnimatedCircularProgressBar>
  );
}
