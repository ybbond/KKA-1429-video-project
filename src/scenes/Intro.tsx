import { Person, Robot } from "../components/characters";
import { Headline } from "../components/labels";
import { Pop, ramp, useSeconds } from "../components/motion";
import { Stage } from "../components/Stage";
import { COLORS } from "../theme";

const TITLE_END = 0.9;
const QUOTE_END = 5;

export const Intro = () => {
  const t = useSeconds();
  const titleOpacity = ramp(t, TITLE_END - 0.15, TITLE_END + 0.05, 1, 0);
  const quoteOpacity =
    ramp(t, TITLE_END - 0.05, TITLE_END + 0.25, 0, 1) *
    ramp(t, QUOTE_END - 0.3, QUOTE_END, 1, 0);
  const worldOpacity = ramp(t, QUOTE_END - 0.15, QUOTE_END + 0.25, 0, 1);

  return (
    <Stage>
      {t < TITLE_END + 0.1 && (
        <g opacity={titleOpacity}>
          <circle cx={960} cy={540} r={460} fill="none" stroke={COLORS.teal} strokeWidth={3} opacity={0.22} />
          <circle cx={960} cy={540} r={620} fill="none" stroke={COLORS.violet} strokeWidth={3} opacity={0.3} />
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
          <circle cx={960} cy={1480} r={1040} fill={COLORS.orange} opacity={0.12} />
          <circle cx={960} cy={1480} r={1040} fill="none" stroke={COLORS.yellow} strokeWidth={3} opacity={0.35} />
          <g transform="translate(960 360)">
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
          <circle cx={960} cy={1620} r={960} fill={COLORS.teal} opacity={0.15} />
          <circle cx={960} cy={1620} r={900} fill={COLORS.forest} />
          <ellipse cx={640} cy={830} rx={150} ry={40} fill={COLORS.green} />
          <ellipse cx={1300} cy={880} rx={210} ry={50} fill={COLORS.green} />
          <Pop at={QUOTE_END + 0.6} x={960} y={170}>
            <Headline lines={["Mahasiswa yang Menyerahkan", "Segalanya pada AI"]} />
          </Pop>
          <Pop at={QUOTE_END + 0.2} x={960} y={722} scale={0.6}>
            <Person mood="happy" />
          </Pop>
          <Pop at={10.5} x={1250} y={768} scale={0.55}>
            <Robot />
          </Pop>
        </g>
      )}
    </Stage>
  );
};
