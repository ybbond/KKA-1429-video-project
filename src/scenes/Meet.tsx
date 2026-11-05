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
  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      <circle cx={ramp(t, 0, 15, 180, 1740)} cy={110} r={60} fill={COLORS.silver} />
      <g transform={`translate(960 ${GROUND_Y})`}>
        <Person mood={t < 5 ? "neutral" : "worried"} />
        <Desk />
      </g>
      <Pop at={1} until={5} x={960} y={400}>
        <Tag text="Raka · Ilmu Komputer" />
      </Pop>
      {CONCEPTS.map((c) => (
        <Pop key={c.text} at={c.at} x={c.x} y={c.y} float>
          <Tag text={c.text} color={c.color} />
        </Pop>
      ))}
      <Pop at={9} x={960} y={360} float>
        <text textAnchor="middle" fontSize={130} fontWeight={800} fill={COLORS.white}>?</text>
      </Pop>
    </Stage>
  );
};
