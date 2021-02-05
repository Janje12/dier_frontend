export const STORAGE_TREATMENT_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Dodaj otpad/Obradi otpad/Završi tretman',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'add',
        title: '<i class="fa fa-plus"></i>',
      },
      {
        name: 'process',
        title:  '<i class="fa fa-trash-restore"></i>',
      },
      {
        name: 'leftover',
        title: '<i class="fa fa-exclamation-triangle"></i>',
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
      title: 'Kolicina',
    },
  },
};
