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
    link: '/admin/korisnici',
    icon: {icon: 'user', pack: 'font-awesome'},
  },
  {
    title: 'Firme',
    link: '/admin/firme',
    icon: {icon: 'industry', pack: 'font-awesome'},
  },
  {
    title: 'Skladišta',
    link: '/admin/skladistа',
    icon: {icon: 'box', pack: 'font-awesome'},
  },
  {
    title: 'Izveštaji',
    link: '/admin/izvestaji',
    icon: {icon: 'print', pack: 'font-awesome'},
  },
];
