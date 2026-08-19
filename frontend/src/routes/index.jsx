import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Header from '../components/Header';
import CenteredBox from '../components/CenteredBox';
import Sidebar from '../components/Sidebar'; // Importing the Sidebar component

const AppRoutes = () => {
  return (
    <div className="relative">
      <Header />
      <Sidebar /> {/* Adding the Sidebar here so it appears on the left */}
      <RouterRoutes>
        <Route path="/" element={<CenteredBox />} />
      </RouterRoutes>
    </div>
  );
};

export default AppRoutes;