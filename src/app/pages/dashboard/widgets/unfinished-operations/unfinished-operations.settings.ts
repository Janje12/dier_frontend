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
    korisnik: {
      title: 'Podnosioc operacije',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.korisnik.ime + ' ' + row.korisnik.prezime;
      },
    },
    datum: {
      title: 'Datum tretmana',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.datum.substring(0, 10);
      },
    },
    indeksniBroj: {
      title: 'Indeksni broj',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.otpad.indeksniBroj;
      },
    },
    naziv: {
      title: 'Naziv otpada',
      valuePrepareFunction: (cell: any, row: any) => {
        let result = row.otpad.naziv;
        if (row.otpad.naziv.length > 10)
          result = row.otpad.naziv.substring(0, 10) + '...';
        return result;
      },
    },
    kolicinaOtpada: {
      title: 'Kolicina (KG)',
      valuePrepareFunction: (cell: any, row: any) => {
        return row.kolicinaOtpada * -1;
      },
    },
  },
};
