import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Početni panel',
    icon: { icon: 'home', pack: 'font-awesome' },
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'RADNI PANEL',
    group: true,
  },
  {
    title: 'Skladište',
    link: '/pages/storage',
    icon: { icon: 'box-open', pack: 'font-awesome' },
  },
  {
    title: 'Neopasni otpad',
    icon: { icon: 'trash', pack: 'font-awesome' },
    children: [
      {
        title: 'Proizvodnja',
        link: '/pages/trash/safe/production',
      },
      {
        title: 'Tretman',
        link: '/pages/trash/safe/treatment',
      },
      {
        title: 'Odlaganje',
        link: '/pages/trash/safe/dump',
      },
      {
        title: 'Skladištenje',
        link: '/pages/trash/safe/cache',
      },
    ],
  },
  {
    title: 'Opasni otpad',
    icon: { icon: 'radiation-alt', pack: 'font-awesome' },
    children: [
      {
        title: 'Proizvodnja',
        link: '/pages/trash/unsafe/production',
      },
      {
        title: 'Tretman',
        link: '/pages/trash/unsafe/treatment',
      },
      {
        title: 'Odlaganje',
        link: '/pages/trash/unsafe/dump',
      },
      {
        title: 'Skladištenje',
        link: '/pages/trash/unsafe/cache',
      },
    ],
  },
];
