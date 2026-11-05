import { Person, Robot } from "../components/characters";
import { Bubble } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const CODE = ["if (n === 0) return 1;", "return n * f(n - 1);"];

export const Discover = () => {
  const t = useSeconds();
  const typed = Math.floor(ramp(t, 12.2, 17, 0, CODE.join("").length));
  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      <Pop x={400} y={GROUND_Y}>
        <Person mood={t < 8 ? "neutral" : "happy"} />
      </Pop>
      <Pop at={1} x={1520} y={GROUND_Y}>
        <Robot />
      </Pop>
      <Pop at={5} until={12} x={660} y={290}>
        <Bubble lines={["Kenapa rekursi", "bisa berhenti?"]} />
      </Pop>
      <Pop at={8} until={12} x={1240} y={290}>
        <Bubble lines={["Karena ada base case.", "Coba kamu tulis!"]} tail="right" />
      </Pop>
      <Pop at={12} x={960} y={500}>
        <rect x={-340} y={-130} width={680} height={260} rx={32} fill={COLORS.night} stroke={COLORS.teal} strokeWidth={6} />
        {CODE.map((line, i) => (
          <text key={line} x={-290} y={-20 + i * 70} fontFamily="Menlo, monospace" fontSize={42} fill={COLORS.teal}>
            {line.slice(0, Math.max(0, typed - (i === 0 ? 0 : CODE[0].length)))}
          </text>
        ))}
      </Pop>
      <Pop at={15} x={400} y={GROUND_Y - 470}>
        <Bulb />
      </Pop>
    </Stage>
  );
};
