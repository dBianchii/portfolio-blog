import { use, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useColor } from "../atoms";
import { hslToHex } from "~/lib/utils";

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
