export const STORAGE_PRODUCTION_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Dodaj na skladište',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'add',
        title: '<i class="fa fa-folder-plus"></i>',
      },
    ],
  },
  columns: {
    indexNumber: {
      title: 'Indeksni Broj',
    },
    name: {
      title: 'Naziv',
    },
    desc: {
      title: 'Opis',
    },
    amount: {
      title: 'Količina (kg)',
    },
  },
};
