import { random } from "remotion";
import { Person } from "../components/characters";
import { Tag } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const BARS = [130, 230, 330, 440, 550];
const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  x: random(`cx${i}`) * 1920,
  speed: 250 + random(`cs${i}`) * 300,
  color: [COLORS.teal, COLORS.yellow, COLORS.magenta, COLORS.cyan][i % 4],
}));

export const Growth = () => {
  const t = useSeconds();
  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      {t > 10 &&
        CONFETTI.map((c) => (
          <circle key={c.x} cx={c.x} cy={(t - 10) * c.speed - 40} r={11} fill={c.color} />
        ))}
      {BARS.map((height, i) => {
        const h = ramp(t, i * 1.6 + 0.5, i * 1.6 + 2.2, 0, height);
        return <rect key={height} x={830 + i * 170} y={GROUND_Y - h} width={130} height={h} rx={20} fill={COLORS.teal} />;
      })}
      <Pop at={0.5} x={1235} y={170}>
        <Tag text="Pemahaman" color={COLORS.yellow} />
      </Pop>
      <Pop x={400} y={GROUND_Y}>
        <Person mood="happy" cheer={t > 10} />
      </Pop>
      <Pop at={5} x={400} y={330} float>
        <Tag text="Tugas selesai ✓" />
      </Pop>
    </Stage>
  );
};
