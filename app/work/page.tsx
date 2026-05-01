"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";
import { SeeMoreSection } from "@/components/workPage/seeMoreSection";

const projectsData = [
  {
    title: (
      <>
        Esperanza <br /> Website
      </>
    ),
    description: "College Dynamic Cultural Website",
    link: "https://esperanza2k26.vercel.app/",
    imageLink: "/img/projects/esperanza.png",
  },
  {
    title: (
      <>
        Object Tracker <br /> With Alexa
      </>
    ),
    description: "Internet of Things Project",
    link: "https://github.com/Jeevith-Devs/Elderly-Object-Tracking-and-Alexa-Home-Assistant",
    imageLink: "/img/projects/iot.png",
  },
  {
    title: (
      <>
        Jeevx Studio
      </>
    ),
    description: "React.js Business Site",
    link: "https://jeevx-studio.vercel.app/",
    imageLink: "/img/projects/jeevx-studio.png",
  },
  {
    title: (
      <>
        Hang man <br /> Game
      </>
    ),
    description: "Simple Game WebSite",
    link: "https://the-hang-man.vercel.app/",
    imageLink: "/img/projects/hangman.png",
  },

  {
    title: (
      <>
        Prediction  <br /> model
      </>
    ),
    description: "Machine Learning model",
    link: "https://github.com/Jeevith-Devs/Dynamic-Employee-Productivity-and-Burnout-Prediction-System-using-Machine-Learning",
    imageLink: "/img/projects/burnout.png",
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
              length={projectsData.length + 1}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
          <SeeMoreSection totalCount={projectsData.length + 1} />
        </>
      </FullpageProviderWork>
    </>
  );
}
