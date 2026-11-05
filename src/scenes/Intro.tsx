import { random } from "remotion";
import { Person, Robot } from "../components/characters";
import { Headline } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Stage } from "../components/Stage";
import { COLORS } from "../theme";

const TITLE_END = 0.9;
const QUOTE_END = 5;

const SPICE_MOTES = Array.from({ length: 24 }, (_, i) => ({
  x: 240 + random(`sx${i}`) * 1440,
  y: 220 + random(`sy${i}`) * 580,
  r: 2.5 + random(`sr${i}`) * 4.5,
  speed: 18 + random(`ss${i}`) * 28,
}));

export const Intro = () => {
  const t = useSeconds();
  const titleOpacity = ramp(t, TITLE_END - 0.15, TITLE_END + 0.05, 1, 0);
  const quoteOpacity =
    ramp(t, TITLE_END - 0.05, TITLE_END + 0.25, 0, 1) *
    ramp(t, QUOTE_END - 0.3, QUOTE_END, 1, 0);
  const worldOpacity = ramp(t, QUOTE_END - 0.15, QUOTE_END + 0.25, 0, 1);
  const worldDrift = (t - QUOTE_END) * 18;
  const satAngle = (t - QUOTE_END) * 0.35;

  return (
    <Stage>
      {t < TITLE_END + 0.1 && (
        <g opacity={titleOpacity}>
          <g transform={`translate(960 540) rotate(${t * 32})`}>
            <circle r={460} fill="none" stroke={COLORS.teal} strokeWidth={3} strokeDasharray="28 18" opacity={0.35} />
            <circle cx={460} cy={0} r={10} fill={COLORS.teal} />
            <circle cx={-460} cy={0} r={10} fill={COLORS.yellow} />
          </g>
          <g transform={`translate(960 540) rotate(${-t * 22})`}>
            <circle r={620} fill="none" stroke={COLORS.violet} strokeWidth={3} opacity={0.38} />
            <circle cx={0} cy={-620} r={12} fill={COLORS.magenta} />
          </g>
          <g transform="translate(960 400)">
            <Headline lines={["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]} size={92} />
            <line x1={-420} y1={185} x2={420} y2={185} stroke={COLORS.teal} strokeWidth={6} strokeLinecap="round" />
            <text y={255} textAnchor="middle" fontSize={38} fontWeight={700} fill={COLORS.yellow}>
              Allah Dan Ciptaan | Class 2026 (KKA 1429) · Kelompok 15
            </text>
          </g>
        </g>
      )}

      {t >= TITLE_END - 0.05 && t < QUOTE_END + 0.1 && (
        <g opacity={quoteOpacity}>
          <circle cx={960} cy={ramp(t, TITLE_END, QUOTE_END, 1540, 1430)} r={1040} fill={COLORS.orange} opacity={0.15} />
          <circle cx={960} cy={ramp(t, TITLE_END, QUOTE_END, 1540, 1430)} r={1040} fill="none" stroke={COLORS.yellow} strokeWidth={3} opacity={0.45} />
          <g transform={`translate(960 520) rotate(${t * 8})`} opacity={0.2}>
            <circle r={480} fill="none" stroke={COLORS.orange} strokeWidth={2} strokeDasharray="16 24" />
          </g>
          {SPICE_MOTES.map((m) => (
            <circle
              key={m.x}
              cx={m.x + Math.sin(t * 2 + m.y) * 16}
              cy={m.y - (t - TITLE_END) * m.speed}
              r={m.r}
              fill={COLORS.yellow}
              opacity={0.45}
            />
          ))}
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
        </g>
      )}

      {t >= QUOTE_END - 0.15 && (
        <g opacity={worldOpacity}>
          <circle cx={960} cy={1620} r={980 + Math.sin(t * 2) * 10} fill={COLORS.teal} opacity={0.14} />
          <circle cx={960} cy={1620} r={900} fill={COLORS.forest} />
          <ellipse cx={640 + worldDrift} cy={830} rx={150} ry={40} fill={COLORS.green} />
          <ellipse cx={1300 + worldDrift * 0.7} cy={880} rx={210} ry={50} fill={COLORS.green} />
          <ellipse cx={920 - worldDrift * 0.5} cy={950} rx={180} ry={36} fill={COLORS.green} opacity={0.65} />
          <g transform={`translate(${960 + Math.sin(satAngle) * 720} ${680 - Math.cos(satAngle) * 260}) rotate(${satAngle * 40})`}>
            <rect x={-26} y={-8} width={52} height={16} rx={4} fill={COLORS.cyan} />
            <circle r={12} fill={COLORS.silver} />
          </g>
          <Pop at={QUOTE_END + 0.4} x={960} y={170}>
            <Headline lines={["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]} />
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
