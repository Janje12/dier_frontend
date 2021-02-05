export const MONTHLY_REPORTS_SETTINGS: any = {
  actions: {
    columnTitle: 'Generiši GIO/Detaljnije',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'yearlyReport',
        title: '<i class="fa fa-file-pdf"></i>',
      },
      {
        name: 'moreInfo',
        title: '<i class="fa fa-info-circle"></i>',
      },
    ],
  },
  columns: {
    otpad: {
      valuePrepareFunction: (cell: any, row: any) => {
        return row.otpad.naziv + ' (' + row.otpad.indeksniBroj + ')';
      },
      title: 'Otpad',
    },
    ukupnoProizvodnja: {
      title: 'Ukupno proizvedeno',
    },
    ukupnoTransport: {
      title: 'Ukupno transportovano',
    },
    ukupnoStanje: {
      title: 'Ukupno stanje',
    },
  },
};
