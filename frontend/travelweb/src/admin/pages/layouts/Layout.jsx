import React, { useState } from 'react';
import Sidepanel from './Sidepanel';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      <div
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <Sidepanel closeSidepanel={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-2 bg-gray-100">
          <button
            className="p-2 rounded bg-gray-200 shadow"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
