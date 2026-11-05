import { Person, Robot } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { Ground, GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const RAY_COUNT = 12;

export const Realize = () => {
  const t = useSeconds();
  const tagX = ramp(t, 5.5, 7.5, 1500, 960);
  const tagY = ramp(t, 5.5, 7.5, 520, GROUND_Y - 130);
  return (
    <Stage from={COLORS.violet} to={COLORS.orange} stars={false}>
      <g transform={`translate(960 ${GROUND_Y - 300}) rotate(${t * 6})`} opacity={ramp(t, 1, 3, 0, 0.22)}>
        {Array.from({ length: RAY_COUNT }, (_, i) => (
          <path key={i} d="M-50 0 L50 0 L150 -1200 L-150 -1200Z" fill={COLORS.yellow} transform={`rotate(${(i * 360) / RAY_COUNT})`} />
        ))}
      </g>
      <Ground color={COLORS.night} />
      <Pop x={960} y={GROUND_Y}>
        <Person mood={t < 2 ? "worried" : "happy"} />
      </Pop>
      <Pop x={1500} y={GROUND_Y} scale={0.7}>
        <Robot />
      </Pop>
      <Pop at={1.5} x={960} y={GROUND_Y - 470} float>
        <Bulb />
      </Pop>
      <Pop at={5.5} x={tagX} y={tagY}>
        <Tag text="Tanggung jawab" color={COLORS.yellow} size={36} />
      </Pop>
      <Pop at={10} x={440} y={230} float>
        <Tag text="✓ Mengasah kemampuan" color={COLORS.teal} size={40} />
      </Pop>
      <Pop at={11.5} x={1480} y={230} float>
        <Tag text="✗ Menghapus tanggung jawab" color={COLORS.red} size={40} />
      </Pop>
    </Stage>
  );
};
