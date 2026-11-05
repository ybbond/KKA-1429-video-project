import { Person } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Desk } from "../components/props";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const CONCEPTS = [
  { text: "Rekursi", x: 560, y: 260, at: 5.2, color: COLORS.magenta },
  { text: "Pointer", x: 1360, y: 260, at: 6, color: COLORS.cyan },
  { text: "Algoritma", x: 500, y: 520, at: 6.8, color: COLORS.yellow },
  { text: "Big-O", x: 1420, y: 520, at: 7.6, color: COLORS.orange },
];

export const Meet = () => {
  const t = useSeconds();
  const moonX = ramp(t, 0, 15, 180, 1740);
  const moonY = 170 - Math.sin((t / 15) * Math.PI) * 75;
  const lookDir = t < 5 ? "down" : t < 7 ? "left" : t < 9 ? "right" : "up";

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      <circle cx={moonX} cy={moonY} r={96} fill={COLORS.silver} opacity={0.16} />
      <circle cx={moonX} cy={moonY} r={60} fill={COLORS.silver} />
      <circle cx={moonX - 18} cy={moonY - 12} r={10} fill={COLORS.indigo} opacity={0.22} />
      <circle cx={moonX + 16} cy={moonY + 14} r={14} fill={COLORS.indigo} opacity={0.18} />

      {CONCEPTS.map((c, i) => {
        if (t < c.at) return null;
        const ox = c.x + Math.cos(t * 1.6 + i) * 18;
        const oy = c.y + Math.sin(t * 2 + i) * 14;
        return (
          <line
            key={`tether-${c.text}`}
            x1={960}
            y1={GROUND_Y - 310}
            x2={ox}
            y2={oy}
            stroke={c.color}
            strokeWidth={4}
            strokeDasharray="10 14"
            strokeDashoffset={-t * 45}
            opacity={0.45}
          />
        );
      })}

      <g transform={`translate(960 ${GROUND_Y})`}>
        <Person mood={t < 5 ? "neutral" : "worried"} typing={t < 9.5} look={lookDir} />
        <Desk />
      </g>
      <Pop at={1} until={5} x={960} y={400}>
        <Tag text="Raka · Ilmu Komputer" />
      </Pop>
      {CONCEPTS.map((c, i) => (
        <Pop
          key={c.text}
          at={c.at}
          x={c.x + Math.cos(t * 1.6 + i) * 18}
          y={c.y + Math.sin(t * 2 + i) * 14}
          float
        >
          <Tag text={c.text} color={c.color} />
        </Pop>
      ))}
      <Pop at={9} x={960} y={350} float>
        <g transform={`rotate(${Math.sin(t * 4) * 10})`}>
          <text textAnchor="middle" fontSize={130} fontWeight={800} fill={COLORS.white}>?</text>
          <text x={-110} y={30} textAnchor="middle" fontSize={72} fontWeight={800} fill={COLORS.magenta} opacity={0.85}>?</text>
          <text x={110} y={20} textAnchor="middle" fontSize={80} fontWeight={800} fill={COLORS.cyan} opacity={0.85}>?</text>
        </g>
      </Pop>
    </Stage>
  );
};
