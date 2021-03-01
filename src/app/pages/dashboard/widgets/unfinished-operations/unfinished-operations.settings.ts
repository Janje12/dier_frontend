export const UNFINISHED_OPERATIONS_SETTINGS: any = {
  hideSubHeader: true,
  pager: {
    perPage: 5,
  },
  actions: {
    columnTitle: 'Završi tretman',
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
      {
        name: 'leftover',
        title:  '<i class="fa fa-exclamation-triangle"></i>',
      },
    ],
  },
  columns: {
    user: {
      title: 'Podnosioc operacije',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.user.firstName + ' ' + row.user.lastName;
      },
    },
    date: {
      title: 'Datum tretmana',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.date.substring(0, 10);
      },
    },
    indexNumber: {
      title: 'Indeksni broj',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.trash.indexNumber;
      },
    },
    name: {
      title: 'Naziv otpada',
      valuePrepareFunction: (cell: any, row: any) => {
        let result = row.trash.name;
        if (row.trash.name.length > 10)
          result = row.trash.name.substring(0, 10) + '...';
        return result;
      },
    },
    amount: {
      title: 'Kolicina (KG)',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.trash.amount;
      },
    },
  },
};
