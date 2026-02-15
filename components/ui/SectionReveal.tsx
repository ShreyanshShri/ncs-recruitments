"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type SectionRevealProps = {
  children: React.ReactNode;
  delay?: number;
};

export default function SectionReveal({
  children,
  delay = 0,
}: SectionRevealProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    if (!containerRef.current) return;

    const el = containerRef.current;

    gsap.set(el, {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
      willChange: "transform, opacity, filter",
    });

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay,
            ease: "power3.out",
          });

          observer.disconnect();

        }

      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();

  }, [delay]);



  return (
    <div ref={containerRef}>
      {children}
    </div>
  );

}
