import { Person, Robot } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { Ground, GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const RAY_COUNT = 12;

export const Realize = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const robotX = isPortrait ? 1380 : 1500;
  const moveProgress = ramp(t, 5.5, 7.5, 0, 1);
  const tagX = robotX + (960 - robotX) * moveProgress;
  const tagY = 520 + (GROUND_Y - 130 - 520) * moveProgress - Math.sin(moveProgress * Math.PI) * 140;
  const impactRing = t > 7.5 && t < 9 ? (t - 7.5) / 1.5 : 0;

  return (
    <Stage from={COLORS.violet} to={COLORS.orange} stars={false}>
      <g transform={`translate(960 ${GROUND_Y - 300}) rotate(${t * 6})`} opacity={ramp(t, 1, 3, 0, 0.22)}>
        {Array.from({ length: RAY_COUNT }, (_, i) => (
          <path key={i} d="M-50 0 L50 0 L180 -1800 L-180 -1800Z" fill={COLORS.yellow} transform={`rotate(${(i * 360) / RAY_COUNT})`} />
        ))}
      </g>
      <Ground color={COLORS.night} />
      {t > 5.5 && t < 8 && (
        <path
          d={`M${robotX} 520 Q${(robotX + 960) / 2} 390 960 ${GROUND_Y - 130}`}
          fill="none"
          stroke={COLORS.yellow}
          strokeWidth={5}
          strokeDasharray="14 12"
          opacity={0.6}
        />
      )}
      {impactRing > 0 && (
        <circle
          cx={960}
          cy={GROUND_Y - 180}
          r={40 + impactRing * 180}
          fill="none"
          stroke={COLORS.yellow}
          strokeWidth={6}
          opacity={1 - impactRing}
        />
      )}
      <Pop x={960} y={GROUND_Y}>
        <Person mood={t < 2 ? "worried" : "happy"} look={t > 5 && t < 8 ? "right" : "center"} gesture={t > 7.5} />
      </Pop>
      <Pop x={robotX} y={GROUND_Y} scale={0.7}>
        <Robot look="left" active={t > 5} />
      </Pop>
      <Pop at={1.5} x={960} y={GROUND_Y - 470} float>
        <Bulb />
      </Pop>
      <Pop at={5.5} x={tagX} y={tagY}>
        <Tag text="Tanggung jawab" color={COLORS.yellow} size={isPortrait ? 46 : 36} />
      </Pop>
      <Pop at={10} x={isPortrait ? 960 : 440} y={isPortrait ? -200 : 230} float>
        <Tag text="✓ Mengasah kemampuan" color={COLORS.teal} size={isPortrait ? 52 : 40} />
      </Pop>
      <Pop at={11.5} x={isPortrait ? 960 : 1480} y={isPortrait ? -40 : 230} float>
        <Tag text="✗ Menghapus tanggung jawab" color={COLORS.red} size={isPortrait ? 52 : 40} />
      </Pop>
    </Stage>
  );
};
