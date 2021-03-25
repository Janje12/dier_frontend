import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Početni panel',
    icon: {icon: 'home', pack: 'font-awesome'},
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
    icon: {icon: 'box-open', pack: 'font-awesome'},
  },
  {
    title: 'Dodaj otpad',
    icon: {icon: 'folder', pack: 'font-awesome'},
    children: [
      {
        title: 'Neopasni otpad',
        icon: {icon: 'recycle', pack: 'font-awesome'},
        children: [
          {
            title: 'Proizvođač/Vlasnik',
            link: '/pages/trash/safe/production',
            icon: {icon: 'hard-hat', pack: 'font-awesome'},
          },
          {
            title: 'Tretman',
            link: '/pages/trash/safe/treatment',
            icon: {icon: 'dumpster', pack: 'font-awesome'},
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
        icon: {icon: 'radiation-alt', pack: 'font-awesome'},
        children: [
          {
            title: 'Proizvođač/Vlasnik',
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
      {
        title: 'Posebni tokovi otpada',
        icon: {icon: 'car-battery', pack: 'font-awesome'},
        children: [
          {
            title: 'Proizvodnja',
            link: '/pages/trash/specialwaste/production',
            icon: {icon: 'database', pack: 'font-awesome'},
          },
          {
            title: 'Uvoz',
            link: '/pages/trash/specialwaste/import',
            icon: {icon: 'file-import', pack: 'font-awesome'},
          },
          {
            title: 'Izvoz',
            link: '/pages/trash/specialwaste/export',
            icon: {icon: 'file-export', pack: 'font-awesome'},
          },
        ],
      },
    ],
  },
  {
    title: 'Vozila',
    link: '/pages/profile/vehicles',
    icon: {icon: 'truck', pack: 'font-awesome'},
  },
  {
    title: 'Dozvole',
    link: '/pages/profile/permits',
    icon: {icon: 'file-alt', pack: 'font-awesome'},
  },
  {
    title: 'Postupak izrade/obnove dozvole',
    link: '/pages/profile/permit-renewal',
    icon: {icon: 'file-upload', pack: 'font-awesome'},
  },
];
