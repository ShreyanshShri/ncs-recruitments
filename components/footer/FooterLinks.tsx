"use client";

import React from "react";

const exploreLinks = [
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Recruitment", href: "#recruitment" },
];

const connectLinks = [
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Instagram", href: "https://instagram.com" },
];

export default function FooterLinks() {

  return (

    <div
      className="
        grid

        grid-cols-2

        gap-12
        md:gap-16

        text-sm
      "
    >

      {/* Explore Column */}
      <div>

        <h4
          className="
            text-white/40

            uppercase
            tracking-[0.2em]

            text-xs

            mb-4
          "
        >
          Explore
        </h4>

        <ul className="space-y-3">

          {exploreLinks.map((link) => (

            <li key={link.name}>

              <a
                href={link.href}
                className="
                  text-white/60

                  hover:text-white

                  transition-colors
                  duration-300
                "
              >
                {link.name}
              </a>

            </li>

          ))}

        </ul>

      </div>



      {/* Connect Column */}
      <div>

        <h4
          className="
            text-white/40

            uppercase
            tracking-[0.2em]

            text-xs

            mb-4
          "
        >
          Connect
        </h4>

        <ul className="space-y-3">

          {connectLinks.map((link) => (

            <li key={link.name}>

              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white/60

                  hover:text-white

                  transition-colors
                  duration-300
                "
              >
                {link.name}
              </a>

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}
