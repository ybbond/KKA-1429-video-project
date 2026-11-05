import type { ReactNode } from "react";
import { Person, Robot } from "../components/characters";
import { Headline, Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const STROKE = { fill: "none", stroke: COLORS.night, strokeWidth: 12, strokeLinecap: "round" } as const;

const TOOLS: { label: string; icon: ReactNode }[] = [
  { label: "Cangkul", icon: <><path d="M-45 55 L30 -55" {...STROKE} /><path d="M18 -62 L62 -48 L52 2Z" fill={COLORS.night} /></> },
  { label: "Palu", icon: <><path d="M-35 55 L15 -15" {...STROKE} /><rect x={-42} y={-24} width={84} height={40} rx={8} fill={COLORS.night} transform="translate(22 -24) rotate(35)" /></> },
  { label: "Komputer", icon: <path d="M-40 -40 H40 V20 H-40Z M-55 42 H55" {...STROKE} /> },
  {
    label: "AI",
    icon: (
      <g transform="translate(0 62) scale(0.35)">
        <Robot />
      </g>
    ),
  },
];

const Tree = () => (
  <g>
    <rect x={-22} y={-260} width={44} height={260} rx={18} fill={COLORS.wood} />
    <circle cy={-340} r={130} fill={COLORS.forest} />
    <circle cx={-90} cy={-260} r={90} fill={COLORS.green} />
    <circle cx={90} cy={-270} r={90} fill={COLORS.green} />
  </g>
);

export const Mandate = () => {
  const t = useSeconds();
  const sway = Math.sin(t * 2) * 2.5;
  const timelineLine = ramp(t, 7.8, 12.2, 0, 840);

  return (
    <Stage from="#1e6fb8" to="#a8ecdf" ground={COLORS.green} stars={false}>
      <g transform="translate(1720 150)">
        <circle r={112 + Math.sin(t * 3) * 8} fill={COLORS.yellow} opacity={0.28} />
        <circle r={80} fill={COLORS.yellow} />
      </g>
      <g opacity={0.45}>
        <ellipse cx={360 + t * 14} cy={150} rx={110} ry={32} fill={COLORS.white} />
        <ellipse cx={1180 + t * 10} cy={110} rx={140} ry={38} fill={COLORS.white} />
      </g>
      <g transform={`translate(1560 ${GROUND_Y}) scale(${ramp(t, 1, 21, 0.25, 1)}) rotate(${sway})`}>
        <Tree />
      </g>
      <Pop x={330} y={GROUND_Y}>
        <Person mood="happy" look="right" gesture={t > 15} />
      </Pop>
      <Pop at={0.5} until={7} x={880} y={120}>
        <Tag text="Kejadian 2:15" color={COLORS.night} textColor={COLORS.white} />
      </Pop>
      <Pop at={1.2} until={7} x={880} y={250}>
        <Headline
          size={46}
          color={COLORS.night}
          lines={["“TUHAN Allah mengambil manusia itu dan menempatkannya", "dalam taman Eden untuk mengusahakan dan memelihara taman itu.”"]}
        />
      </Pop>
      {t >= 7.5 && t < 15.2 && (
        <line
          x1={420}
          y1={260}
          x2={420 + timelineLine}
          y2={260}
          stroke={COLORS.night}
          strokeWidth={8}
          strokeDasharray="16 12"
          opacity={0.45}
        />
      )}
      {TOOLS.map((tool, i) => (
        <Pop key={tool.label} at={7.5 + i * 1.2} until={15} x={420 + i * 280} y={260} float>
          <circle r={100} fill={COLORS.white} />
          <g>{tool.icon}</g>
          <text y={160} textAnchor="middle" fontSize={40} fontWeight={700} fill={COLORS.night}>{tool.label}</text>
        </Pop>
      ))}
      <Pop at={15} x={600} y={GROUND_Y} scale={0.6}>
        <Robot look="left" active />
      </Pop>
      <Pop at={15.3} x={900} y={170} float>
        <Tag text="✓ AI menolong kita bekerja" color={COLORS.teal} />
      </Pop>
      <Pop at={17.5} x={900} y={320} float>
        <Tag text="✗ Lari dari tanggung jawab" color={COLORS.red} />
      </Pop>
    </Stage>
  );
};
