"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  stagger?: boolean;
  staggerDelay?: number;
  scale?: boolean;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  stagger = false,
  staggerDelay = 0.05,
  scale = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "-50px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y:
        direction === "up"
          ? 30
          : direction === "down"
          ? -30
          : direction === "left" || direction === "right"
          ? 0
          : 0,
      x:
        direction === "left"
          ? 40
          : direction === "right"
          ? -40
          : direction === "up" || direction === "down"
          ? 0
          : 0,
      scale: scale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  const containerVariants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : undefined;

  const childVariants = stagger
    ? {
        hidden: {
          opacity: 0,
          y:
            direction === "up"
              ? 20
              : direction === "down"
              ? -20
              : direction === "left" || direction === "right"
              ? 0
              : 0,
          x:
            direction === "left"
              ? 25
              : direction === "right"
              ? -25
              : direction === "up" || direction === "down"
              ? 0
              : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }
    : undefined;

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={className}
      >
        <motion.div variants={childVariants}>{children}</motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
