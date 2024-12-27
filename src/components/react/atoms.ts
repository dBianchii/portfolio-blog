import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

export const colorBrightnessPercentAtom = atomWithStorage(
  "dialValue",
  25,
  undefined,
  {
    getOnInit: true,
  },
);

const HUES = [0, 60, 120, 180, 240, 300];

export const colorHueAtom = atomWithStorage("colorValue", HUES[5], undefined, {
  getOnInit: true,
});

export const useColor = () => {
  const [hue, setHue] = useAtom(colorHueAtom);
  const [brightness] = useAtom(colorBrightnessPercentAtom);

  const changeHue = () => {
    const nextHue = HUES.find((h) => h > hue) || HUES[0];
    setHue(nextHue);
  };

  return { color: `hsl(${hue}, 100%, ${brightness}%)`, changeHue };
};
