import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = ({ userName, userRole, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-[#1F386B] px-4 sm:px-8 py-4 h-[110px] box-border text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Monumental University Logo"
          className="h-[60px] w-[70px] sm:h-[80px] sm:w-[90px] md:h-[100px] md:w-[104px] mr-3 md:ml-[70px]"
        />
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg md:text-xl font-medium tracking-[5px] uppercase font-['Inria_Serif'] leading-none mt-2 md:mt-5">
            MONUMENTAL
          </h1>
          <h1 className="text-xs sm:text-sm font-medium tracking-[5px] uppercase font-['Inria_Serif'] leading-none mt-1 md:mt-2 md:ml-4">
            UNIVERSITY
          </h1>
        </div>
      </div>

      <div className="flex gap-3 md:gap-4">
        {isAuthenticated && userRole === 'student' ? (
          <>
            <span className="text-lg md:text-xl font-bold font-['Poppins']">
              {userName} ({userRole})
            </span>
            <button
              onClick={onLogout}
              className="px-4 sm:px-5 py-2 text-white bg-transparent font-['Poppins'] text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:text-[#ccc]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 sm:px-5 py-2 text-white bg-transparent font-['Poppins'] text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:text-[#ccc]">
                Login
              </button>
            </Link>
            <button
              onClick={() => navigate('/enroll')}
              className="px-4 sm:px-5 py-2 text-[#1e3a8a] bg-white font-['Poppins'] text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:bg-[#00FF41]"
            >
              Enroll
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;