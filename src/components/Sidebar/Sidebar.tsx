/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Tippy from '@tippyjs/react';
import {
  AnalysisTextLinkIcon,
  Bitcoin03Icon,
  PromotionIcon,
  DataRecoveryIcon,
  Cancel01Icon,
  GameboyIcon,
  Menu01Icon,
  CodeFolderIcon,
  SidebarBottomIcon,
  UserIcon,
} from 'hugeicons-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button';
import User from '../Header/User';
import Footer from './Footer';
interface routeNav {
  to: string;
  icon: React.ReactNode;
  name: string;
}
const Sidebar = () => {
  const routesSidebar: routeNav[] = [
    { to: '/overviews', name: 'Overviews', icon: <CodeFolderIcon /> },
    { to: '/stats', name: 'Stats', icon: <AnalysisTextLinkIcon /> },
  ];
  const routesSidebarBottom: routeNav[] = [
    { to: '/stats', name: 'Docs', icon: <AnalysisTextLinkIcon /> },
    { to: '/profile', name: 'Profile', icon: <UserIcon /> },
  ];
  const path = useLocation();
  return (
    <nav className="h-full flex flex-col justify-between ">
      <div className="space-y-4">
        <Button className="h-20 w-60" icon={<img src="logo-text.svg" width={200} alt="logo" />} to="/"></Button>
        <ul className="flex flex-col">
          {routesSidebar.map((route, index) => (
            <li key={index}>
              <Button
                text
                to={route.to}
                icon={route.icon}
                className={`${path.pathname === route.to ? 'underline' : ''}  `}
              >
                {route.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <ul className="flex flex-col">
          {routesSidebarBottom.map((route, index) => (
            <li key={index}>
              <Button
                text
                to={route.to}
                icon={route.icon}
                className={`${path.pathname === route.to ? 'underline' : ''}  `}
              >
                {route.name}
              </Button>
            </li>
          ))}
        </ul>
        <div className=" justify-center flex">
          <User />
        </div>
        <Footer />
      </div>
    </nav>
  );
};

export default Sidebar;
