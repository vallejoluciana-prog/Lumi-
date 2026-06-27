import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const Girl: React.FC<{
  x: number;
  dressColor: string;
  skinColor: string;
  hairColor: string;
  phaseOffset: number;
}> = ({ x, dressColor, skinColor, hairColor, phaseOffset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beat = (frame + phaseOffset) / fps;
  const bounce = Math.abs(Math.sin(beat * Math.PI * 2)) * 30;
  const sway = Math.sin(beat * Math.PI * 2) * 12;
  const armSwingLeft = Math.sin(beat * Math.PI * 2) * 55;
  const armSwingRight = Math.sin(beat * Math.PI * 2 + Math.PI) * 55;
  const legSwingLeft = Math.sin(beat * Math.PI * 2 + Math.PI) * 20;
  const legSwingRight = Math.sin(beat * Math.PI * 2) * 20;

  const hipY = 260 - bounce;

  return (
    <g transform={`translate(${x + sway}, 0)`}>
      <ellipse cx={0} cy={420} rx={48} ry={10} fill="rgba(0,0,0,0.15)" />

      <g transform={`translate(0, ${-bounce})`}>
        <line
          x1={0}
          y1={hipY}
          x2={legSwingLeft}
          y2={400}
          stroke={skinColor}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <line
          x1={0}
          y1={hipY}
          x2={legSwingRight}
          y2={400}
          stroke={skinColor}
          strokeWidth={14}
          strokeLinecap="round"
        />

        <path
          d={`M -45 ${hipY} Q 0 ${hipY - 90} 45 ${hipY} L 60 ${hipY + 20} Q 0 ${hipY + 40} -60 ${hipY + 20} Z`}
          fill={dressColor}
        />

        <line
          x1={-30}
          y1={hipY - 70}
          x2={armSwingLeft - 30}
          y2={hipY - 20}
          stroke={skinColor}
          strokeWidth={12}
          strokeLinecap="round"
        />
        <line
          x1={30}
          y1={hipY - 70}
          x2={armSwingRight + 30}
          y2={hipY - 20}
          stroke={skinColor}
          strokeWidth={12}
          strokeLinecap="round"
        />

        <circle cx={0} cy={hipY - 110} r={32} fill={skinColor} />
        <path
          d={`M -32 ${hipY - 120} Q 0 ${hipY - 170} 32 ${hipY - 120} Q 30 ${hipY - 90} 0 ${hipY - 95} Q -30 ${hipY - 90} -32 ${hipY - 120} Z`}
          fill={hairColor}
        />
      </g>
    </g>
  );
};

export const DancingGirls: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgHue = interpolate(
    frame,
    [0, durationInFrames],
    [280, 320],
    { extrapolateRight: "clamp" },
  );

  return (
    <svg
      viewBox="0 0 1280 720"
      width="100%"
      height="100%"
      style={{ background: `hsl(${bgHue}, 60%, 18%)` }}
    >
      <Girl
        x={460}
        dressColor="#e0529c"
        skinColor="#f2b486"
        hairColor="#3b2417"
        phaseOffset={0}
      />
      <Girl
        x={820}
        dressColor="#46a6e0"
        skinColor="#c98a5e"
        hairColor="#181818"
        phaseOffset={7.5}
      />
    </svg>
  );
};
