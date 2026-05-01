"use client";

import React from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import Magentic from "@/components/ui/magentic";

export function SeeMoreSection({ totalCount }: { totalCount: number }) {
  return (
    <div className="section s6 darkGradient relative overflow-hidden">
      <Header color="Light" />
      <Bulge type="Light" />

      {/* Decorative background text */}
      <div
        style={{
          position: "absolute",
          fontSize: "17vw",
          color: "rgba(255,255,255,0.03)",
          fontWeight: 800,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        DESIGN
        <br />
        WORKS
      </div>

      <div
        className="flex h-[100dvh] w-full items-center justify-center px-paddingX"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="flex flex-col items-center justify-center gap-10 text-center">

          {/* Big heading — clamped so it never clips */}
          <h2
            className="anime"
            style={{
              /* 18vw fits "Graphic" / "Design." within 88vw content area.
                 Clamped: min 2.5rem for tiny screens, max 13rem for large. */
              fontSize: "clamp(2.5rem, 18vw, 13rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              fontFamily: "DM Sans, sans-serif",
              textAlign: "center",
            }}
          >
            Graphic
            <br />
            Design
            <span style={{ color: "hsl(54, 100%, 50%)" }}>.</span>
          </h2>

          {/* Show Me — clean pill button matching WorkSection */}
          <Magentic
            strength={50}
            className="btn text-colorDark bg-colorLight mask anime"
            href="/graphic-design"
            scrambleParams={{ text: "Show Me", chars: "-x" }}
          >
            <p className="shapka">
              <span className="scrambleText">Show Me</span>
              <svg
                className="ml-4 inline w-[0.8em] -rotate-[75deg] text-inherit"
                viewBox="0 0 14 14"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>arrow-up-right</title>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Artboard"
                    transform="translate(-1019.000000, -279.000000)"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <g
                      id="arrow-up-right"
                      transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"
                    >
                      <polyline
                        id="Path"
                        points="2.76923077 0 12 0 12 9.23076923"
                      />
                      <line x1="12" y1="0" x2="0" y2="12" id="Path" />
                    </g>
                  </g>
                </g>
              </svg>
            </p>
          </Magentic>
        </div>
      </div>

      {/* Progress indicator dots */}
      <div className="anime absolute bottom-10 flex w-full items-end justify-center gap-6">
        {Array(totalCount)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                height: i === totalCount - 1 ? "2.5rem" : "1rem",
                width: "0.25rem",
                borderRadius: "9999px",
                backgroundColor:
                  i === totalCount - 1
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
      </div>
    </div>
  );
}
