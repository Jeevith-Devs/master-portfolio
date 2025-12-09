import React, { use, useEffect, useRef, useState } from "react";
import Magentic from "./ui/magentic";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Logo from "@/public/svg/Logo.svg";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { toggleMenu } from "@/redux/states/menuSlice";
import { cn } from "@/lib/utils";
import { links } from "@/data/data";
import "@/app/header.css";

const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");

type HeaderProps = {
  color: "Dark" | "Light";
  className?: string;
  mode?: "hamburger" | "cross";
};

export function Header({ color, className, mode = "hamburger" }: HeaderProps) {
  const possibleTailwindClasses = [
    "bg-colorDark",
    "bg-colorLight",
    "text-colorDark",
    "text-colorLight",
    "before:bg-colorDark",
    "before:bg-colorLight",
  ];

  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    logoAnimationTl.current = gsap.timeline({ paused: true }).fromTo(
      `.logo__rotate`,
      {
        rotate: 0,
        transformOrigin: "center",
      },
      {
        rotate: -360,
        transformOrigin: "center",
        duration: 0.6,
        ease: ease,
      },
    );

    return () => {
      logoAnimationTl.current?.kill();
    };
  }, []);

  const dispatch = useAppDispatch();
  return (
    <header className={cn("nav__container anime px-paddingX", className)}>
      <nav className="nav__bar ">
        <div className="max-w-maxWidth">
          <Magentic
            href={links.home}
            strength={50}
            className={`nav__item text-xl font-bold text-color${color} before:bg-color${color}`}
            onMouseEnter={() => {
              console.log("hello");
              logoAnimationTl.current?.play();
            }}
            onMouseLeave={() => {
              logoAnimationTl.current?.reverse();
            }}
          >
            <p className="mask logo__anim flex items-center justify-center font-semibold   ">
              <svg width="120" height="27" viewBox="0 0 120 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20.4904H1.2793C2.15725 20.4904 2.80944 20.2932 3.23587 19.8986C3.6623 19.4795 3.87552 18.8507 3.87552 18.0123V0.517808H11.3255V18.0863C11.3005 21.0205 10.4351 23.1411 8.72933 24.4479C7.0236 25.7548 4.54025 26.4082 1.2793 26.4082H0V20.4904Z" fill="currentColor"/>
              <path d="M22.751 27C19.6155 27 17.1572 26.1247 15.3763 24.374C13.5953 22.6233 12.7048 20.2192 12.7048 17.1616C12.7048 14.0795 13.5577 11.663 15.2634 9.91233C16.9942 8.16164 19.4148 7.2863 22.5253 7.2863C25.9367 7.2863 28.4703 8.14932 30.1258 9.87534C31.8065 11.5767 32.6217 14.2274 32.5715 17.8274H20.1548C20.2552 19.9973 21.1206 21.0822 22.751 21.0822C23.9551 21.0822 24.7452 20.4288 25.1215 19.1219H32.5339C32.5339 20.3301 32.2329 21.5384 31.6309 22.7466C31.0289 23.9301 29.9879 24.9411 28.5079 25.7795C27.053 26.5932 25.134 27 22.751 27ZM25.0086 14.8315C24.6324 13.7466 23.8798 13.2041 22.751 13.2041C21.6223 13.2041 20.8572 13.7466 20.4558 14.8315H25.0086Z" fill="currentColor"/>
              <path d="M43.3647 27C40.2292 27 37.7709 26.1247 35.9899 24.374C34.209 22.6233 33.3185 20.2192 33.3185 17.1616C33.3185 14.0795 34.1713 11.663 35.8771 9.91233C37.6079 8.16164 40.0285 7.2863 43.139 7.2863C46.5504 7.2863 49.0839 8.14932 50.7395 9.87534C52.4202 11.5767 53.2354 14.2274 53.1852 17.8274H40.7685C40.8688 19.9973 41.7342 21.0822 43.3647 21.0822C44.5688 21.0822 45.3589 20.4288 45.7352 19.1219H53.1476C53.1476 20.3301 52.8466 21.5384 52.2446 22.7466C51.6425 23.9301 50.6015 24.9411 49.1216 25.7795C47.6667 26.5932 45.7477 27 43.3647 27ZM45.6223 14.8315C45.246 13.7466 44.4935 13.2041 43.3647 13.2041C42.2359 13.2041 41.4709 13.7466 41.0695 14.8315H45.6223Z" fill="currentColor"/>
              <path d="M54.3084 23.2274V7.91507H55.2115L61.7584 10.3932V18.2712C61.7584 19.0356 61.9591 19.6644 62.3605 20.1575C62.7869 20.6507 63.3262 20.8973 63.9784 20.8973C64.6055 20.8973 65.1197 20.6507 65.5211 20.1575C65.9475 19.6644 66.1607 19.0356 66.1607 18.2712V7.91507H67.0638L73.6108 10.3932V23.2274L66.9133 26.4082H61.0812L54.3084 23.2274Z" fill="currentColor"/>
              <path d="M75.4068 7.91507H76.3099L82.8569 10.3932V26.4082H75.4068V7.91507ZM75.1058 3.95753C75.1058 2.8726 75.4946 1.94795 76.2722 1.18356C77.0749 0.394521 78.0282 0 79.1319 0C80.2356 0 81.1762 0.394521 81.9538 1.18356C82.7565 1.94795 83.1579 2.8726 83.1579 3.95753C83.1579 5.04247 82.7565 5.97945 81.9538 6.76849C81.1762 7.53288 80.2356 7.91507 79.1319 7.91507C78.0282 7.91507 77.0749 7.53288 76.2722 6.76849C75.4946 5.97945 75.1058 5.04247 75.1058 3.95753Z" fill="currentColor"/>
              <path d="M84.6594 0.517808H85.5624L92.1094 2.99589V7.91507H98.4307V14.1288H92.1094V18.0123C92.1094 18.8507 92.3226 19.4795 92.7491 19.8986C93.1755 20.2932 93.8277 20.4904 94.7057 20.4904H98.4307V26.4082H94.7057C91.4447 26.4082 88.9614 25.7548 87.2556 24.4479C85.5499 23.1411 84.6845 21.0205 84.6594 18.0863V0.517808Z" fill="currentColor"/>
              <path d="M99.9451 0.517808H100.848L107.395 2.99589V10.0973C107.997 9.18493 108.762 8.49452 109.69 8.02603C110.618 7.53288 111.685 7.2863 112.889 7.2863C115.096 7.2863 116.827 8.0137 118.081 9.46849C119.335 10.8986 119.975 12.8836 120 15.4233V26.4082H112.55V15.6822C112.55 14.9918 112.299 14.4123 111.797 13.9438C111.321 13.4507 110.719 13.2041 109.991 13.2041C109.264 13.2041 108.649 13.4507 108.148 13.9438C107.646 14.4123 107.395 14.9918 107.395 15.6822V26.4082H99.9451V0.517808Z" fill="currentColor"/>
              </svg>
            </p>
          </Magentic>
          <Magentic
            strength={50}
            className={`mask nav__item h-8 w-8 cursor-pointer items-center text-color${color} before:bg-color${color}`}
            onClick={() => {
              if (mode === "cross") {
                dispatch(toggleMenu({ isMenuOpen: false }));
              } else {
                dispatch(toggleMenu({ isMenuOpen: true, color: color }));
              }
            }}
          >
            <div
              className={cn(
                "flex h-[0.9rem] w-full flex-col justify-between ",
                {
                  "scale-[.90] justify-center": mode === "cross",
                },
              )}
            >
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  "absolute rotate-45": mode === "cross",
                })}
              ></div>
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  "absolute -rotate-45": mode === "cross",
                })}
              ></div>
            </div>
          </Magentic>
        </div>
      </nav>
    </header>
  );
}
