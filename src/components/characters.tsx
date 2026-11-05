import { COLORS } from "../theme";
import { useSeconds } from "./motion";

const MOUTHS = {
  happy: "M-24 -6 Q0 24 24 -6",
  neutral: "M-16 6 L16 6",
  worried: "M-20 12 Q0 -8 20 12",
};

const LOOK_OFFSET = {
  left: { x: -8, y: 0 },
  right: { x: 8, y: 0 },
  up: { x: 0, y: -6 },
  down: { x: 0, y: 6 },
  center: { x: 0, y: 0 },
};

type PersonProps = {
  mood?: keyof typeof MOUTHS;
  cheer?: boolean;
  typing?: boolean;
  gesture?: boolean;
  look?: keyof typeof LOOK_OFFSET;
  hoodie?: string;
  hair?: string;
};

/** Origin is at the feet, so a parent can stand it on the ground. About 390 tall. */
export const Person = ({
  mood = "neutral",
  cheer = false,
  typing = false,
  gesture = false,
  look = "center",
  hoodie = COLORS.orange,
  hair = COLORS.hair,
}: PersonProps) => {
  const t = useSeconds();
  const wave = Math.sin(t * 9) * 14;
  const typeBounce = Math.sin(t * 18) * 10;
  const gestureWave = Math.sin(t * 5) * 12;
  const blink = (t % 3.4) > 3.25 ? 0.12 : 1;
  const headTilt =
    mood === "worried"
      ? Math.sin(t * 2) * 2 - 2
      : mood === "happy"
        ? Math.sin(t * 2.4) * 2.5
        : Math.sin(t * 1.8) * 1.2;
  const gaze = LOOK_OFFSET[look];

  const arm = (side: number) => {
    if (cheer) {
      return `M${side * 60} -190 L${side * 120} ${-300 + side * wave}`;
    }
    if (typing) {
      return `M${side * 62} -190 Q${side * 96} -150 ${side * 46} ${-118 + side * typeBounce}`;
    }
    if (gesture && side === 1) {
      return `M62 -190 Q118 -175 128 ${-215 + gestureWave}`;
    }
    const sway = Math.sin(t * 2.4 + side) * 5;
    return `M${side * 62} -190 Q${side * 108} -130 ${side * 84 + sway} -78`;
  };

  return (
    <g transform={`scale(1 ${1 + Math.sin(t * 2.8) * 0.014})`}>
      <ellipse rx={68} ry={12} fill={COLORS.night} opacity={0.28} />
      {[-42, 12].map((x) => (
        <rect key={x} x={x} y={-70} width={30} height={70} rx={15} fill={COLORS.night} />
      ))}
      <rect x={-72} y={-225} width={144} height={170} rx={60} fill={hoodie} />
      {[-1, 1].map((side) => (
        <path key={side} d={arm(side)} fill="none" stroke={hoodie} strokeWidth={30} strokeLinecap="round" />
      ))}
      <g transform={`translate(0 -305) rotate(${headTilt}) translate(0 305)`}>
        <circle cy={-305} r={85} fill={COLORS.skin} />
        <path d="M-88 -300 A88 88 0 0 1 88 -300 Q30 -345 -88 -300Z" fill={hair} />
        {[-1, 1].map((side) => (
          <g key={side}>
            <ellipse
              cx={side * 30 + gaze.x}
              cy={-298 + gaze.y}
              rx={9}
              ry={9 * blink}
              fill={COLORS.night}
            />
            {blink > 0.5 && (
              <circle cx={side * 30 + gaze.x - 3} cy={-301 + gaze.y} r={3} fill={COLORS.white} />
            )}
            <circle cx={side * 52} cy={-272} r={13} fill={COLORS.magenta} opacity={0.25} />
            {mood === "worried" && (
              <path d={`M${side * 16} -322 L${side * 44} -312`} stroke={COLORS.night} strokeWidth={6} strokeLinecap="round" />
            )}
          </g>
        ))}
        <path
          d={MOUTHS[mood]}
          transform={`translate(${gaze.x * 0.4} -262)`}
          fill="none"
          stroke={COLORS.night}
          strokeWidth={6}
          strokeLinecap="round"
        />
      </g>
    </g>
  );
};

type RobotProps = {
  look?: "left" | "right" | "center";
  active?: boolean;
  overdrive?: boolean;
};

/** Origin is on the ground under its hover shadow. About 370 tall. */
export const Robot = ({ look = "center", active = false, overdrive = false }: RobotProps) => {
  const t = useSeconds();
  const hover = Math.sin(t * 2.6) * 12;
  const tilt = Math.sin(t * 1.8) * (overdrive ? 4 : 2);
  const eyeShift = look === "left" ? -10 : look === "right" ? 10 : Math.sin(t * 1.5) * 4;
  const coreColor = overdrive ? COLORS.magenta : COLORS.teal;
  const pulseRing = (t * 1.4) % 1;

  return (
    <g>
      <ellipse rx={Math.max(40, 80 - hover)} ry={14} fill={COLORS.night} opacity={0.32} />
      <g transform={`translate(0 ${hover - 50}) rotate(${tilt})`}>
        {(active || overdrive) && (
          <circle
            cy={-302}
            r={18 + pulseRing * 42}
            fill="none"
            stroke={overdrive ? COLORS.magenta : COLORS.yellow}
            strokeWidth={4}
            opacity={(1 - pulseRing) * 0.65}
          />
        )}
        {[-1, 1].map((side) => {
          const handY = -62 + Math.sin(t * 3.4 + side) * 10;
          return (
            <rect
              key={side}
              x={side * 82 - 12}
              y={handY}
              width={24}
              height={42}
              rx={12}
              fill={COLORS.silver}
            />
          );
        })}
        <rect x={-60} y={-100} width={120} height={100} rx={36} fill={COLORS.silver} />
        <circle cy={-50} r={22} fill={coreColor} opacity={0.22 + Math.sin(t * 5) * 0.12} />
        <circle cy={-50} r={14} fill={coreColor} opacity={0.75 + Math.sin(t * 4) * 0.25} />
        <rect x={-4} y={-295} width={8} height={50} fill={COLORS.silver} />
        <circle cy={-302} r={28} fill={COLORS.yellow} opacity={0.3 + Math.sin(t * 6) * 0.15} />
        <circle cy={-302} r={15} fill={COLORS.yellow} />
        <rect x={-95} y={-250} width={190} height={145} rx={50} fill={COLORS.white} />
        <rect x={-75} y={-232} width={150} height={108} rx={34} fill={COLORS.night} />
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(${side * 32 + eyeShift} -192)`}>
            <circle r={13} fill={coreColor} />
            <circle cx={-3} cy={-3} r={4} fill={COLORS.white} />
          </g>
        ))}
        <path
          d={overdrive ? "M-26 -158 L26 -158" : "M-24 -162 Q0 -142 24 -162"}
          transform={`translate(${eyeShift * 0.5} 0)`}
          fill="none"
          stroke={coreColor}
          strokeWidth={7}
          strokeLinecap="round"
        />
      </g>
    </g>
  );
};
