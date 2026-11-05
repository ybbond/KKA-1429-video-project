import { Person, Robot } from "../components/characters";
import { Headline, Tag } from "../components/labels";
import { Pop } from "../components/motion";
import { GROUND_Y, Stage } from "../components/Stage";
import { COLORS } from "../theme";

const LIST_END = 13;

const Column = ({ x, at, title, items, color }: { x: number; at: number; title: string; items: string[]; color: string }) => (
  <>
    <Pop at={at} until={LIST_END} x={x} y={210}>
      <Headline lines={[title]} size={64} />
    </Pop>
    {items.map((item, i) => (
      <Pop key={item} at={at + 1 + i} until={LIST_END} x={x} y={350 + i * 140} float>
        <Tag text={item} color={color} size={52} />
      </Pop>
    ))}
  </>
);

export const Takeaway = () => (
  <Stage to={COLORS.violet}>
    <Column x={500} at={0.3} title="Gunakan AI untuk" items={["belajar", "mengeksplorasi", "memperbaiki karya"]} color={COLORS.teal} />
    <Column x={1420} at={6} title="Jangan gantikan" items={["pemikiran", "integritas", "tanggung jawab"]} color={COLORS.orange} />
    <Pop at={13.5} x={960} y={190}>
      <Headline lines={["AI membantu.", "Tanggung jawab tetap milikmu."]} size={84} />
    </Pop>
    <Pop at={14} x={820} y={GROUND_Y} scale={0.95}>
      <Person mood="happy" />
    </Pop>
    <Pop at={14.5} x={1110} y={GROUND_Y} scale={0.75}>
      <Robot />
    </Pop>
  </Stage>
);
