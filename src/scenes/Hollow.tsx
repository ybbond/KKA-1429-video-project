import { Person } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const TOWER = { x: 200, y: 280, width: 460, height: GROUND_Y - 280 };

const Meter = ({ label, value, color, y }: { label: string; value: number; color: string; y: number }) => (
  <g transform={`translate(900 ${y})`}>
    <text y={-20} fontSize={40} fontWeight={700} fill={COLORS.white}>{label}</text>
    <text x={820} y={-20} textAnchor="end" fontSize={36} fontWeight={800} fill={color}>
      {Math.round(value * 100)}%
    </text>
    <rect width={820} height={44} rx={22} fill={COLORS.night} />
    <rect width={Math.max(24, 820 * value)} height={44} rx={22} fill={color} />
  </g>
);

export const Hollow = () => {
  const t = useSeconds();
  const crackProgress = ramp(t, 9.2, 11, 0, 1);

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      <rect {...TOWER} rx={30} fill="none" stroke={COLORS.silver} strokeWidth={6} strokeDasharray="24 18" strokeDashoffset={-t * 25} />
      <g transform={`translate(${TOWER.x + TOWER.width / 2} 570) rotate(${Math.sin(t * 3) * 8})`}>
        <text textAnchor="middle" dominantBaseline="central" fontSize={200} fontWeight={800} fill={COLORS.silver}>?</text>
      </g>
      <g opacity={ramp(t, 11, 12.2, 1, 0)}>
        <rect {...TOWER} rx={30} fill={COLORS.yellow} />
        {[0, 1, 2, 3].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`${row}${col}`} x={TOWER.x + 50 + col * 130} y={TOWER.y + 50 + row * 130} width={100} height={90} rx={18} fill={COLORS.orange} />
          )),
        )}
        {crackProgress > 0 && (
          <path
            d="M430 280 L390 420 L460 540 L370 710 L440 860"
            fill="none"
            stroke={COLORS.night}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={700}
            strokeDashoffset={700 * (1 - crackProgress)}
          />
        )}
      </g>
      <Pop at={1} until={11} x={TOWER.x + TOWER.width / 2} y={200} float>
        <Tag text="Nilai A+" color={COLORS.teal} size={60} />
      </Pop>
      <Meter label="Nilai" value={ramp(t, 0.5, 4.5, 0.3, 1)} color={COLORS.teal} y={170} />
      <Meter label="Pemahaman" value={ramp(t, 4.5, 11, 0.7, 0.05)} color={COLORS.magenta} y={310} />
      <Pop x={1300} y={GROUND_Y}>
        <Person
          mood={t < 5 ? "happy" : t < 11 ? "neutral" : "worried"}
          look="left"
          cheer={t > 1.5 && t < 4.5}
        />
      </Pop>
    </Stage>
  );
};
