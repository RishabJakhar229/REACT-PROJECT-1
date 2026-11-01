/**
 * InkField — an organic ink-wash bloom drawn with an SVG turbulence filter.
 * Pure decoration: no data, no interaction.
 *
 * Each instance needs a unique `uid` because SVG filter/gradient ids are global.
 */
function InkField({ uid = "a", className = "", tone = "dark" }) {
  const washId = `ink-wash-${uid}`;
  const deepId = `ink-deep-${uid}`;
  const coolId = `ink-cool-${uid}`;
  const coreId = `ink-core-${uid}`;

  const deep = tone === "light" ? "#f2eee4" : "#171614";

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter
          id={washId}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.019"
            numOctaves="4"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="72"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <radialGradient id={deepId} cx="46%" cy="42%" r="62%">
          <stop offset="0%" stopColor={deep} stopOpacity="0.94" />
          <stop offset="55%" stopColor={deep} stopOpacity="0.62" />
          <stop offset="100%" stopColor={deep} stopOpacity="0" />
        </radialGradient>

        <radialGradient id={coolId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5b646b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5b646b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={coreId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={deep} stopOpacity="0.95" />
          <stop offset="100%" stopColor={deep} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g filter={`url(#${washId})`}>
        <ellipse cx="300" cy="300" rx="238" ry="212" fill={`url(#${deepId})`} />
        <ellipse cx="352" cy="258" rx="152" ry="120" fill={`url(#${coreId})`} />
        <ellipse
          cx="216"
          cy="368"
          rx="150"
          ry="112"
          fill={`url(#${coolId})`}
        />
      </g>
    </svg>
  );
}

export default InkField;
