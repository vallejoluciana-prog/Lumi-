import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const Tree: React.FC<{ x: number; scale: number }> = ({ x, scale }) => (
  <g transform={`translate(${x}, 0) scale(${scale})`}>
    <rect x={-10} y={420} width={20} height={90} rx={6} fill="#7a5230" />
    <circle cx={0} cy={380} r={70} fill="#3f8f4f" />
    <circle cx={-40} cy={410} r={50} fill="#3a8248" />
    <circle cx={45} cy={405} r={55} fill="#46974f" />
  </g>
);

const Walker: React.FC<{ x: number }> = ({ x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stride = (frame / fps) * 2.4;
  const legFront = Math.sin(stride * Math.PI * 2) * 28;
  const legBack = Math.sin(stride * Math.PI * 2 + Math.PI) * 28;
  const armFront = Math.sin(stride * Math.PI * 2 + Math.PI) * 24;
  const armBack = Math.sin(stride * Math.PI * 2) * 24;
  const bob = Math.abs(Math.sin(stride * Math.PI * 2)) * 8;

  const hipY = 300 - bob;

  return (
    <g transform={`translate(${x}, 0)`}>
      <ellipse cx={0} cy={478} rx={44} ry={9} fill="rgba(0,0,0,0.18)" />

      <line
        x1={0}
        y1={hipY}
        x2={legBack}
        y2={460}
        stroke="#c98a5e"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <line
        x1={0}
        y1={hipY}
        x2={legFront}
        y2={460}
        stroke="#e0a878"
        strokeWidth={13}
        strokeLinecap="round"
      />

      <line
        x1={-16}
        y1={hipY - 75}
        x2={armBack - 16}
        y2={hipY - 15}
        stroke="#c98a5e"
        strokeWidth={11}
        strokeLinecap="round"
      />

      <path
        d={`M -38 ${hipY} Q -42 ${hipY - 95} 0 ${hipY - 100} Q 42 ${hipY - 95} 38 ${hipY} L 30 ${hipY + 10} Q 0 ${hipY + 18} -30 ${hipY + 10} Z`}
        fill="#f6c6d4"
        stroke="#eeb0c4"
        strokeWidth={2}
      />

      <circle cx={-10} cy={hipY - 78} r={7} fill="#c0203a" />
      <circle cx={8} cy={hipY - 60} r={7} fill="#c0203a" />
      <circle cx={-10} cy={hipY - 78} r={2} fill="#1a1a1a" />
      <circle cx={8} cy={hipY - 60} r={2} fill="#1a1a1a" />

      <line
        x1={16}
        y1={hipY - 75}
        x2={armFront + 16}
        y2={hipY - 15}
        stroke="#e0a878"
        strokeWidth={11}
        strokeLinecap="round"
      />

      <circle cx={0} cy={hipY - 122} r={30} fill="#e0a878" />
      <path
        d={`M -30 ${hipY - 130} Q 0 ${hipY - 175} 30 ${hipY - 130} Q 34 ${hipY - 90} 18 ${hipY - 70} Q 26 ${hipY - 110} 0 ${hipY - 100} Q -26 ${hipY - 110} -18 ${hipY - 70} Q -34 ${hipY - 90} -30 ${hipY - 130} Z`}
        fill="#6b4226"
      />
    </g>
  );
};

export const WomanWalkingPark: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const walkerX = interpolate(
    frame,
    [0, durationInFrames],
    [120, 1160],
    { extrapolateRight: "clamp" },
  );

  return (
    <svg viewBox="0 0 1280 720" width="100%" height="100%">
      <rect x={0} y={0} width={1280} height={460} fill="#aee2f7" />
      <circle cx={1120} cy={90} r={60} fill="#fff3a0" />
      <rect x={0} y={460} width={1280} height={260} fill="#6bb05a" />
      <rect x={0} y={460} width={1280} height={20} fill="#5a9a4c" />

      <Tree x={140} scale={0.9} />
      <Tree x={300} scale={0.7} />
      <Tree x={1000} scale={0.8} />
      <Tree x={1180} scale={0.6} />

      <rect x={0} y={500} width={1280} height={60} fill="#d9c08a" opacity={0.7} />

      <Walker x={walkerX} />
    </svg>
  );
};
