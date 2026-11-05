import { random } from "remotion";
import { Person } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const BARS = [130, 230, 330, 440, 550];
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  x: random(`cx${i}`) * 1920,
  speed: 250 + random(`cs${i}`) * 300,
  color: [COLORS.teal, COLORS.yellow, COLORS.magenta, COLORS.cyan][i % 4],
}));

export const Growth = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const trendProgress = ramp(t, 1, 8.8, 0, 1);
  const barStart = isPortrait ? 780 : 830;
  const barStep = isPortrait ? 150 : 170;
  const barWidth = isPortrait ? 115 : 130;

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      {t > 9.5 &&
        CONFETTI.map((c, i) => {
          const dt = t - 9.5;
          const x = c.x + Math.sin(dt * 4 + i) * 36;
          const y = dt * c.speed - (isPortrait ? 520 : 40);
          return (
            <g key={c.x} transform={`translate(${x} ${y}) rotate(${dt * 140 + i * 30})`}>
              <rect x={-10} y={-6} width={20} height={12} rx={4} fill={c.color} />
            </g>
          );
        })}
      {BARS.map((height, i) => {
        const h = ramp(t, i * 1.5 + 0.4, i * 1.5 + 2.1, 0, height);
        const bx = barStart + i * barStep;
        return (
          <g key={height}>
            <rect x={bx} y={GROUND_Y - h} width={barWidth} height={h} rx={20} fill={COLORS.teal} />
            {h > 40 && (
              <circle cx={bx + barWidth / 2} cy={GROUND_Y - h - 24} r={10} fill={COLORS.yellow} />
            )}
          </g>
        );
      })}
      <path
        d={
          isPortrait
            ? "M838 706 L988 606 L1138 506 L1288 396 L1438 286"
            : "M895 706 L1065 606 L1235 506 L1405 396 L1575 286"
        }
        fill="none"
        stroke={COLORS.yellow}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={900}
        strokeDashoffset={900 * (1 - trendProgress)}
      />
      <Pop at={0.5} x={isPortrait ? 960 : 1235} y={isPortrait ? -120 : 170} float>
        <Tag text="Pemahaman ↑" color={COLORS.yellow} size={isPortrait ? 52 : 44} />
      </Pop>
      <Pop x={isPortrait ? 520 : 400} y={GROUND_Y}>
        <Person mood="happy" cheer={t > 9.5} look="right" gesture={t > 4 && t <= 9.5} />
      </Pop>
      <Pop at={4.8} x={isPortrait ? 600 : 400} y={isPortrait ? 120 : 330} float>
        <Tag text="Tugas selesai ✓" size={isPortrait ? 52 : 44} />
      </Pop>
    </Stage>
  );
};
