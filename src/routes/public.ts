import React from 'react';
import Home from '~/pages/Home';
import Liquidity from '~/pages/Liquidity';
import Swap from '~/pages/Swap';
import Vault from '~/pages/Vault';
import FistStep from '~/pages/NestJS';
import { Home as DashboardIndex } from '~/pages/Dashboard';
import DashboardLayout from '~/layouts/DashboardLayout';
type route = {
  path: string;
  component: React.ComponentType;
  layout?: React.ElementType | null;
};
const publicRoutes: route[] = [
  { path: '/', component: Home },
  { path: '/*', component: Home },
  { path: '/vaults', component: Vault },
  { path: '/swap', component: Swap },
  { path: '/liquidity', component: Liquidity },
  { path: '/nestJS', component: FistStep },
  { path: '/dashboard', component: DashboardIndex, layout: DashboardLayout },
];

export default publicRoutes;
