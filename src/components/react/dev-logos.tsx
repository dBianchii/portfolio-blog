import {
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { RiNextjsFill } from "react-icons/ri";
import { SiDrizzle, SiTurborepo } from "react-icons/si";

import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/react/ui/tooltip";
import { Dock, DockIcon } from "./ui/dock";

const logos = [
  {
    Component: <BiLogoTypescript className="size-12 hover:text-[#1081D0]" />,
    name: "Typescript",
    href: "https://www.typescriptlang.org/",
  },
  {
    Component: <SiDrizzle className="size-12 hover:text-[#C5F74F]" />,
    name: "DrizzleORM",
    href: "https://orm.drizzle.team/",
  },
  {
    Component: <GrMysql className="size-12 hover:text-[#DA8E00]" />,
    name: "MySQL",
    href: "https://www.mysql.com/",
  },
  {
    Component: <RiNextjsFill className="size-12 hover:text-white" />,
    name: "Next.js",
    href: "https://nextjs.org/",
  },
  {
    Component: <BiLogoReact className="size-12 hover:text-[#61DAFB]" />,
    name: "React",
    href: "https://reactjs.org/",
  },
  {
    Component: <BiLogoTailwindCss className="size-12 hover:text-[#38bdf8]" />,
    name: "Tailwind",
    href: "https://tailwindcss.com/",
  },
  {
    Component: <SiTurborepo className="size-12 hover:text-[#FA225E]" />,
    name: "Turborepo",
    href: "https://turbo.build/repo/docs",
  },
];

const useHook = (enabled: boolean) => {};

export function DevLogos() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const size = isSmallDevice ? 40 : 60;

  return (
    <div className="flex gap-8 p-8 text-lg text-gray-50/50">
      <div>
        <TooltipProvider>
          <Dock
            className="border-slate-800"
            direction="middle"
            iconMagnification={size * 1.4}
            iconDistance={20}
            iconSize={size}
          >
            {logos.map(({ Component, name: name, href }, i) => (
              <DockIcon key={name + i}>
                <Tooltip delayDuration={50}>
                  <TooltipTrigger
                    asChild
                    onClick={() => {
                      window.open(href, "_blank");
                    }}
                  >
                    {Component}
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  );
}
