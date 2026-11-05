import { Person } from "../components/characters";
import { Bubble } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

export const Crisis = () => {
  const t = useSeconds();
  const broken = t > 2;
  const shake = broken && t < 4.2 ? Math.sin(t * 40) * 8 : 0;
  // Slow pulse: anything faster would be an unsafe strobe for photosensitive viewers.
  const alarm = broken ? 0.1 + Math.sin(t * 2) * 0.06 : 0;
  return (
    <Stage from="#22092e" to="#5a1030" ground={COLORS.night} stars={false}>
      <rect width={1920} height={1080} fill={COLORS.red} opacity={alarm} />
      <g transform={`translate(${960 + shake} 400)`}>
        <rect x={-290} y={-190} width={580} height={380} rx={36} fill={COLORS.night} stroke={broken ? COLORS.red : COLORS.teal} strokeWidth={10} />
        <text textAnchor="middle" dominantBaseline="central" fontSize={110} fontWeight={800} fill={broken ? COLORS.red : COLORS.teal}>
          {broken ? "ERROR" : "DEMO"}
        </text>
      </g>
      <Pop x={330} y={GROUND_Y}>
        <Person mood={broken ? "worried" : "neutral"} />
      </Pop>
      <Pop at={4} x={1600} y={GROUND_Y}>
        <Person hoodie={COLORS.cyan} hair={COLORS.silver} />
      </Pop>
      <Pop at={5} x={1560} y={270}>
        <Bubble lines={["Mengapa kodemu", "ditulis seperti ini?"]} tail="right" />
      </Pop>
      <Pop at={11} x={390} y={320}>
        <Bubble lines={["..."]} size={70} />
      </Pop>
      {t > 11 && (
        <circle cx={425} cy={ramp((t - 11) % 2, 0, 2, GROUND_Y - 360, GROUND_Y - 220)} r={14} fill={COLORS.cyan} />
      )}
    </Stage>
  );
};
