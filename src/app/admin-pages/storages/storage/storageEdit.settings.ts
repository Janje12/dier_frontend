export const STORAGE_EDIT_SETTINGS: any = {
  hideSubHeader: true,
  pager: {
    perPage: 4,
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
  },
  actions: {
    position: 'right',
    add: false,
    edit: true,
    delete: true,
  },
  columns: {
    indexNumber: {
      title: 'Indeksni Broj',
      editable: false,
    },
    name: {
      title: 'Naziv',
    },
    desc: {
      title: 'Opis',
    },
    amount: {
      title: 'Količina (KG)',
    },
  },
};
