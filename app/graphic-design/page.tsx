"use client";

import React from "react";
import { GraphicDesignSection } from "@/components/graphicDesign/graphicDesignSection";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Header } from "@/components/header";
import "../globals.css";
import "../work.css";

export default function GraphicDesignPage() {
  return (
    <>
      <Cursor />

      {/* ── Top bar (same as /work) ── */}
      <Header color="Light" />

      {/* ── Hamburger overlay menu (same as /work) ── */}
      <HeaderNavigation />

      {/* ── Fixed dark background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg, #0e0d0c 0%, #1a1814 100%)",
          zIndex: -1,
        }}
      />

      {/* ── Ghost watermark ── */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(4rem, 14vw, 12rem)",
          fontWeight: 800,
          color: "rgba(255,255,255,0.022)",
          lineHeight: 0.88,
          letterSpacing: "-0.03em",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "DM Sans, sans-serif",
          whiteSpace: "nowrap",
          zIndex: 0,
          textAlign: "center",
        }}
      >
        GRAPHIC
        <br />
        DESIGN
      </div>



      {/* ── Canvas infinite grid ── */}
      <GraphicDesignSection />
    </>
  );
}
