// src/components/StudentHeader.jsx
import logo from '../assets/logo.png';
import studentIcon from '../assets/Student.png';

const StudentHeader = ({ userName, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1F386B] flex justify-between items-center py-3 px-4 md:px-8 shadow-md z-40 text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Monumental University Logo"
          className="h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] md:h-[89px] md:w-[89px] object-contain"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/89?text=Logo')}
        />
        <div className="flex flex-col ml-2 sm:ml-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[5px] uppercase font-['Inria_Serif']">
            MONUMENTAL
          </span>
          <span className="text-xs sm:text-sm md:text-sm tracking-[5px] uppercase font-['Inria_Serif'] mt-1 sm:mt-2">
            UNIVERSITY
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-5 mr-4 md:mr-8">
        <button
          className="lg:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          <span className="text-lg sm:text-xl md:text-2xl font-bold font-['Poppins']">
            {userName || 'Student'}
          </span>
          <img
            src={studentIcon}
            alt="Student avatar"
            className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] md:h-[60px] md:w-[60px] object-cover rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/60?text=Avatar')}
          />
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
