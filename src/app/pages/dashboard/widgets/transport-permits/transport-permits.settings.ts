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
    name: {
      title: 'Naziv',
      editable: false,
    },
    code: {
      title: 'Šifra dozvole',
    },
    dateExpiration: {
      title: 'Dozvola važi do',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.dateExpiration.substring(0, 10);
      },
    },
  },
};
