export const COMPANY_REPORTS_SETTINGS: any = {
  pager: {
    perPage: 10,
  },
  actions: {
    columnTitle: 'Jedan izveštaj/Svi izveštaji',
    add: false,
    edit: false,
    delete: false,
    position: 'right',
    custom: [
      {
        name: 'one report',
        title: '<i class="fa fa-file-alt"></i>',
      },
      {
        name: 'all reports',
        title: '<i class="fa fa-book"></i>',
      },
    ],
  },
  columns: {
    pib: {
      title: 'PIB',
    },
    mat: {
      title: 'Matični broj',
    },
    naziv: {
      title: 'Naziv Firme',
    },
    emailPrijem: {
      title: 'Email za prijem',
    },
    telefon: {
      title: 'Telefon',
    },
    radFirme: {
      title: 'Rad firme',
    },
  },
};
