"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        ATS Resume <br /> Checker
      </>
    ),
    description: "React Site",
    link: "*",
    imageLink: "/img/projects/resumewebsite.png",
  },
  {
    title: (
      <>
        Object Tracking-and-Alexa-Home-Assistant <br /> With Alexa
      </>
    ),
    description: "Internet of Things Project",
    link: "https://github.com/Jeevith-Devs/Elderly-Object-Tracking-and-Alexa-Home-Assistant",
    imageLink: "/img/projects/iot.png",
  },
  {
    title: (
      <>
        Andy PFP <br /> Generator
      </>
    ),
    description: "Next.js Site",
    link: "https://generator.andytoken.com/",
    imageLink: "/img/projects/3.avif",
  },
  {
    title: (
      <>
        Hang man <br /> Game
      </>
    ),
    description: "Simple WebSite",
    link: "https://the-hang-man.vercel.app/",
    imageLink: "/img/projects/hangman.png",
  },

  {
    title: (
      <>
        AmanFX <br /> Portfolio
      </>
    ),
    description: "Webflow Site",
    link: "https://amanfx.webflow.io/",
    imageLink: "/img/projects/5.avif",
  },
  {
    title: (
      <>
        Therapist <br /> Website
      </>
    ),
    description: "UI Design",
    link: "https://www.figma.com/proto/Tzz9bwrjHtSza87b1l3D0i/Inner-Strength-UI-Design?type=design&node-id=37-10&t=pq2KDLjYbMU4LFgA-1&scaling=min-zoom&page-id=0%3A1&mode=design",
    imageLink: "/img/projects/6.avif",
  },
];
//test
export default function WorkPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <>
          <div className="background">
            PROJECTS
            <br />
            PROJECTS
          </div>

          {projectsData.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </>
      </FullpageProviderWork>
    </>
  );
}
