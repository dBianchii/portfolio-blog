import { useState } from "react";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";
import { useAtom } from "jotai/react";
import { colorValue, dialValue } from "./atoms";
import { ColorPicker } from "./ui/color-picker";

export function AvatarDial({ children }: { children?: React.ReactNode }) {
  const [value, setValue] = useAtom(dialValue);
  const [color, setColor] = useAtom(colorValue);
  const [open, setOpen] = useState(false);
  return (
    <>
      <ColorPicker
        open={open}
        setOpen={(open) => {
          setOpen(open);
        }}
        value={color}
        onChange={setColor}
      />
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        onClickRing={() => setOpen(true)}
        value={value}
        onChange={setValue}
      >
        {children}
      </AnimatedCircularProgressBar>
    </>
  );
}
