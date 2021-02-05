export const PERMIT_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    columnTitle: 'Lista otpada',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'add',
        title: '<i class="fa fa-search"></i>',
      },
    ],
  },
  columns: {
    naziv: {
      title: 'Naziv',
      editable: false,
    },
    sifra: {
      title: 'Šifra dozvole',
    },
    datumTrajanja: {
      title: 'Dozvola važi do',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.datumTrajanja.substring(0, 10);
      },
    },
  },
};
