export const STORAGE_REPORTS_SETTINGS: any = {
  actions: {
    columnTitle: 'Generiši DEO/DKO',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'trashReport',
        title: '<i class="fa fa-file-pdf"></i>',
      },
      {
        name: 'trashTransport',
        title: '<i class="fa fa-truck"></i>',
      },
    ],
  },
  columns: {
    indeksniBroj: {
      title: 'Indeksni Broj',
    },
    naziv: {
      title: 'Naziv',
    },
    kolicina: {
      title: 'Količina (kg)',
    },
  },
};
