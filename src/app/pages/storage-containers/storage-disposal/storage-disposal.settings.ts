export const STORAGE_DISPOSAL_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Dodaj otpad/Odloži otpad/Završi odlaganje',
    position: 'right',
    edit: false,
    add: false,
    delete: false,
    custom: [
      {
        name: 'add',
        title: '<i class="fa fa-plus"></i>',
      },
      {
        name: 'dispose',
        title: '<i class="fa fa-trash-alt"></i>',
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
      title: 'Količina (KG)',
    },
  },
};
