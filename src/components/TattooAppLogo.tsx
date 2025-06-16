import * as React from 'react';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';

// A minimalist tattoo machine with an ink drop, fits dark/light backgrounds
export const TattooAppLogo = ({ size = 72 }) => (
  <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
    {/* Main machine body */}
    <Rect x="18" y="16" width="36" height="20" rx="6" fill="#222" />
    {/* Needle bar */}
    <Rect x="34" y="36" width="4" height="16" rx="2" fill="#888" />
    {/* Machine coils */}
    <Circle cx="26" cy="26" r="4" fill="#444" />
    <Circle cx="46" cy="26" r="4" fill="#444" />
    {/* Ink drop */}
    <Path d="M36 60c2.5 0 4.5-2 4.5-4.5 0-2.2-1.9-4.8-3.2-6.5a2 2 0 0 0-3.1 0C33.4 51 31.5 53.3 31.5 55.5 31.5 58 33.5 60 36 60Z" fill="#A2592C" />
    {/* Decorative bolt */}
    <Circle cx="36" cy="22" r="2" fill="#A2592C" />
  </Svg>
);
