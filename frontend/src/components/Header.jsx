import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BrandMark from './BrandMark.jsx';

const Header = ({ userName, userRole, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-[#1F386B] px-4 sm:px-8 py-4 h-[110px] box-border text-white">
      <div className="md:ml-[70px]">
        <BrandMark size="header" />
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