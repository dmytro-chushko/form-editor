import { ChartBarIcon, ListIcon } from '@phosphor-icons/react';

import { ROUTES } from '@/lib/constants/routes';

export const navItems = [
  {
    title: 'Form List',
    url: ROUTES.Dashboard,
    icon: ListIcon,
  },
  {
    title: 'Results',
    url: ROUTES.Results,
    icon: ChartBarIcon,
  },
];
