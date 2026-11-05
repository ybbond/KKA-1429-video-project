import { Person } from "../components/characters";
import { Bubble } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

export const Crisis = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const personX = isPortrait ? 520 : 330;
  const lecturerX = isPortrait ? 1400 : 1600;
  const broken = t > 2;
  const shake = broken && t < 4.2 ? Math.sin(t * 40) * 8 : 0;
  // Slow pulse: anything faster would be an unsafe strobe for photosensitive viewers.
  const alarm = broken ? 0.1 + Math.sin(t * 2) * 0.06 : 0;
  return (
    <Stage from="#22092e" to="#5a1030" ground={COLORS.night} stars={false}>
      <rect x={-200} y={-800} width={2400} height={3000} fill={COLORS.red} opacity={alarm} />
      <g transform={`translate(${960 + shake} ${isPortrait ? -80 : 400})`}>
        <rect x={-290} y={-190} width={580} height={380} rx={36} fill={COLORS.night} stroke={broken ? COLORS.red : COLORS.teal} strokeWidth={10} />
        <circle cx={-235} cy={-142} r={10} fill={COLORS.red} />
        <circle cx={-202} cy={-142} r={10} fill={COLORS.yellow} />
        <circle cx={-169} cy={-142} r={10} fill={COLORS.green} />
        <text y={-10} textAnchor="middle" dominantBaseline="central" fontSize={106} fontWeight={800} fill={broken ? COLORS.red : COLORS.teal}>
          {broken ? "ERROR" : "DEMO"}
        </text>
        <rect x={-210} y={92} width={420} height={18} rx={9} fill={broken ? COLORS.red : COLORS.teal} opacity={0.35} />
        {broken && (
          <g>
            {[-180, 0, 180].map((sx, i) => {
              const drift = ((t - 2 + i * 0.5) % 1.8) / 1.8;
              return (
                <circle
                  key={sx}
                  cx={sx + Math.sin(t * 3 + i) * 18}
                  cy={-205 - drift * 110}
                  r={14 + drift * 22}
                  fill={COLORS.silver}
                  opacity={(1 - drift) * 0.35}
                />
              );
            })}
          </g>
        )}
      </g>
      <Pop x={personX} y={GROUND_Y}>
        <Person mood={broken ? "worried" : "neutral"} look="right" />
      </Pop>
      <Pop at={4} x={lecturerX} y={GROUND_Y}>
        <Person hoodie={COLORS.cyan} hair={COLORS.silver} look="left" gesture={t > 4.8 && t < 11} />
      </Pop>
      <Pop at={5} x={isPortrait ? 1160 : 1560} y={isPortrait ? 240 : 270}>
        <Bubble lines={["Mengapa kodemu", "ditulis seperti ini?"]} tail="right" size={isPortrait ? 48 : 40} />
      </Pop>
      <Pop at={11} x={isPortrait ? 580 : 390} y={320}>
        <Bubble lines={["..."]} size={70} />
      </Pop>
      {t > 11 && (
        <circle cx={personX + 95} cy={ramp((t - 11) % 2, 0, 2, GROUND_Y - 360, GROUND_Y - 220)} r={14} fill={COLORS.cyan} />
      )}
    </Stage>
  );
};
