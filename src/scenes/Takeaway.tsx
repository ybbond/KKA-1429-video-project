import { Person, Robot } from "../components/characters";
import { Headline, Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const LIST_END = 12;

const Column = ({
  x,
  y,
  stepY,
  at,
  title,
  items,
  color,
}: {
  x: number;
  y: number;
  stepY: number;
  at: number;
  title: string;
  items: string[];
  color: string;
}) => (
  <>
    <Pop at={at} until={LIST_END} x={x} y={y}>
      <Headline lines={[title]} size={64} />
    </Pop>
    {items.map((item, i) => (
      <Pop key={item} at={at + 0.8 + i * 0.9} until={LIST_END} x={x} y={y + 130 + i * stepY} float>
        <Tag text={item} color={color} size={52} />
      </Pop>
    ))}
  </>
);

export const Takeaway = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  return (
    <Stage to={COLORS.violet}>
      {t < LIST_END && (
        <line
          x1={isPortrait ? 560 : 960}
          y1={isPortrait ? 200 : 170}
          x2={isPortrait ? ramp(t, 0.5, 2.5, 560, 1360) : 960}
          y2={isPortrait ? 200 : ramp(t, 0.5, 2.5, 170, 740)}
          stroke={COLORS.silver}
          strokeWidth={4}
          strokeDasharray="14 14"
          opacity={ramp(t, 11.4, 12, 0.35, 0)}
        />
      )}
      <Column
        x={isPortrait ? 960 : 500}
        y={isPortrait ? -340 : 210}
        stepY={isPortrait ? 125 : 140}
        at={0.3}
        title="Gunakan AI untuk"
        items={["belajar", "mengeksplorasi", "memperbaiki karya"]}
        color={COLORS.teal}
      />
      <Column
        x={isPortrait ? 960 : 1420}
        y={isPortrait ? 310 : 210}
        stepY={isPortrait ? 125 : 140}
        at={6}
        title="Jangan gantikan"
        items={["pemikiran", "integritas", "tanggung jawab"]}
        color={COLORS.orange}
      />
      {t > 12.6 && (
        <g transform={`translate(965 ${GROUND_Y - 210}) rotate(${t * 16})`} opacity={ramp(t, 12.6, 13.8, 0, 0.35)}>
          <circle r={310} fill="none" stroke={COLORS.teal} strokeWidth={4} strokeDasharray="24 18" />
        </g>
      )}
      <Pop at={12.4} x={960} y={isPortrait ? -40 : 190}>
        <Headline lines={["AI membantu.", "Tanggung jawab tetap milikmu."]} size={isPortrait ? 66 : 84} />
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
