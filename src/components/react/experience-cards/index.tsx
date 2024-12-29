import intemobileImage from "../../../assets/intemobile.jpeg";
import staysImage from "../../../assets/stays.png";
import { Card, CardTitle, CardDescription, CardContent } from "../ui/card";
import { TbBrandCSharp } from "react-icons/tb";
import { BiLinkExternal, BiLogoTypescript } from "react-icons/bi";
import { RiJavascriptFill } from "react-icons/ri";
import { PiFileSqlDuotone } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa6";
import { SiDotnet } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

const JOBS = [
  {
    title: "Stays",
    role: "Software Developer",
    image: staysImage.src,
    website: "https://stays.net/",
    techs: [
      <SiMongodb className="size-8" />,
      <RiJavascriptFill className="size-8" />,
    ],
    description: `Developing features used by thousands in the vacation rental industry.
Helped integrate a big new feature of the application: Google Vacation Rental. This tool enables our clients to connect their apartments with google, and I lead the core development of this project.
Full working experience in English - The team has members of different countries, and so, I have received great compliments on my fluency and communication.
Full git and Gitlab issue development pipeline alongside Jira - We use Agile methodology with weekly meetings to plan each sprint and reflect on the issues.
Became scrum master for our sprints, where I make sure ongoing projects are going according to plan`,
  },
  {
    title: "Intemobile",
    role: "Junior Developer",
    image: intemobileImage.src,
    website: "https://intemobile.com/",
    techs: [
      <BiLogoTypescript className="size-8" />,
      <RiJavascriptFill className="size-8" />,
      <TbBrandCSharp className="size-8" />,
      <SiDotnet className="size-8" />,
      <FaDatabase className="size-6" />,
      <FaBootstrap className="size-8" />,
    ],
    description: `Created software and solutions for integrating mobile
technologies, such as asset management solutions and
cargo/logistics transport visualizations. I developed web
applications, Android apps, back-end and front-end services using
several technologies including: Azure, .NET, C#, SQL Server,
JavaScript/Typescript and Angular.
`,
  },
];

import { DynamicArrow } from "./dynamic-arrow";
import { MagicCard } from "../ui/magic-card";
import { useColor } from "../atoms";

export function ExperienceCards() {
  const { color } = useColor();
  return (
    <div className="flex gap-4">
      {JOBS.map((job) => (
        <a className="group w-2/4" href={job.website} target="_blank">
          <MagicCard
            key={job.title}
            className="pt-4"
            gradientSize={400}
            gradientFrom={color}
            gradientTo={color}
          >
            <CardContent>
              <div className="flex items-center gap-4">
                <img src={job.image} width={50} className="rounded-full" />
                <CardTitle className="text-4xl">{job.title}</CardTitle>
                <DynamicArrow />
              </div>
              <div className="mt-4">
                <CardTitle className="text-xl">{job.role}</CardTitle>
                <div className="flex items-center gap-2">{job.techs}</div>
                <CardDescription className="text-md mt-4">
                  {job.description}
                </CardDescription>
              </div>
            </CardContent>
          </MagicCard>
        </a>
      ))}
    </div>
  );
}
