import * as motion from "motion/react-client";
import React, { useRef } from "react";
import { AnimatedBeam } from "./animated-beam";
import { ShineBorder } from "./animated-border";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative flex flex-col items-center text-gray-50/60"
      ref={containerRef}
    >
      {/* <AnimatedBeamDemo /> */}

      <h3 className="my-8 font-mono text-sm font-extralight tracking-widest">
        EXPLORE ABOUT ME
      </h3>
      <div className="mt-40 flex flex-col items-center">
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-gray-500" />
        <div className="flex flex-col items-center gap-6">
          <TimelineBall children={1} />
          <Title>About me</Title>
          <p className="text-center text-lg">
            I'm Gabriel. I've got 3+ years of web dev experience, with a focus
            on <span className="underline">React</span>,{" "}
            <span className="underline">Next.JS</span> and{" "}
            <span className="underline">Typescript</span>. <br />
            I'm passionate about web development and always eager to learn new
            technologies.
          </p>
        </div>
      </div>
      <div className="z-10 flex flex-col items-center gap-96">
        <div className="h-8 w-[1px] from-transparent to-gray-50"></div>
        <TimelineBall children={2} ref={div1Ref} />
        <TimelineBall children={3} ref={div2Ref} />
      </div>

      <AnimatedBeam
        pathColor="cyan"
        className="z-0"
        duration={10}
        gradientStartColor="#064e3b"
        gradientStopColor="#10b981"
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
    </section>
  );
}

function Title(props: React.ComponentProps<"h2">) {
  return (
    <h2 className="text-center text-3xl font-bold text-gray-50/90" {...props} />
  );
}

function TimelineBall(props: React.ComponentProps<typeof motion.div>) {
  return (
    <ShineBorder color={["#67e8f9"]} borderRadius={100} borderWidth={2}>
      <motion.div
        className="z-10 flex size-12 items-center justify-center rounded-full bg-red-400 bg-gradient-to-bl from-teal-500 to-cyan-100 text-xl font-bold text-black"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
        {...props}
      />
    </ShineBorder>
  );
}
