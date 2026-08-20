import React from 'react';
import logo from '../assets/logo.png';

const SIZES = {
  header: {
    logo: 'h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] md:h-[89px] md:w-[89px]',
    primary: 'text-lg sm:text-xl md:text-2xl',
    secondary: 'text-xs sm:text-sm mt-1 sm:mt-2',
    gap: 'ml-2 sm:ml-4',
  },
  sidebar: {
    logo: 'h-10 w-10',
    primary: 'text-sm',
    secondary: 'text-[9px] mt-0.5',
    gap: 'ml-3',
  },
  compact: {
    logo: 'h-[60px] w-[60px]',
    primary: 'text-lg',
    secondary: 'text-xs mt-1',
    gap: 'ml-2',
  },
};

// One standard rendering of the "MONUMENTAL / UNIVERSITY" logo + wordmark,
// used everywhere it appears (student header, public header, login, enroll,
// admin sidebar) so it never drifts out of sync again.
const BrandMark = ({ size = 'header', textClassName = 'text-white' }) => {
  const s = SIZES[size];
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="Monumental University Logo"
        className={`${s.logo} object-contain`}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/89?text=Logo')}
      />
      <div className={`flex flex-col ${s.gap} ${textClassName}`}>
        <span className={`${s.primary} font-bold tracking-[5px] uppercase font-['Inria_Serif'] leading-none`}>
          Monumental
        </span>
        <span className={`${s.secondary} font-medium tracking-[5px] uppercase font-['Inria_Serif'] leading-none`}>
          University
        </span>
      </div>
    </div>
  );
};

export default BrandMark;
