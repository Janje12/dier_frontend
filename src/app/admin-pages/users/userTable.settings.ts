export const USER_SETTINGS: any = {
    pager: {
      perPage: 10,
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i  class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fa-trash"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
    },
    actions: {
      columnTitle: 'Operacije',
      position: 'right',
      custom: [
        {
          name: 'info',
          title: '<div class="px-5"><i class="fa fa-info-circle"></i></div>',
        },
      ],
    },
    columns: {
      ime: {
        title: 'Ime',
      },
      prezime: {
        title: 'Prezime',
      },
      korisnickoIme: {
        title: 'Korisničko ime',
      },
      email: {
        title: 'Email',
      },
      telefon: {
        title: 'Telefon',
      },
      firma: {
        editable: false,
        valuePrepareFunction: (cell: any, row: any) => {
          return row.firma.naziv;
        },
        title: 'Firma',
      },
    },
  }
;
