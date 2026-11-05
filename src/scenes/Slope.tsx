import { Person, Robot } from "../components/characters";
import { Bubble, Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const FROM_X = 480;
const TO_X = 1340;
const HANDED_OVER = [
  { text: "Tugas kuliah", at: 5.3, color: COLORS.cyan },
  { text: "Proyek", at: 8.3, color: COLORS.yellow },
  { text: "Presentasi", at: 9.8, color: COLORS.orange },
  { text: "Keputusan", at: 12.5, color: COLORS.magenta },
];

const Flying = ({ text, at, color }: (typeof HANDED_OVER)[number]) => {
  const t = useSeconds();
  if (t < at || t > at + 2) return null;
  const p = (t - at) / 2;
  const x = FROM_X + (TO_X - FROM_X) * p;
  const y = 560 - Math.sin(p * Math.PI) * 240;
  return (
    <g transform={`translate(${x} ${y}) scale(${1 - p * p * 0.7})`}>
      <Tag text={text} color={color} />
    </g>
  );
};

export const Slope = () => {
  const t = useSeconds();
  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      <g transform={`translate(${FROM_X} ${GROUND_Y}) scale(${ramp(t, 5, 20, 1, 0.5)})`}>
        <Person mood={t < 2 ? "happy" : "neutral"} />
        <g transform="translate(0 -470)">
          <Bulb glow={ramp(t, 5, 18, 1, 0)} />
        </g>
      </g>
      <g transform={`translate(${TO_X} ${GROUND_Y}) scale(${ramp(t, 5, 20, 0.8, 2)})`}>
        <Robot />
      </g>
      <Pop at={1.5} until={5} x={880} y={240}>
        <Bubble lines={["Kenapa tidak", "sekalian saja?"]} />
      </Pop>
      {HANDED_OVER.map((item) => (
        <Flying key={item.text} {...item} />
      ))}
    </Stage>
  );
};
