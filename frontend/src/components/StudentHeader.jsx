// src/components/StudentHeader.jsx
import studentIcon from '../assets/Student.png';
import BrandMark from './BrandMark.jsx';
import NotificationBell from './NotificationBell.jsx';

const StudentHeader = ({ userName, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1F386B] flex justify-between items-center py-3 px-4 md:px-8 shadow-md z-40 text-white">
      <BrandMark size="header" />

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
          <NotificationBell />
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
