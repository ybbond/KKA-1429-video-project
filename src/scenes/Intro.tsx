import { Person, Robot } from "../components/characters";
import { Headline } from "../components/labels";
import { Pop } from "../components/motion";
import { Stage } from "../components/Stage";
import { COLORS } from "../theme";

export const Intro = () => (
  <Stage>
    <circle cx={960} cy={1620} r={960} fill={COLORS.teal} opacity={0.15} />
    <circle cx={960} cy={1620} r={900} fill={COLORS.forest} />
    <ellipse cx={640} cy={830} rx={150} ry={40} fill={COLORS.green} />
    <ellipse cx={1300} cy={880} rx={210} ry={50} fill={COLORS.green} />
    <Pop at={1} x={960} y={170}>
      <Headline lines={["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]} />
    </Pop>
    <Pop at={0.3} x={960} y={722} scale={0.6}>
      <Person mood="happy" />
    </Pop>
    <Pop at={6} x={1250} y={768} scale={0.55}>
      <Robot />
    </Pop>
  </Stage>
);
