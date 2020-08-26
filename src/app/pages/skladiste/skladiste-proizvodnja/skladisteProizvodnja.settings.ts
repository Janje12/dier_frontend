export const SKLADISTE_PROIZVODNJA_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Dodaj na skladiste',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'dodaj',
        title: '<i class="fa fa-plus"></i>',
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
    opis: {
      title: 'Opis',
    },
    kolicina: {
      title: 'Kolicina',
    },
  },
};
