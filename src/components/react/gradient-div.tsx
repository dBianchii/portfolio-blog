import { cn, hslToHex } from "~/lib/utils";
import { useColor } from "./atoms";

export function GradientDiv() {
  const { color } = useColor();
  const className = `absolute z-10 h-28 w-96 bg-gradient-to-r from-transparent from-10% via-[${hslToHex(color).toUpperCase()}] to-90%`;
  return <div className={cn(className)}></div>;
}
