export const STORAGE_SETTINGS: any = {
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
    width: '20%',
    custom: [
      {
        name: 'info',
        title: '<div class="px-5"><i class="fa fa-info-circle"></i></div>',
      },
    ],
  },
  columns: {
    name: {
      title: 'Naziv',
    },
    maxAmount: {
      title: 'Veličina',
    },
    amount: {
      title: 'Trenutno stanje',
    },
    capacity: {
      editable: false,
      sort: true,
      sortDirection: 'desc',
      title: 'Popunjenost (%)',
    },
  },
};
