import { random } from "remotion";
import { Person, Robot } from "../components/characters";
import { Headline } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Stage, useIsPortrait } from "../components/Stage";
import { COLORS } from "../theme";

const TITLE_END = 0.9;
const QUOTE_END = 5;

const SPICE_MOTES = Array.from({ length: 28 }, (_, i) => ({
  x: 240 + random(`sx${i}`) * 1440,
  y: -260 + random(`sy${i}`) * 1160,
  r: 2.5 + random(`sr${i}`) * 4.5,
  speed: 18 + random(`ss${i}`) * 28,
}));

export const Intro = () => {
  const t = useSeconds();
  const isPortrait = useIsPortrait();
  const titleOpacity = ramp(t, TITLE_END - 0.15, TITLE_END + 0.05, 1, 0);
  const quoteOpacity =
    ramp(t, TITLE_END - 0.05, TITLE_END + 0.25, 0, 1) *
    ramp(t, QUOTE_END - 0.3, QUOTE_END, 1, 0);
  const worldOpacity = ramp(t, QUOTE_END - 0.15, QUOTE_END + 0.25, 0, 1);
  const worldDrift = (t - QUOTE_END) * 18;
  const satAngle = (t - QUOTE_END) * 0.35;
  const duneHorizonY = isPortrait
    ? ramp(t, TITLE_END, QUOTE_END, 2650, 2520)
    : ramp(t, TITLE_END, QUOTE_END, 1540, 1430);
  const duneHorizonR = isPortrait ? 1680 : 1040;
  const earthY = isPortrait ? 2020 : 1620;
  const earthR = isPortrait ? 1300 : 900;

  return (
    <Stage>
      {t < TITLE_END + 0.1 && (
        <g opacity={titleOpacity}>
          <g transform={`translate(960 ${isPortrait ? 420 : 540}) rotate(${t * 32})`}>
            <circle r={isPortrait ? 540 : 460} fill="none" stroke={COLORS.teal} strokeWidth={3} strokeDasharray="28 18" opacity={0.28} />
            <circle cx={isPortrait ? 540 : 460} cy={0} r={10} fill={COLORS.teal} />
            <circle cx={isPortrait ? -540 : -460} cy={0} r={10} fill={COLORS.yellow} />
          </g>
          <g transform={`translate(960 ${isPortrait ? 420 : 540}) rotate(${-t * 22})`}>
            <circle r={isPortrait ? 680 : 620} fill="none" stroke={COLORS.violet} strokeWidth={3} opacity={0.32} />
            <circle cx={0} cy={isPortrait ? -680 : -620} r={12} fill={COLORS.magenta} />
          </g>
          <g transform={`translate(960 ${isPortrait ? 220 : 400})`}>
            <Headline
              lines={
                isPortrait
                  ? ["Mahasiswa yang", "Menyerahkan Segalanya", "pada AI"]
                  : ["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]
              }
              size={92}
            />
            <line
              x1={-420}
              y1={isPortrait ? 300 : 185}
              x2={420}
              y2={isPortrait ? 300 : 185}
              stroke={COLORS.teal}
              strokeWidth={6}
              strokeLinecap="round"
            />
            {isPortrait ? (
              <>
                <text y={410} textAnchor="middle" fontSize={50} fontWeight={700} fill={COLORS.yellow}>
                  Allah Dan Ciptaan · Kelas 2026 (KKA 1429)
                </text>
                <text y={495} textAnchor="middle" fontSize={48} fontWeight={700} fill={COLORS.teal}>
                  Kelompok 15
                </text>
              </>
            ) : (
              <text y={255} textAnchor="middle" fontSize={38} fontWeight={700} fill={COLORS.yellow}>
                Allah Dan Ciptaan | Kelas 2026 (KKA 1429) · Kelompok 15
              </text>
            )}
          </g>
        </g>
      )}

      {t >= TITLE_END - 0.05 && t < QUOTE_END + 0.1 && (
        <g opacity={quoteOpacity}>
          <circle cx={960} cy={duneHorizonY} r={duneHorizonR + 90} fill={COLORS.orange} opacity={0.08} />
          <circle cx={960} cy={duneHorizonY} r={duneHorizonR} fill={COLORS.orange} opacity={0.16} />
          <circle cx={960} cy={duneHorizonY} r={duneHorizonR} fill="none" stroke={COLORS.yellow} strokeWidth={3} opacity={0.45} />
          <g transform={`translate(960 ${isPortrait ? 160 : 520}) rotate(${t * 8})`} opacity={0.16}>
            <circle r={isPortrait ? 560 : 480} fill="none" stroke={COLORS.orange} strokeWidth={2} strokeDasharray="16 24" />
          </g>
          {SPICE_MOTES.map((m) => (
            <circle
              key={m.x}
              cx={m.x + Math.sin(t * 2 + m.y) * 16}
              cy={(isPortrait ? m.y : 220 + ((m.y + 260) / 1160) * 580) - (t - TITLE_END) * m.speed}
              r={m.r}
              fill={COLORS.yellow}
              opacity={0.45}
            />
          ))}
          {isPortrait ? (
            <g transform={`translate(960 ${ramp(t, TITLE_END, QUOTE_END, -100, -130)})`}>
              <Headline
                lines={[
                  "“Dahulu",
                  "manusia menyerahkan",
                  "cara berpikir mereka",
                  "kepada mesin,",
                  "dengan harapan hal itu",
                  "akan membebaskan mereka.”",
                ]}
                size={80}
                color={COLORS.white}
              />
              <text y={630} textAnchor="middle" fontSize={75} fontWeight={700} fill={COLORS.yellow}>
                “Janganlah engkau
              </text>
              <text y={710} textAnchor="middle" fontSize={75} fontWeight={700} fill={COLORS.yellow}>
                membuat mesin
              </text>
              <text y={790} textAnchor="middle" fontSize={75} fontWeight={700} fill={COLORS.yellow}>
                yang menyerupai
              </text>
              <text y={870} textAnchor="middle" fontSize={75} fontWeight={700} fill={COLORS.yellow}>
                akal budi manusia.”
              </text>
              <line x1={-320} y1={1150} x2={320} y2={1150} stroke={COLORS.orange} strokeWidth={5} strokeLinecap="round" />
              <text y={1240} textAnchor="middle" fontSize={42} fontWeight={700} fill={COLORS.silver}>
                — Catatan Butlerian Jihad · Kitab Suci Oranye (O.C.B.) —
              </text>
              <text y={1300} textAnchor="middle" fontSize={38} fontWeight={600} fill={COLORS.teal}>
                Dune · Frank Herbert (1965)
              </text>
            </g>
          ) : (
            <g transform={`translate(960 ${ramp(t, TITLE_END, QUOTE_END, 372, 352)})`}>
              <Headline
                lines={[
                  "“Dahulu manusia menyerahkan cara berpikir mereka kepada mesin,",
                  "dengan harapan hal itu akan membebaskan mereka.”",
                ]}
                size={50}
                color={COLORS.white}
              />
              <text y={145} textAnchor="middle" fontSize={38} fontWeight={600} fill={COLORS.yellow}>
                “Janganlah engkau membuat mesin yang menyerupai akal budi manusia.”
              </text>
              <line x1={-280} y1={195} x2={280} y2={195} stroke={COLORS.orange} strokeWidth={4} strokeLinecap="round" />
              <text y={250} textAnchor="middle" fontSize={30} fontWeight={700} fill={COLORS.silver}>
                — Catatan Jihad Butlerian · Kitab Suci Oranye (O.C.B.) · Dune, Frank Herbert (1965) —
              </text>
            </g>
          )}
        </g>
      )}

      {t >= QUOTE_END - 0.15 && (
        <g opacity={worldOpacity}>
          <circle cx={960} cy={earthY} r={earthR + 80 + Math.sin(t * 2) * 10} fill={COLORS.teal} opacity={0.14} />
          <circle cx={960} cy={earthY} r={earthR} fill={COLORS.forest} />
          <ellipse cx={640 + worldDrift} cy={830} rx={150} ry={40} fill={COLORS.green} />
          <ellipse cx={1300 + worldDrift * 0.7} cy={880} rx={210} ry={50} fill={COLORS.green} />
          <ellipse cx={920 - worldDrift * 0.5} cy={950} rx={180} ry={36} fill={COLORS.green} opacity={0.65} />
          <g transform={`translate(${960 + Math.sin(satAngle) * (isPortrait ? 500 : 720)} ${(isPortrait ? 420 : 680) - Math.cos(satAngle) * 240}) rotate(${satAngle * 40})`}>
            <rect x={-26} y={-8} width={52} height={16} rx={4} fill={COLORS.cyan} />
            <circle r={12} fill={COLORS.silver} />
          </g>
          <Pop at={QUOTE_END + 0.4} x={960} y={isPortrait ? -240 : 170}>
            <Headline
              lines={
                isPortrait
                  ? ["Mahasiswa yang", "Menyerahkan Segalanya", "pada AI"]
                  : ["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]
              }
              size={isPortrait ? 82 : 96}
            />
          </Pop>
          <Pop at={QUOTE_END + 0.15} x={960} y={722} scale={0.6}>
            <Person mood="happy" look={t > 10.5 ? "right" : "center"} gesture={t > 10.5} />
          </Pop>
          {t > 10.7 && (
            <path
              d="M1010 580 Q1130 500 1230 610"
              fill="none"
              stroke={COLORS.teal}
              strokeWidth={5}
              strokeDasharray="14 12"
              strokeDashoffset={-t * 60}
              opacity={0.8}
            />
          )}
          <Pop at={10.5} x={1250} y={768} scale={0.55}>
            <Robot look="left" active />
          </Pop>
        </g>
      )}
    </Stage>
  );
};
