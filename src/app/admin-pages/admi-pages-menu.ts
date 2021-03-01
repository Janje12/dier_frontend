import { NbMenuItem } from '@nebular/theme';

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Početni panel',
    icon: {icon: 'home', pack: 'font-awesome'},
    link: '/admin/admin-dashboard',
    home: true,
  },
  {
    title: 'ADMIN PANELA',
    group: true,
  },
  {
    title: 'Korisnici',
    link: '/admin/users',
    icon: {icon: 'user', pack: 'font-awesome'},
  },
  {
    title: 'Firme',
    link: '/admin/companies',
    icon: {icon: 'industry', pack: 'font-awesome'},
  },
  {
    title: 'Skladišta',
    link: '/admin/storages',
    icon: {icon: 'box', pack: 'font-awesome'},
  },
  {
    title: 'Dozvole',
    link: '/admin/permits',
    icon: {icon: 'paste', pack: 'font-awesome'},
  },
  {
    title: 'Izveštaji',
    link: '/admin/reports',
    icon: {icon: 'print', pack: 'font-awesome'},
  },
];
