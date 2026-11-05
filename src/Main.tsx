import type { ReactNode } from "react";
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "./components/Captions";
import { ramp } from "./components/motion";
import { COLORS } from "./theme";
import { TIMELINE } from "./timeline";

const FADE_FRAMES = 15;

const Fade = ({ fadeIn = true, children }: { fadeIn?: boolean; children: ReactNode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = Math.min(
    fadeIn ? ramp(frame, 0, FADE_FRAMES, 0, 1) : 1,
    ramp(frame, durationInFrames - FADE_FRAMES, durationInFrames, 1, 0),
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Main = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.night }}>
      <Series>
        {TIMELINE.map(({ Visual, captions }, index) => (
          <Series.Sequence
            key={Visual.name || captions[0].text}
            durationInFrames={Math.round(captions.reduce((sum, c) => sum + c.seconds, 0) * fps)}
          >
            <Fade fadeIn={index > 0}>
              <Visual />
              <Captions captions={captions} />
            </Fade>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
