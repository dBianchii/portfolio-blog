import { MdArrowOutward } from "react-icons/md";
import { useColor } from "../atoms";

export function DynamicArrow() {
  const { color } = useColor();

  return (
    <MdArrowOutward
      className="ml-auto size-6 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
      style={{
        color: color,
      }}
    />
  );
}
