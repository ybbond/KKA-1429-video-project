import { random } from "remotion";
import { Person } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const BARS = [130, 230, 330, 440, 550];
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  x: random(`cx${i}`) * 1920,
  speed: 250 + random(`cs${i}`) * 300,
  color: [COLORS.teal, COLORS.yellow, COLORS.magenta, COLORS.cyan][i % 4],
}));

export const Growth = () => {
  const t = useSeconds();
  const trendProgress = ramp(t, 1, 8.8, 0, 1);

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      {t > 9.5 &&
        CONFETTI.map((c, i) => {
          const dt = t - 9.5;
          const x = c.x + Math.sin(dt * 4 + i) * 36;
          const y = dt * c.speed - 40;
          return (
            <g key={c.x} transform={`translate(${x} ${y}) rotate(${dt * 140 + i * 30})`}>
              <rect x={-10} y={-6} width={20} height={12} rx={4} fill={c.color} />
            </g>
          );
        })}
      {BARS.map((height, i) => {
        const h = ramp(t, i * 1.5 + 0.4, i * 1.5 + 2.1, 0, height);
        const bx = 830 + i * 170;
        return (
          <g key={height}>
            <rect x={bx} y={GROUND_Y - h} width={130} height={h} rx={20} fill={COLORS.teal} />
            {h > 40 && (
              <circle cx={bx + 65} cy={GROUND_Y - h - 24} r={10} fill={COLORS.yellow} />
            )}
          </g>
        );
      })}
      <path
        d="M895 706 L1065 606 L1235 506 L1405 396 L1575 286"
        fill="none"
        stroke={COLORS.yellow}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={900}
        strokeDashoffset={900 * (1 - trendProgress)}
      />
      <Pop at={0.5} x={1235} y={170} float>
        <Tag text="Pemahaman ↑" color={COLORS.yellow} />
      </Pop>
      <Pop x={400} y={GROUND_Y}>
        <Person mood="happy" cheer={t > 9.5} look="right" gesture={t > 4 && t <= 9.5} />
      </Pop>
      <Pop at={4.8} x={400} y={330} float>
        <Tag text="Tugas selesai ✓" />
      </Pop>
    </Stage>
  );
};
