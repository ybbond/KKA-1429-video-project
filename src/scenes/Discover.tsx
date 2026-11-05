import { Person, Robot } from "../components/characters";
import { Bubble } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Bulb } from "../components/props";
import { GROUND_Y, Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const CODE = ["if (n === 0) return 1;", "return n * f(n - 1);"];

export const Discover = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const personX = isPortrait ? 520 : 400;
  const robotX = isPortrait ? 1400 : 1520;
  const totalChars = CODE.join("").length;
  const typed = Math.floor(ramp(t, 12.2, 16.6, 0, totalChars));
  const cursorVisible = Math.floor(t * 3) % 2 === 0;

  return (
    <Stage to={COLORS.violet} ground={COLORS.night}>
      {t > 5 && t < 12.2 && (
        <g>
          <path
            d={`M${personX + 90} 540 Q960 360 ${robotX - 90} 560`}
            fill="none"
            stroke={t < 8 ? COLORS.cyan : COLORS.teal}
            strokeWidth={5}
            strokeDasharray="16 14"
            strokeDashoffset={(t < 8 ? -1 : 1) * t * 90}
            opacity={0.75}
          />
          {[0, 1, 2].map((i) => {
            const p = ((t * 0.7 + i / 3) % 1);
            const dir = t < 8 ? p : 1 - p;
            const px = personX + 90 + (robotX - personX - 180) * dir;
            const py = 550 - Math.sin(dir * Math.PI) * 130;
            return <circle key={i} cx={px} cy={py} r={10} fill={t < 8 ? COLORS.cyan : COLORS.yellow} />;
          })}
        </g>
      )}
      <Pop x={personX} y={GROUND_Y}>
        <Person
          mood={t < 8 ? "neutral" : "happy"}
          look="right"
          gesture={t >= 5 && t < 8}
          typing={t >= 12.2 && t < 16.8}
        />
      </Pop>
      <Pop at={1} x={robotX} y={GROUND_Y}>
        <Robot look="left" active={t >= 7} />
      </Pop>
      <Pop at={5} until={12} x={isPortrait ? 740 : 660} y={isPortrait ? -120 : 290}>
        <Bubble lines={["Kenapa rekursi", "bisa berhenti?"]} size={isPortrait ? 48 : 40} />
      </Pop>
      <Pop at={8} until={12} x={isPortrait ? 1160 : 1240} y={isPortrait ? 170 : 290}>
        <Bubble lines={["Karena ada base case.", "Coba kamu tulis!"]} tail="right" size={isPortrait ? 48 : 40} />
      </Pop>
      <Pop at={12} x={960} y={isPortrait ? 100 : 500} scale={isPortrait ? 1.25 : 1}>
        <rect x={-360} y={-150} width={720} height={290} rx={32} fill={COLORS.night} stroke={COLORS.teal} strokeWidth={6} />
        <circle cx={-310} cy={-108} r={10} fill={COLORS.red} />
        <circle cx={-278} cy={-108} r={10} fill={COLORS.yellow} />
        <circle cx={-246} cy={-108} r={10} fill={COLORS.green} />
        {CODE.map((line, i) => {
          const lineCount = Math.max(0, Math.min(line.length, typed - (i === 0 ? 0 : CODE[0].length)));
          const activeLine = i === 0 ? typed <= CODE[0].length : typed > CODE[0].length;
          return (
            <text key={line} x={-310} y={-24 + i * 72} fontFamily="Menlo, monospace" fontSize={40} fill={COLORS.teal}>
              {line.slice(0, lineCount)}
              {activeLine && cursorVisible ? "▋" : ""}
            </text>
          );
        })}
      </Pop>
      <Pop at={14.5} x={personX} y={GROUND_Y - 470} float>
        <Bulb />
      </Pop>
    </Stage>
  );
};
