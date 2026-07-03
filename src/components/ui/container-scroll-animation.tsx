"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Add buttery smooth spring physics to scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.95] : [1.08, 1];
  };

  // Complete rotation & scale transition in first 45% of scroll progress for better visibility
  const rotate = useTransform(smoothProgress, [0, 0.45], [18, 0]);
  const scale = useTransform(smoothProgress, [0, 0.45], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 0.45], [0, -60]);

  return (
    <div
      className="h-[50rem] md:h-[75rem] flex items-center justify-center relative p-2 md:p-20 bg-black"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-32 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center px-4"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 80px -10px rgba(255,255,255,0.08), 0 25px 50px -12px rgba(0,0,0,0.8)",
      }}
      className="max-w-5xl -mt-6 mx-auto h-[26rem] md:h-[38rem] w-full border border-zinc-800 p-2 bg-zinc-950/90 rounded-[24px] shadow-2xl backdrop-blur-md relative"
    >
      {/* Top inner gloss reflection line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-[24px]" />
      
      <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-950 md:rounded-2xl border border-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
