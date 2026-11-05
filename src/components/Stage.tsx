import type { ReactNode } from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const GROUND_Y = 860;

export const useIsPortrait = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: random(`x${i}`) * 1920,
  y: random(`y${i}`) * 800,
  r: 1.5 + random(`r${i}`) * 3,
  phase: random(`p${i}`) * 6,
}));

export const Ground = ({ color }: { color: string }) => (
  <g>
    <ellipse cx={960} cy={2120} rx={2240} ry={1325} fill={COLORS.teal} opacity={0.12} />
    <ellipse cx={960} cy={2120} rx={2200} ry={1300} fill={color} />
  </g>
);

type StageProps = {
  from?: string;
  to?: string;
  ground?: string;
  stars?: boolean;
  children: ReactNode;
};

/** Scene backdrop: gradient sky, twinkling stars, optional hill, and a 16:9 or 9:16 SVG canvas with a slow zoom. */
export const Stage = ({ from = COLORS.night, to = COLORS.indigo, ground, stars = true, children }: StageProps) => {
  const frame = useCurrentFrame();
  const isPortrait = useIsPortrait();
  const shootCycle = (frame % 180) / 45;
  const showShootingStar = stars && shootCycle <= 1;
  const shootX = (isPortrait ? 1380 : 1480) - shootCycle * 520;
  const shootY = (isPortrait ? -260 : 120) + shootCycle * 210;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(${from}, ${to})` }}>
      <svg
        viewBox={isPortrait ? "285 -560 1350 2400" : "0 0 1920 1080"}
        style={{ width: "100%", height: "100%", fontFamily: FONT, transform: `scale(${1 + frame * 0.00012})` }}
      >
        {stars &&
          STARS.map((s, i) => (
            <circle
              key={`${s.x}`}
              cx={(s.x + frame * (i % 3 === 0 ? 0.12 : 0.04)) % 1920}
              cy={isPortrait ? -540 + (s.y / 800) * 1340 : s.y}
              r={s.r}
              fill={i % 7 === 0 ? COLORS.cyan : i % 11 === 0 ? COLORS.yellow : COLORS.white}
              opacity={0.45 + Math.sin(frame / 18 + s.phase) * 0.38}
            />
          ))}
        {showShootingStar && (
          <line
            x1={shootX}
            y1={shootY}
            x2={shootX + 95}
            y2={shootY - 38}
            stroke={COLORS.white}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={Math.sin(shootCycle * Math.PI) * 0.7}
          />
        )}
        {ground && <Ground color={ground} />}
        {children}
      </svg>
    </AbsoluteFill>
  );
};
