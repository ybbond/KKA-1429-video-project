import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";
import { useIsPortrait } from "./Stage";

export type Caption = { text: string; seconds: number };

const Line = ({ text }: { text: string }) => {
  const isPortrait = useIsPortrait();
  if (!text) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: isPortrait ? 380 : 44 }}>
      <div
        style={{
          maxWidth: isPortrait ? 920 : 1500,
          padding: isPortrait ? "22px 40px" : "16px 40px",
          borderRadius: 28,
          background: "rgba(11, 20, 55, 0.84)",
          color: COLORS.white,
          fontFamily: FONT,
          fontSize: isPortrait ? 42 : 40,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Captions = ({ captions }: { captions: Caption[] }) => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      {captions.map((c) => (
        <Series.Sequence key={c.text} durationInFrames={Math.round(c.seconds * fps)}>
          <Line text={c.text} />
        </Series.Sequence>
      ))}
    </Series>
  );
};
