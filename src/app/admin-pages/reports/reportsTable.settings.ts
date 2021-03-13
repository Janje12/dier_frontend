export const COMPANY_REPORTS_SETTINGS: any = {
  pager: {
    perPage: 10,
  },
  actions: {
    columnTitle: 'Generiši izveštaj/Pregeldaj izveštaje',
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
    name: {
      title: 'Naziv Firme',
    },
    emailReception: {
      title: 'Email za prijem',
    },
    telephone: {
      title: 'Telefon',
    },
    operations: {
      title: 'Rad firme',
    },
  },
};
