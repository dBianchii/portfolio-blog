import { BiLogoTypescript } from "react-icons/bi";
import { FaBootstrap, FaReact } from "react-icons/fa";
import { FaDatabase, FaJava } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { SiDotnet, SiJest, SiMongodb, SiNginx } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import FIAPImage from "../../../assets/FIAP.png";
import intemobileImage from "../../../assets/intemobile.jpeg";
import staysImage from "../../../assets/stays.png";
import { CardContent, CardDescription, CardTitle } from "../ui/card";

const EXPERIENCES = [
  {
    title: "FIAP",
    role: "Bachelor's Degree in Software Engineering",
    timeRange: "Aug. 2022 - 2026",
    image: FIAPImage.src,
    website: "https://www.fiap.com.br/",
    techs: [
      <BiLogoTypescript key="typescript" className="size-8" />,
      <GrMysql key="mysql" className="size-8" />,
      <RiNextjsFill key="nextjs" className="size-8" />,
      <FaReact key="react" className="size-8" />,
      <FaJava key="java" className="size-8" />,
    ],
    description: `I am currently studying at FIAP. Learning about Software Engineering, best market practices and actively engaging in new projects utilizing different learnt concepts and technologies.`,
  },
  {
    title: "Stays",
    role: "Software Developer",
    timeRange: "Sep 2022 - Present",
    image: staysImage.src,
    website: "https://stays.net/",
    techs: [
      <RiJavascriptFill key="javascript" className="size-8" />,
      <SiMongodb key="mongodb" className="size-8" />,
      <SiNginx key="nginx" className="size-8" />,
      <SiJest key="jest" className="size-7" />,
    ],
    description: `Developing features used by thousands in the vacation rental industry. Dealing with heavy backend logic by integrating Airbnb, Bookingcom, Decolar and other OTAs' (Online travel agencies) APIs and webhooks. 
Full git and Github issue development pipeline alongside Jira - We use Agile methodology with weekly meetings to plan each sprint and reflect on the issues.
Acted as a scrum master for our sprints, where I make sure ongoing projects are going according to plan.`,
  },
  {
    title: "Intemobile",
    role: "Junior Developer",
    timeRange: "Jun 2021 - Aug 2022",
    image: intemobileImage.src,
    website: "https://intemobile.com/",
    techs: [
      <BiLogoTypescript key="typescript-intemobile" className="size-8" />,
      <RiJavascriptFill key="javascript-intemobile" className="size-8" />,
      <TbBrandCSharp key="csharp" className="size-8" />,
      <SiDotnet key="dotnet" className="size-8" />,
      <FaDatabase key="database" className="size-6" />,
      <FaBootstrap key="bootstrap" className="size-8" />,
    ],
    description: `Created software solutions for integrating mobile
technologies, such as asset management solutions and
cargo/logistics transport visualizations. I developed web
applications, helped in maintaining Android apps, and implemented full back-end to front-end services using
several technologies including Azure, .NET, C#, SQL Server and Typescript.
`,
  },
];

import { useColor } from "../atoms";
import { MagicCard } from "../ui/magic-card";
import { DynamicArrow } from "./dynamic-arrow";

export function ExperienceCards() {
  const { color } = useColor();
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {EXPERIENCES.map((job) => (
        <a key={job.title} className="group" href={job.website} target="_blank">
          <MagicCard className="pt-4" gradientSize={400} gradientFrom={color} gradientTo={color}>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={job.image}
                  width={50}
                  className="rounded-full"
                  alt={`${job.title} logo`}
                />
                <CardTitle className="text-4xl">{job.title}</CardTitle>
                <DynamicArrow />
              </div>
              <div className="mt-4">
                <CardTitle className="text-xl">{job.role}</CardTitle>
                <p className="text-sm italic">{job.timeRange}</p>
                <div className="mt-4 flex items-center gap-2">{job.techs}</div>
                <CardDescription className="text-md mt-4">{job.description}</CardDescription>
              </div>
            </CardContent>
          </MagicCard>
        </a>
      ))}
    </div>
  );
}
