export const SKLADISTE_TRETMAN_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Obradi otpad',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'obradi',
        title: '<i class="fa fa-recycle"></i>',
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
