import * as React from "react";
import { SVGProps } from "react";
const GlobeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    viewBox="0 0 24 24"
    height="1em"
    fill="none"
    {...props}
  >
    <g stroke="#FFF8F8" strokeWidth={1.5} clipPath="url(#a)">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.2 1.71c-1.3 6.87-1.3 13.73 0 20.6M14.82 1.7a55.843 55.843 0 0 1 0 20.62"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.73 14.81a55.364 55.364 0 0 0 20.61 0M1.73 9.2a55.364 55.364 0 0 1 20.61 0"
      />
      <circle cx={12} cy={12} r={11} />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default GlobeIcon;
