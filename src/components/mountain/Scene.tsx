"use client";

import type { CSSProperties } from "react";
import type { Stage } from "@/lib/stage";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { Hiker } from "./Hiker";

const px = (factor: number): CSSProperties => ({
  transform: `translateY(calc(var(--px, 0px) * ${factor}))`,
});

function SkyGradient({ warm = false }: { warm?: boolean }) {
  return (
    <div
      className="absolute inset-x-0 top-[-2%] bottom-0"
      style={{
        background: `linear-gradient(180deg, var(${warm ? "--sun1" : "--sky1"}), var(${
          warm ? "--sun2" : "--sky2"
        }))`,
        ...px(0.05),
      }}
    />
  );
}

/** Ten faint twinkling points, visible only once the theme's --night hits 1. */
function StarField({ seed }: { seed: number }) {
  const stars = Array.from({ length: 8 }, (_, i) => {
    const left = 8 + ((seed + i * 37) % 88);
    const top = 5 + ((seed + i * 53) % 32);
    const size = 1.1 + ((i + seed) % 3) * 0.2;
    return `radial-gradient(${size}px ${size}px at ${left}% ${top}%, #fff, transparent)`;
  }).join(",");

  return (
    <div className="absolute inset-0" style={{ opacity: "var(--night, 0)" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: stars,
          animation: `rj-twinkle ${5 + (seed % 3)}s ease-in-out infinite alternate`,
        }}
      />
    </div>
  );
}

function SunOrb({
  left,
  top,
  size,
}: {
  left: string;
  top: string;
  size: string;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left,
        top,
        width: size,
        aspectRatio: "1",
        background: "var(--orb)",
        boxShadow: "0 0 0 12px var(--orb-glow), 0 0 64px 24px var(--orb-glow)",
        ...px(0.05),
      }}
    />
  );
}

function MistBand({
  left,
  top,
  width,
  height,
  blur,
  opacity = 1,
  duration,
  reverse = false,
}: {
  left: string;
  top: string;
  width: string;
  height: string;
  blur: number;
  opacity?: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left,
        top,
        width,
        height,
        background:
          "linear-gradient(90deg, transparent, var(--mist), transparent)",
        filter: `blur(${blur}px)`,
        opacity,
        animation: `${reverse ? "rj-drift-slow" : "rj-drift"} ${duration}s ease-in-out infinite alternate`,
      }}
    />
  );
}

/** A small warm glow standing in for a headlamp, visible only at night. */
function NightGlow({
  left,
  top,
  size,
}: {
  left: string;
  top: string;
  size: string;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left,
        top,
        width: size,
        aspectRatio: "1",
        background:
          "radial-gradient(circle, rgb(232 151 74 / 85%), transparent 68%)",
        opacity: "var(--night, 0)",
      }}
    />
  );
}

function HikerAt({
  left,
  top,
  width,
  height,
}: {
  left: string;
  top: string;
  width: string;
  height: string;
}) {
  return (
    <div className="absolute" style={{ left, top, width, height }}>
      <Hiker />
    </div>
  );
}

const viewport = {
  viewBox: "0 0 1440 620",
  preserveAspectRatio: "xMidYMax slice",
} as const;
const svgFill: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
};

function HomeArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={2} />
      <SunOrb left="79%" top="9%" size="5.4%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.15)}>
          <path
            d="M0 322Q160 316 300 302L470 152Q500 128 530 150L562 176L602 134Q628 116 652 142L822 302Q980 320 1440 300L1440 620L0 620Z"
            fill="var(--ridge)"
          />
          <path d="M634 152L822 302L670 302Z" fill="var(--ridge-2)" />
          <path
            d="M0 360Q220 300 460 350Q700 400 940 340Q1180 286 1440 340L1440 620L0 620Z"
            fill="var(--mid)"
          />
          <path
            d="M0 380Q220 320 460 370Q700 420 940 360Q1180 306 1440 360L1440 620L0 620Z"
            fill="var(--mid-2)"
          />
          <path
            d="M196 350l13-31 13 31zM226 356l11-27 11 27zM254 348l14-33 14 33zM286 358l11-26 11 26zM1104 336l12-29 12 29zM1132 342l11-26 11 26zM1160 334l13-31 13 31z"
            fill="var(--tree)"
          />
        </g>
        <g style={px(0.4)}>
          <path
            d="M0 470Q300 420 620 470Q980 526 1440 464L1440 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 488Q300 438 620 488Q980 544 1440 482L1440 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M470 620Q620 540 676 474Q716 428 694 396L742 388Q782 434 744 492Q690 560 640 620Z"
            fill="var(--trail)"
          />
          <path
            d="M560 620Q664 548 692 480Q718 430 700 400L714 398Q736 432 712 486Q684 552 646 620Z"
            fill="var(--trail-2)"
            opacity="0.75"
          />
          <rect
            x="882"
            y="392"
            width="14"
            height="128"
            rx="7"
            fill="var(--wood)"
          />
          <rect
            x="828"
            y="400"
            width="112"
            height="24"
            rx="8"
            fill="var(--wood-2)"
          />
          <rect
            x="896"
            y="438"
            width="94"
            height="22"
            rx="8"
            fill="var(--wood-2)"
          />
        </g>
      </svg>
      <MistBand
        left="4%"
        top="48%"
        width="48%"
        height="15px"
        blur={5}
        duration={30}
      />
      <MistBand
        left="36%"
        top="58%"
        width="56%"
        height="19px"
        blur={6}
        duration={38}
        reverse
      />
      <MistBand
        left="12%"
        top="71%"
        width="42%"
        height="13px"
        blur={5}
        opacity={0.8}
        duration={24}
      />
      <NightGlow left="31%" top="71%" size="4.4%" />
      <NightGlow left="57.6%" top="59%" size="3%" />
      <HikerAt left="32.6%" top="72%" width="1.5%" height="4.8%" />
    </>
  );
}

function WorkArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={5} />
      <SunOrb left="14%" top="12%" size="5%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.15)}>
          <path
            d="M900 320Q1010 314 1090 300L1180 210Q1200 192 1222 212L1246 236L1276 200Q1298 184 1318 208L1420 300Q1432 306 1440 306L1440 620L900 620Z"
            fill="var(--ridge)"
          />
          <path d="M1296 218L1420 300L1310 300Z" fill="var(--ridge-2)" />
          <path
            d="M0 340Q240 300 520 348Q800 396 1080 344Q1260 312 1440 336L1440 620L0 620Z"
            fill="var(--gold)"
          />
          <path
            d="M0 362Q240 322 520 370Q800 418 1080 366Q1260 334 1440 358L1440 620L0 620Z"
            fill="var(--gold-2)"
          />
        </g>
        <g style={px(0.4)}>
          <path
            d="M0 470Q320 424 700 476Q1060 528 1440 466L1440 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 490Q320 444 700 496Q1060 548 1440 486L1440 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M120 620Q340 520 520 470Q700 420 900 402L908 424Q718 446 548 490Q382 534 244 620Z"
            fill="var(--trail)"
          />
          <path
            d="M186 620Q382 530 552 484Q714 440 902 412L904 420Q720 448 560 494Q400 540 268 620Z"
            fill="var(--trail-2)"
            opacity="0.6"
          />
        </g>
      </svg>
      <MistBand
        left="8%"
        top="52%"
        width="44%"
        height="14px"
        blur={5}
        opacity={0.7}
        duration={34}
        reverse
      />
      <NightGlow left="24%" top="66%" size="4%" />
      <NightGlow left="44%" top="59%" size="3.2%" />
      <HikerAt left="25.4%" top="67.5%" width="1.4%" height="4.4%" />
      <HikerAt left="45%" top="60.5%" width="1.1%" height="3.5%" />
      <HikerAt left="58%" top="56%" width="0.85%" height="2.7%" />
    </>
  );
}

function AcademicArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={9} />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.15)}>
          <path
            d="M0 300Q200 250 420 286Q700 330 1000 262Q1220 212 1440 254L1440 620L0 620Z"
            fill="var(--mid)"
          />
          <path
            d="M0 322Q200 272 420 308Q700 352 1000 284Q1220 234 1440 276L1440 620L0 620Z"
            fill="var(--mid-2)"
          />
          <path
            d="M60 300l11-30 11 30zM92 306l10-26 10 26zM124 298l12-32 12 32zM160 306l10-27 10 27zM196 300l11-29 11 29zM236 308l10-26 10 26zM276 304l12-31 12 31zM320 310l10-27 10 27zM366 306l11-29 11 29zM414 308l10-26 10 26zM980 268l11-30 11 30zM1014 262l12-33 12 33zM1050 258l10-27 10 27zM1088 252l12-31 12 31zM1128 248l11-29 11 29zM1170 244l12-32 12 32zM1214 238l10-27 10 27zM1256 234l12-31 12 31zM1300 230l11-29 11 29zM1344 226l12-32 12 32z"
            fill="var(--tree)"
          />
        </g>
        <g style={px(0.4)}>
          <path
            d="M0 430Q360 380 740 432Q1080 478 1440 418L1440 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 452Q360 402 740 454Q1080 500 1440 440L1440 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M420 596L700 544L360 500L780 452L420 418L860 392"
            fill="none"
            stroke="var(--trail)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M420 596L700 544L360 500L780 452L420 418L860 392"
            fill="none"
            stroke="var(--trail-2)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M120 500l16-42 16 42zM168 512l14-38 14 38zM220 496l18-46 18 46zM984 470l16-42 16 42zM1036 482l14-38 14 38zM1090 466l18-46 18 46zM1150 478l15-40 15 40zM1210 462l17-44 17 44zM1274 470l15-40 15 40z"
            fill="var(--tree-2)"
          />
        </g>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(112deg, rgb(255 244 214 / 17%) 0 22px, rgb(255 255 255 / 0%) 22px 96px)",
          opacity: "calc(1 - var(--night, 0))",
        }}
      />
      <MistBand
        left="16%"
        top="56%"
        width="40%"
        height="13px"
        blur={5}
        opacity={0.65}
        duration={32}
      />
      <NightGlow left="47%" top="71%" size="3.6%" />
      <HikerAt left="48.2%" top="72%" width="1.3%" height="4.2%" />
    </>
  );
}

function RimArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={13} />
      <SunOrb left="8%" top="8%" size="5%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.12)}>
          <path
            d="M0 296Q200 274 420 288L640 196Q680 174 720 200L900 292Q1100 314 1440 288L1440 470L0 470Z"
            fill="var(--ridge)"
          />
          <path d="M700 198L900 292L744 292Z" fill="var(--ridge-2)" />
          <path
            d="M180 436Q520 396 900 408Q1240 418 1332 452Q1240 506 880 518Q460 526 210 490Q148 464 180 436Z"
            fill="var(--lake)"
          />
          <path
            d="M212 442Q540 408 900 420Q1180 428 1290 452Q1180 470 890 464Q500 456 236 462Q194 454 212 442Z"
            fill="var(--lake-2)"
            opacity="0.75"
          />
          <path
            d="M688 408L758 300Q772 284 786 300L860 408Z"
            fill="var(--cone)"
          />
          <path
            d="M786 300Q772 284 762 302L860 408L792 408Z"
            fill="var(--cone-2)"
          />
        </g>
        <g style={px(0.42)}>
          <path
            d="M0 520Q300 476 700 528Q1060 574 1440 512L1440 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 540Q300 496 700 548Q1060 594 1440 532L1440 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M980 540Q1090 524 1200 536Q1250 542 1252 556L980 566Z"
            fill="var(--sand)"
          />
          <path
            d="M120 560l14-38 14 38zM162 568l12-32 12 32zM208 554l16-42 16 42z"
            fill="var(--tree-2)"
          />
        </g>
      </svg>
      <MistBand
        left="6%"
        top="62%"
        width="52%"
        height="18px"
        blur={7}
        duration={40}
        reverse
      />
      <MistBand
        left="34%"
        top="70%"
        width="46%"
        height="14px"
        blur={6}
        opacity={0.7}
        duration={28}
      />
      <NightGlow left="76%" top="83%" size="3.6%" />
      <HikerAt left="77.4%" top="84%" width="1.5%" height="4.8%" />
    </>
  );
}

function DescentArt({ misty }: { misty: boolean }) {
  const veil = misty ? 1 : 0.18;
  const veilSoft = misty ? 0.85 : 0.12;
  return (
    <>
      <SkyGradient />
      <StarField seed={17} />
      <SunOrb left="70%" top="7%" size="4.6%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.12)}>
          <path
            d="M420 300Q640 280 860 292Q1120 306 1440 286L1440 430L420 430Z"
            fill="var(--ridge)"
          />
          <path
            d="M520 442Q820 412 1120 428Q1370 442 1424 472Q1320 518 1000 530Q660 538 546 498Q506 470 520 442Z"
            fill="var(--lake)"
          />
          <path
            d="M556 448Q840 422 1120 436Q1300 444 1372 468Q1280 484 1010 478Q700 470 574 470Q542 460 556 448Z"
            fill="var(--lake-2)"
            opacity="0.7"
          />
          <path
            d="M1006 428L1058 344Q1070 330 1082 344L1136 428Z"
            fill="var(--cone)"
          />
          <path
            d="M1082 344Q1070 330 1062 346L1136 428L1088 428Z"
            fill="var(--cone-2)"
          />
        </g>
        <g style={px(0.42)}>
          <path
            d="M0 120Q120 300 260 440Q360 540 420 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 176Q110 330 236 452Q330 546 380 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M96 232L268 316L118 396L318 480L156 556"
            fill="none"
            stroke="var(--trail)"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M96 232L268 316L118 396L318 480L156 556"
            fill="none"
            stroke="var(--trail-2)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M0 560Q220 520 520 566Q900 620 1440 556L1440 620L0 620Z"
            fill="var(--near)"
          />
        </g>
      </svg>
      {/*
        The thin drifting bands below read as texture, not as weather on
        their own — a scene-wide scrim is what actually makes "in mist" vs.
        "clear weather" legible at a glance, which is the whole point of this
        variant: the confidential page's view is genuinely obscured, the open
        one genuinely is not.
      */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--mist)", opacity: misty ? 0.55 : 0.08 }}
      />
      <MistBand
        left="2%"
        top="52%"
        width="64%"
        height="26px"
        blur={9}
        opacity={veil}
        duration={36}
        reverse
      />
      <MistBand
        left="26%"
        top="62%"
        width="72%"
        height="30px"
        blur={11}
        opacity={veil}
        duration={30}
      />
      <MistBand
        left="40%"
        top="72%"
        width="58%"
        height="22px"
        blur={8}
        opacity={veil}
        duration={26}
        reverse
      />
      <MistBand
        left="14%"
        top="46%"
        width="46%"
        height="18px"
        blur={7}
        opacity={veilSoft}
        duration={34}
      />
      <NightGlow left="8%" top="61%" size="3.6%" />
      <HikerAt left="9.4%" top="62%" width="1.4%" height="4.5%" />
    </>
  );
}

function DocsArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={21} />
      <SunOrb left="82%" top="8%" size="4.6%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.13)}>
          <path
            d="M0 280Q220 250 460 268L700 180Q740 158 780 184L980 272Q1180 296 1440 268L1440 420L0 420Z"
            fill="var(--ridge)"
          />
          <path d="M760 182L980 272L804 272Z" fill="var(--ridge-2)" />
          <path
            d="M0 404Q360 380 760 392Q1140 404 1440 386L1440 486Q1140 508 760 496Q360 484 0 500Z"
            fill="var(--lake)"
          />
          <path
            d="M0 412Q360 388 760 400Q1140 412 1440 394L1440 424Q1140 440 760 428Q360 416 0 432Z"
            fill="var(--lake-2)"
            opacity="0.7"
          />
        </g>
        <g style={px(0.4)}>
          <path
            d="M0 486Q400 456 800 486Q1150 512 1440 482L1440 620L0 620Z"
            fill="var(--sand)"
          />
          <path
            d="M0 508Q400 478 800 508Q1150 534 1440 504L1440 620L0 620Z"
            fill="var(--sand-2)"
          />
          <path d="M300 556L360 476L420 556Z" fill="var(--tent)" />
          <path d="M360 476L420 556L392 556Z" fill="var(--tent-2)" />
          <path d="M470 566L522 496L574 566Z" fill="var(--tent)" />
          <path d="M522 496L574 566L550 566Z" fill="var(--tent-2)" />
          <path d="M900 560L946 498L992 560Z" fill="var(--tent)" />
          <path d="M946 498L992 560L970 560Z" fill="var(--tent-2)" />
          <ellipse
            cx="1180"
            cy="536"
            rx="86"
            ry="24"
            fill="var(--lake-2)"
            opacity="0.85"
          />
          <path
            d="M700 566l12-32 12 32zM736 572l10-28 10 28z"
            fill="var(--tree-2)"
          />
        </g>
      </svg>
      <div
        className="absolute rounded-full"
        style={{
          left: "79%",
          top: "78%",
          width: "5%",
          height: "44px",
          background:
            "linear-gradient(180deg, rgb(255 255 255 / 75%), transparent)",
          filter: "blur(6px)",
          animation: "rj-steam 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: "84%",
          top: "76%",
          width: "4%",
          height: "52px",
          background:
            "linear-gradient(180deg, rgb(255 255 255 / 60%), transparent)",
          filter: "blur(7px)",
          animation: "rj-steam 10s ease-in-out infinite 1.4s",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: "74%",
          top: "80%",
          width: "3.4%",
          height: "40px",
          background:
            "linear-gradient(180deg, rgb(255 255 255 / 55%), transparent)",
          filter: "blur(6px)",
          animation: "rj-steam 9s ease-in-out infinite .7s",
        }}
      />
      <MistBand
        left="8%"
        top="56%"
        width="44%"
        height="14px"
        blur={6}
        opacity={0.6}
        duration={34}
      />
      <NightGlow left="23.5%" top="83%" size="4%" />
      <NightGlow left="35%" top="85%" size="3.2%" />
      <HikerAt left="31.6%" top="83%" width="1.4%" height="4.5%" />
    </>
  );
}

function SummitArt() {
  return (
    <>
      <SkyGradient warm />
      <StarField seed={29} />
      <SunOrb left="18%" top="30%" size="7%" />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.12)}>
          <path
            d="M840 400L920 306Q934 290 948 308L1024 400Z"
            fill="var(--ridge)"
          />
          <path
            d="M1120 400L1178 330Q1190 316 1202 332L1258 400Z"
            fill="var(--ridge)"
          />
          <path
            d="M0 404Q140 366 300 396Q420 418 560 400Q700 380 840 404Q980 426 1120 404Q1280 378 1440 406L1440 470L0 470Z"
            fill="var(--cloud)"
          />
          <path
            d="M0 448Q180 414 380 442Q560 466 760 444Q960 420 1160 446Q1320 466 1440 448L1440 520L0 520Z"
            fill="var(--cloud)"
            opacity="0.75"
          />
        </g>
        <g style={px(0.42)}>
          <path
            d="M0 540Q260 466 620 498Q980 528 1240 462Q1350 436 1440 448L1440 620L0 620Z"
            fill="var(--sand)"
          />
          <path
            d="M0 562Q260 488 620 520Q980 550 1240 484Q1350 458 1440 470L1440 620L0 620Z"
            fill="var(--sand-2)"
          />
          <path d="M690 496L700 496L702 470L688 470Z" fill="var(--wood)" />
          <rect
            x="676"
            y="450"
            width="40"
            height="22"
            rx="6"
            fill="var(--wood-2)"
          />
        </g>
      </svg>
      <MistBand
        left="4%"
        top="70%"
        width="50%"
        height="18px"
        blur={7}
        opacity={0.7}
        duration={42}
        reverse
      />
      <NightGlow left="46.6%" top="79%" size="4%" />
      <HikerAt left="47.6%" top="79.5%" width="1.5%" height="4.8%" />
    </>
  );
}

function LostArt() {
  return (
    <>
      <SkyGradient />
      <StarField seed={33} />
      <svg {...viewport} style={svgFill}>
        <g style={px(0.14)}>
          <path
            d="M0 360Q240 330 480 352Q760 378 1020 344Q1240 316 1440 342L1440 620L0 620Z"
            fill="var(--mid)"
          />
          <path
            d="M0 382Q240 352 480 374Q760 400 1020 366Q1240 338 1440 364L1440 620L0 620Z"
            fill="var(--mid-2)"
          />
        </g>
        <g style={px(0.4)}>
          <path
            d="M0 480Q360 440 740 484Q1080 522 1440 470L1440 620L0 620Z"
            fill="var(--near)"
          />
          <path
            d="M0 502Q360 462 740 506Q1080 544 1440 492L1440 620L0 620Z"
            fill="var(--near-2)"
          />
          <path
            d="M700 620Q712 540 640 486Q580 442 470 424"
            fill="none"
            stroke="var(--trail)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M700 620Q724 542 812 500Q900 458 1010 448"
            fill="none"
            stroke="var(--trail)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <g
            style={{
              transform: "rotate(-13deg)",
              transformOrigin: "660px 520px",
            }}
          >
            <rect
              x="652"
              y="404"
              width="14"
              height="120"
              rx="7"
              fill="var(--wood)"
            />
            <rect
              x="556"
              y="410"
              width="104"
              height="24"
              rx="8"
              fill="var(--wood-2)"
              opacity="0.85"
            />
          </g>
        </g>
      </svg>
      <MistBand
        left="-4%"
        top="44%"
        width="70%"
        height="34px"
        blur={12}
        duration={30}
        reverse
      />
      <MistBand
        left="24%"
        top="56%"
        width="80%"
        height="40px"
        blur={14}
        duration={26}
      />
      <MistBand
        left="6%"
        top="68%"
        width="66%"
        height="30px"
        blur={11}
        duration={22}
        reverse
      />
      <MistBand
        left="40%"
        top="78%"
        width="64%"
        height="26px"
        blur={10}
        duration={34}
      />
      <HikerAt left="44%" top="78%" width="1.3%" height="4.2%" />
    </>
  );
}

function artFor(stage: Stage) {
  switch (stage) {
    case "home":
      return <HomeArt />;
    case "work":
      return <WorkArt />;
    case "academic":
      return <AcademicArt />;
    case "projects":
      return <RimArt />;
    case "confidential":
      return <DescentArt misty />;
    case "open":
      return <DescentArt misty={false} />;
    case "docs":
      return <DocsArt />;
    case "guestbook":
      return <SummitArt />;
    case "notfound":
      return <LostArt />;
  }
}

/**
 * The hero banner: one scene from the ascent, full width edge to edge. Its
 * own sky-to-ground gradient — sky, ridge, mid-ground, near-ground — is what
 * carries the "fullscreen" feeling rather than an inflated container height:
 * every path in `artFor` was composed for this exact 1440×620 frame, and
 * stretching the box taller forces `preserveAspectRatio="slice"` to zoom and
 * crop the composition (signposts and trees pushed off the visible edges,
 * fog bands — sized in absolute pixels — shrinking to near-invisible against
 * an enlarged scene). Matching the native ratio keeps every hand-placed
 * element exactly where it was drawn; content always sits in a solid card
 * below regardless, so legibility never depends on the illustration.
 *
 * Parallax offset (`--px`) comes from scroll position on THIS page; it resets
 * to 0 on every route change because `useScrollProgress` remounts per page.
 */
export function Scene({ stage }: { stage: Stage }) {
  const progress = useScrollProgress();

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "1440 / 620",
        ["--px" as string]: `${progress * 180}px`,
      }}
    >
      {artFor(stage)}
    </div>
  );
}
