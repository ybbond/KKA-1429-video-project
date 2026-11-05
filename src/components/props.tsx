import { COLORS } from "../theme";
import { useSeconds } from "./motion";

/** Origin is on the floor, drawn in front of a person. */
export const Desk = () => {
  const t = useSeconds();
  const screenGlow = 0.14 + Math.sin(t * 4) * 0.04;
  return (
    <g>
      <polygon points="-85,-225 85,-225 170,-370 -170,-370" fill={COLORS.cyan} opacity={screenGlow} />
      <rect x={-210} y={-100} width={26} height={100} fill={COLORS.wood} />
      <rect x={184} y={-100} width={26} height={100} fill={COLORS.wood} />
      <rect x={-260} y={-118} width={520} height={26} rx={13} fill={COLORS.wood} />
      <rect x={-95} y={-228} width={190} height={112} rx={14} fill={COLORS.silver} />
      <circle cy={-172} r={14 + Math.sin(t * 5) * 2} fill={COLORS.teal} />
    </g>
  );
};

/** Light bulb for "thinking": grey at glow 0, lit at glow 1. */
export const Bulb = ({ glow = 1 }: { glow?: number }) => {
  const t = useSeconds();
  const pulse = 1 + Math.sin(t * 5) * 0.08 * glow;
  return (
    <g transform={`scale(${pulse})`}>
      <circle r={96} fill={COLORS.yellow} opacity={glow * 0.14} />
      <circle r={68} fill={COLORS.yellow} opacity={glow * 0.28} />
      {glow > 0.2 && (
        <g transform={`rotate(${t * 24})`} opacity={glow * 0.85}>
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={i}
              y1={-52}
              y2={-68}
              stroke={COLORS.yellow}
              strokeWidth={6}
              strokeLinecap="round"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
      )}
      <circle r={38} fill="#6b6f8a" />
      <circle r={38} fill={COLORS.yellow} opacity={glow} />
      <path d="M-12 -6 Q0 -24 12 -6" fill="none" stroke={COLORS.white} strokeWidth={4} strokeLinecap="round" opacity={0.4 + glow * 0.5} />
      <rect x={-16} y={32} width={32} height={22} rx={6} fill={COLORS.silver} />
    </g>
  );
};
