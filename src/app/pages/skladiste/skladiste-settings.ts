export const SKLADISTE_SETTINGS: any = {
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
        name: 'odaberi',
        title: '<i class="fa fa-plus"></i>',
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
