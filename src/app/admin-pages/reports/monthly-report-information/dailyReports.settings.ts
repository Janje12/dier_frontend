export const DAILY_REPORTS_SETTINGS: any = {
  pager: {
    perPage: 10,
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    dan: {
      title: 'Dan',
    },
    ukupnoStanje: {
      title: 'Ukupno stanje (kg)',
    },
    ukupnoProizvodnja: {
      title: 'Ukupna proizvodnja (kg)',
    },
    ukupnoTransport: {
      title: 'Ukupan transport (kg)',
    },
    DKO: {
      valuePrepareFunction: (cell: any, row: any) => {
        const result = row.nazivFirme ? row.nazivFirme + ' ' + row.brojDozvole : '/';
        return result;
      },
      title: 'DKO',
    },
  },
};
