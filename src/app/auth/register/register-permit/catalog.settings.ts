export const CATALOG_SETTINGS = {
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
        name: 'izaberi',
        title: '<i class="fa fa-plus"></i>',
      },
    ],
  },
  columns: {
    indexNumber: {
      title: 'Indeksni Broj',
      filter: false,
      sort: true,
      sortDirection: 'asc',
    },
    name: {
      title: 'Naziv',
      filter: false,
    },
  },
};
