import {
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { SiDrizzle, SiTurborepo } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

import * as motion from "motion/react-client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/react/ui/tooltip";
import { Dock, DockIcon } from "./ui/dock";

const logos = [
  {
    Component: <BiLogoTypescript className="size-12 hover:text-[#1081D0]" />,
    key: "Typescript",
  },
  {
    Component: <SiDrizzle className="size-12 hover:text-[#C5F74F]" />,
    key: "DrizzleORM",
  },
  {
    Component: <GrMysql className="size-12 hover:text-[#DA8E00]" />,
    key: "MySQL",
  },
  {
    Component: <RiNextjsFill className="size-12 hover:text-white" />,
    key: "Next.js",
  },
  {
    Component: <BiLogoReact className="size-12 hover:text-[#61DAFB]" />,
    key: "React",
  },
  {
    Component: <BiLogoTailwindCss className="size-12 hover:text-[#38bdf8]" />,
    key: "Tailwind",
  },
  {
    Component: <SiTurborepo className="size-12 hover:text-[#FA225E]" />,
    key: "Turborepo",
  },
];
const size = 60;
export function DevLogos() {
  return (
    <div className="flex gap-8 text-lg text-gray-50/50">
      <TooltipProvider>
        <Dock
          className="border-slate-800"
          direction="middle"
          iconMagnification={size * 1.4}
          iconDistance={20}
          iconSize={size}
        >
          {logos.map(({ Component, key }, i) => (
            <DockIcon>
              <Tooltip delayDuration={50} key={key + i}>
                <TooltipTrigger asChild>{Component}</TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{key}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
