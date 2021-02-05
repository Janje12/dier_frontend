export const TRASH_CATALOG_SETTINGS: any = {
  pager: {
    perPage: 5,
  },
  hideSubHeader: true,
  actions: {
    columnTitle: 'Odaberi',
    position: 'right',
    add: false,
    delete: false,
    edit: false,
    custom: [
      {
        name: 'dodaj',
        title: '<i class="fa fa-plus-square"></i>',
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
  },
};
