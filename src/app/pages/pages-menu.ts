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
    link: '/pages/skladiste',
    icon: { icon: 'box-open', pack: 'font-awesome' },
  },
  {
    title: 'Neopasni otpad',
    icon: { icon: 'trash', pack: 'font-awesome' },
    children: [
      {
        title: 'Dodaj na skladiste',
        link: '/pages/notpad/dodaj-na-skladiste',
      },
      {
        title: 'Dodaj novi otpad',
        link: '/pages/notpad/dodaj-otpad',
      },
    ],
  },
  {
    title: 'Opasni otpad',
    icon: { icon: 'exclamation-triangle', pack: 'font-awesome' },
    children: [
      {
        title: 'Dodaj na skladiste',
        link: '/pages/',
      },
      {
        title: 'Dodaj novi otpad',
        link: '/pages/ootpad/dodaj-otpad',
      },

    ],
  },
  {
    title: 'Posebni tokovi otpada',
    icon: { icon: 'car-battery', pack: 'font-awesome' },
    children: [

      {
        title: 'Dodaj novi otpad',
        link: '/pages/ptotpad/dodaj-otpad',
      },

    ],
  },
  {
    title: 'Amblaze/ambalazni otpad',
    icon: { icon: 'recycle', pack: 'font-awesome' },
    children: [
      {
        title: 'Dodaj novi otpad',
        link: '/pages/aotpad/dodaj-otpad',
      },
      {
        title: 'Dodaj novu ambalazu',
        link: '/pages/aotpad/dodaj-ambalazu',
      },

    ],
  },
];
