export const CATALOG_SETTINGS: any = {
  hideSubHeader: true,
  pager: {
    perPage: 4,
  },
  actions: {
    columnTitle: 'Odaberi',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'dodaj',
        title: '<i class="fa fa-plus-square"></i>',
      },
    ],
  },
  columns: {
    indeksniBroj: {
      title: 'Indeksni Broj',
      width: '15%',
    },
    naziv: {
      title: 'Naziv',
      width: '75%',
    },
  },
};
