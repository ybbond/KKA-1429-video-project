import { Person, Robot } from "../components/characters";
import { Headline, Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const LIST_END = 12;

const Column = ({ x, at, title, items, color }: { x: number; at: number; title: string; items: string[]; color: string }) => (
  <>
    <Pop at={at} until={LIST_END} x={x} y={210}>
      <Headline lines={[title]} size={64} />
    </Pop>
    {items.map((item, i) => (
      <Pop key={item} at={at + 0.8 + i * 0.9} until={LIST_END} x={x} y={350 + i * 140} float>
        <Tag text={item} color={color} size={52} />
      </Pop>
    ))}
  </>
);

export const Takeaway = () => {
  const t = useSeconds();
  return (
    <Stage to={COLORS.violet}>
      {t < LIST_END && (
        <line
          x1={960}
          y1={170}
          x2={960}
          y2={ramp(t, 0.5, 2.5, 170, 740)}
          stroke={COLORS.silver}
          strokeWidth={4}
          strokeDasharray="14 14"
          opacity={ramp(t, 11.4, 12, 0.35, 0)}
        />
      )}
      <Column x={500} at={0.3} title="Gunakan AI untuk" items={["belajar", "mengeksplorasi", "memperbaiki karya"]} color={COLORS.teal} />
      <Column x={1420} at={6} title="Jangan gantikan" items={["pemikiran", "integritas", "tanggung jawab"]} color={COLORS.orange} />
      {t > 12.6 && (
        <g transform={`translate(965 ${GROUND_Y - 210}) rotate(${t * 16})`} opacity={ramp(t, 12.6, 13.8, 0, 0.35)}>
          <circle r={310} fill="none" stroke={COLORS.teal} strokeWidth={4} strokeDasharray="24 18" />
        </g>
      )}
      <Pop at={12.4} x={960} y={190}>
        <Headline lines={["AI membantu.", "Tanggung jawab tetap milikmu."]} size={84} />
      </Pop>
      <Pop at={12.8} x={820} y={GROUND_Y} scale={0.95}>
        <Person mood="happy" look="right" gesture={t > 14} />
      </Pop>
      <Pop at={13.4} x={820} y={GROUND_Y - 455} float>
        <Bulb />
      </Pop>
      <Pop at={13.2} x={1110} y={GROUND_Y} scale={0.75}>
        <Robot look="left" active />
      </Pop>
    </Stage>
  );
};
