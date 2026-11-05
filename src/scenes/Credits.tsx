import { Person, Robot } from "../components/characters";
import { Headline } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const MEMBERS = [
  { name: "Frans Jesky Yeremi", detail: "01086250003 - Sistem Informasi" },
  { name: "Sisilia Gunung Ata Kewae", detail: "01086250017 - Sistem Informasi" },
  { name: "Vick Rab Wilbert", detail: "01085250019 - Informatika" },
  { name: "Willy Lengkong", detail: "01086250001 - Sistem Informasi" },
  { name: "Winson Winson", detail: "01085250003 - Informatika" },
  { name: "Yohanes Bandung Bondowoso", detail: "01085250015 - Informatika" },
];

export const Credits = () => {
  const t = useSeconds();
  return (
    <Stage from={COLORS.night} to={COLORS.indigo} ground={COLORS.night}>
      <Pop at={0.1} x={960} y={135}>
        <Headline lines={["Kelompok 15"]} size={70} />
        <text y={68} textAnchor="middle" fontSize={36} fontWeight={700} fill={COLORS.teal}>
          Allah Dan Ciptaan | Class 2026 (KKA 1429)
        </text>
        <line x1={-520} y1={104} x2={520} y2={104} stroke={COLORS.silver} strokeWidth={3} opacity={0.35} />
      </Pop>

      {MEMBERS.map((member, i) => {
        const rowY = 325 + i * 82;
        const opacity = ramp(t, 0.35 + i * 0.18, 0.85 + i * 0.18, 0, 1);
        return (
          <g key={member.name} transform={`translate(0 ${rowY})`} opacity={opacity}>
            <text x={925} textAnchor="end" dominantBaseline="central" fontSize={36} fontWeight={700} fill={COLORS.white}>
              {member.name}
            </text>
            <text x={955} textAnchor="middle" dominantBaseline="central" fontSize={36} fontWeight={700} fill={COLORS.teal}>
              |
            </text>
            <text x={985} textAnchor="start" dominantBaseline="central" fontSize={34} fontWeight={600} fill={COLORS.silver}>
              {member.detail}
            </text>
          </g>
        );
      })}

      <Pop at={0.4} x={190} y={GROUND_Y} scale={0.52}>
        <Person mood="happy" />
      </Pop>
      <Pop at={0.6} x={1730} y={GROUND_Y} scale={0.48}>
        <Robot />
      </Pop>

      <Pop at={1.8} x={960} y={950}>
        <text textAnchor="middle" fontSize={40} fontWeight={700} fill={COLORS.yellow}>
          Terima Kasih
        </text>
      </Pop>
    </Stage>
  );
};
