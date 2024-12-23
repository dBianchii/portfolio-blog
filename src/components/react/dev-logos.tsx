import {
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { SiDrizzle } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

import * as motion from "motion/react-client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/react/ui/tooltip";

const logos = [
  {
    Component: <SiDrizzle className="size-12 hover:text-[#C5F74F]" />,
    key: "DrizzleORM",
  },
  {
    Component: <BiLogoTypescript className="size-12 hover:text-[#1081D0]" />,
    key: "Typescript",
  },
  {
    Component: <RiNextjsFill className="size-12 hover:text-white" />,
    key: "Next.js",
  },
  {
    Component: <GrMysql className="size-12 hover:text-[#DA8E00]" />,
    key: "MySQL",
  },
  {
    Component: <BiLogoReact className="size-12 hover:text-[#61DAFB]" />,
    key: "React",
  },
  {
    Component: <BiLogoTailwindCss className="size-12 hover:text-[#38bdf8]" />,
    key: "Tailwind",
  },
];

export function DevLogos() {
  return (
    <div className="flex gap-8 text-lg text-gray-50/50">
      <TooltipProvider>
        {logos.map(({ Component, key }, i) => (
          <Tooltip delayDuration={50} key={key + i}>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="transition-colors"
              >
                {Component}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{key}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
