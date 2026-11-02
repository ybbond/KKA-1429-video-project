import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Main = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: 120,
        opacity,
      }}
    >
      Hello, Remotion
    </AbsoluteFill>
  );
};
