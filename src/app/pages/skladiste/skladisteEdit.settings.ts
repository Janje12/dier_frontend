export const SKLADISTE_EDIT_SETTINGS: any = {
  hideSubHeader: true,
  pager: {
    perPage: 4,
  },
  edit: {
    confirmSave: true,
  },
  delete: {
    confirmDelete: true,
  },
  actions: {
    position: 'right',
    add: false,
    edit: true,
    delete: true,
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
