import React from "react";


export default function CountdownContainer({
  backgroundColor = "#F9FAF6", // Should match background color of the page
  stroke = 2, // Width of the curved rectangle outline
  duration = 10, // Duration of animation
  scale = 1, // Size of container
}) {

  const ellipseMobilePath = `M ${83 + stroke},${8 + stroke} L ${260 + stroke},${8 + stroke} A 80,65 0 0 1 ${260 + stroke},${140 + stroke} L ${83 + stroke},${140 + stroke} A 80,65 0 0 1 ${83 + stroke},${8 + stroke}`;

  return (
    <svg width={342 + stroke*2} height={147 + stroke*2} viewBox={`0 0 ${342 + stroke*2} ${147 + stroke*2}}`} fill="none" xmlns="http://www.w3.org/2000/svg" transform={`scale(${scale})`}>
      <defs>
        <linearGradient id="paint0_linear_3_4_mobile" x1={2 + stroke} y1={65 + stroke} x2={342 + stroke} y2={65 + stroke} gradientUnits="userSpaceOnUse">
          <stop stop-color="#121212"/>
          <stop offset="0.245" stop-color="#009A45"/>
          <stop offset="0.5" stop-color="#FFEC02"/>
          <stop offset="0.75" stop-color="#0078C2"/>
          <stop offset="1" stop-color="#D64138"/>
        </linearGradient>
        <filter id="blurFilter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
        </filter>
        <mask id="mask_mobile">
          <ellipse cx="0" cy="0" rx={36 + stroke} ry="10" fill="#fff" filter="url(#blurFilter)" fill-opacity="20%">
            <animateMotion dur={duration} begin="0.0s" repeatCount="indefinite" path={ellipseMobilePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={38 + stroke} ry="8" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.3s" repeatCount="indefinite" path={ellipseMobilePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={40 + stroke} ry="6" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.1s" repeatCount="indefinite" path={ellipseMobilePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={42 + stroke} ry="4" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.4s" repeatCount="indefinite" path={ellipseMobilePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={44 + stroke} ry="2" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.0s" repeatCount="indefinite" path={ellipseMobilePath} rotate="auto"/>
          </ellipse>
        </mask>
        <filter id="blur-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
        </filter>
      </defs>
      <rect x={1 + stroke} y={1 + stroke} width="340" height="145" rx="80" stroke="url(#paint0_linear_3_4_mobile)" stroke-width={stroke}/>
      <rect x={1 + stroke} y={1 + stroke} width="340" height="145" rx="80" fill="url(#paint0_linear_3_4_mobile)" mask="url(#mask_mobile)"/>
      <g style={{
        mixBlendMode: "soft-light"
      }}
      filter="url(#blur-effect)">
        <circle cx="0" cy="0" r="40" fill={backgroundColor}>
          <animateMotion dur={duration} begin="-0.2s" repeatCount="indefinite" path={ellipseMobilePath}/>
        </circle>
        <circle cx="0" cy="0" r="40" fill={backgroundColor}>
          <animateMotion dur={duration} begin="-0.1s" repeatCount="indefinite" path={ellipseMobilePath}/>
        </circle>
        <circle cx="0" cy="0" r="40" fill={backgroundColor}>
          <animateMotion dur={duration} begin="0.1s" repeatCount="indefinite" path={ellipseMobilePath}/>
        </circle>
        <circle cx="0" cy="0" r="40" fill={backgroundColor}>
          <animateMotion dur={duration} begin="0.2s" repeatCount="indefinite" path={ellipseMobilePath}/>
        </circle>
      </g>
    </svg>
  );
}