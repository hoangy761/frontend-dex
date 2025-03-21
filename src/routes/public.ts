import React from 'react';
import Home from '~/pages/Home';
import { Overviews } from '~/pages/Dashboard';
import DashboardLayout from '~/layouts/DashboardLayout';
import Profile from '~/pages/Profile/Profile';
import { DeveloperApp } from '~/pages/DeveloperApp';
type route = {
  path: string;
  component: React.ComponentType;
  layout?: React.ElementType | null;
};
const publicRoutes: route[] = [
  { path: '/', component: Home, layout: DashboardLayout },
  { path: '/*', component: Home, layout: DashboardLayout },
  { path: '/overviews', component: Overviews, layout: DashboardLayout },
  { path: '/profile', component: Profile, layout: DashboardLayout },
  { path: '/profile/apps/:id', component: DeveloperApp, layout: DashboardLayout },
];

export default publicRoutes;
