import { Person, Robot } from "../components/characters";
import { Bubble, Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const HANDED_OVER = [
  { text: "Tugas kuliah", at: 5.3, color: COLORS.cyan },
  { text: "Proyek", at: 8.3, color: COLORS.yellow },
  { text: "Presentasi", at: 9.8, color: COLORS.orange },
  { text: "Keputusan", at: 12.5, color: COLORS.magenta },
];

const Flying = ({
  text,
  at,
  color,
  fromX,
  toX,
}: (typeof HANDED_OVER)[number] & { fromX: number; toX: number }) => {
  const t = useSeconds();
  if (t < at || t > at + 2.2) return null;
  const p = Math.min(1, (t - at) / 2);
  const x = fromX + (toX - fromX) * p;
  const y = 560 - Math.sin(p * Math.PI) * 260;
  const pulse = p === 1 ? (t - (at + 2)) * 5 : 0;
  return (
    <g>
      {p < 1 && (
        <g transform={`translate(${x} ${y}) rotate(${(p - 0.5) * 28}) scale(${1 - p * p * 0.65})`}>
          <Tag text={text} color={color} />
        </g>
      )}
      {p === 1 && (
        <circle
          cx={toX}
          cy={GROUND_Y - 260}
          r={40 + pulse * 140}
          fill="none"
          stroke={color}
          strokeWidth={6}
          opacity={Math.max(0, 1 - pulse)}
        />
      )}
    </g>
  );
};

export const Slope = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const fromX = isPortrait ? 540 : 480;
  const toX = isPortrait ? 1280 : 1340;
  const robotScale = ramp(t, 5, 20, 0.8, 2);

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      {t >= 5 && (
        <path
          d={`M${fromX + 60} 580 Q910 260 ${toX - 80} 540`}
          fill="none"
          stroke={COLORS.magenta}
          strokeWidth={6}
          strokeDasharray="18 16"
          strokeDashoffset={-t * 110}
          opacity={0.45}
        />
      )}
      <g transform={`translate(${fromX} ${GROUND_Y}) scale(${ramp(t, 5, 20, 1, 0.5)})`}>
        <Person mood={t < 2 ? "happy" : t < 13 ? "neutral" : "worried"} look="right" gesture={t > 5 && t < 14} />
        <g transform="translate(0 -470)">
          <Bulb glow={ramp(t, 5, 18, 1, 0)} />
        </g>
      </g>
      <g transform={`translate(${toX} ${GROUND_Y}) scale(${robotScale})`}>
        {t > 10 && (
          <g transform={`translate(0 -160) rotate(${t * 36})`} opacity={ramp(t, 10, 14, 0, 0.5)}>
            <circle r={145} fill="none" stroke={COLORS.magenta} strokeWidth={4} strokeDasharray="20 14" />
          </g>
        )}
        <Robot look="left" active={t >= 5} overdrive={t > 12} />
      </g>
      <Pop at={1.5} until={5} x={880} y={240}>
        <Bubble lines={["Kenapa tidak", "sekalian saja?"]} />
      </Pop>
      {HANDED_OVER.map((item) => (
        <Flying key={item.text} {...item} fromX={fromX} toX={toX} />
      ))}
    </Stage>
  );
};
