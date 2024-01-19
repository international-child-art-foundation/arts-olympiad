import React from "react";


export default function CountdownContainer({
  backgroundColor = "#F9FAF6", // Should match background color of the page
  stroke = 2, // Width of the curved rectangle outline
  duration = 10, // Duration of animation
  scale = 1, // Size of container
}) {

  const ellipsePath=`M ${50 + stroke},${10 + stroke} L ${550 + stroke},${10 + stroke} A 30,30 0 0 1 ${551 + stroke},${91 + stroke} L ${50 + stroke},${91 + stroke} A 30,30 0 0 1 ${50 + stroke},${10 + stroke}`;

  return (
    <svg width={602 + stroke*2} height={102 + stroke*2} viewBox={`0 0 ${602 + stroke*2} ${102 + stroke*2}}`} fill="none" xmlns="http://www.w3.org/2000/svg" transform={`scale(${scale})`}>
      <defs>
        <linearGradient id="paint0_linear_3_4" x1={2 + stroke} y1={65 + stroke} x2={602 + stroke} y2={65 + stroke} gradientUnits="userSpaceOnUse">
          <stop stop-color="#121212"/>
          <stop offset="0.245" stop-color="#009A45"/>
          <stop offset="0.5" stop-color="#FFEC02"/>
          <stop offset="0.75" stop-color="#0078C2"/>
          <stop offset="1" stop-color="#D64138"/>
        </linearGradient>
        <filter id="blurFilter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
        </filter>
        <mask id="mask">
          <ellipse cx="0" cy="0" rx={30 + stroke} ry="12" fill="#fff" filter="url(#blurFilter)" fill-opacity="10%">
            <animateMotion dur={duration} begin="0s" repeatCount="indefinite" path={ellipsePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={35 + stroke} ry="10" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="-0.2s" repeatCount="indefinite" path={ellipsePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={40 + stroke} ry="8" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="-0.1s" repeatCount="indefinite" path={ellipsePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={45 + stroke} ry="6" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.1s" repeatCount="indefinite" path={ellipsePath} rotate="auto"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx={50 + stroke} ry="4" fill="#fff" filter="url(#blurFilter)" fill-opacity="6%">
            <animateMotion dur={duration} begin="0.2s" repeatCount="indefinite" path={ellipsePath} rotate="auto"/>
          </ellipse>
        </mask>
        <filter id="blur-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
        </filter>
      </defs>
      <rect x={1 + stroke} y={1 + stroke} width="600" height="100" rx="51" stroke="url(#paint0_linear_3_4)" stroke-width={stroke}/>
      <rect x={1 + stroke} y={1 + stroke} width="600" height="100" rx="51" fill="url(#paint0_linear_3_4)" mask="url(#mask)"/>
      <g style={{
        mixBlendMode: "soft-light"
      }}
      filter="url(#blur-effect)">
        <circle cx="0" cy="0" r="30" fill={backgroundColor}>
          <animateMotion dur={duration} begin="-0.2s" repeatCount="indefinite" path={ellipsePath}/>
        </circle>
        <circle cx="0" cy="0" r="30" fill={backgroundColor}>
          <animateMotion dur={duration} begin="-0.1s" repeatCount="indefinite" path={ellipsePath}/>
        </circle>
        <circle cx="0" cy="0" r="30" fill={backgroundColor}>
          <animateMotion dur={duration} begin="0.1s" repeatCount="indefinite" path={ellipsePath}/>
        </circle>
        <circle cx="0" cy="0" r="30" fill={backgroundColor}>
          <animateMotion dur={duration} begin="0.2s" repeatCount="indefinite" path={ellipsePath}/>
        </circle>
      </g>
    </svg>
  );
}