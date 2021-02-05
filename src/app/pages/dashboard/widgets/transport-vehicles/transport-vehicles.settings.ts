export const VEHICLES_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    position: 'right',
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    vrstaVozila: {
      title: 'Vrsta vozila',
      type: 'html',
      valuePrepareFunction: (cell: any, row: any) => {
        const vehiclesType = row.vrstaVozila;
        let result = vehiclesType;
        if (vehiclesType === 'kamion')
          result = '<i class="fa fa-2x fa-truck"></i>';
        if (vehiclesType === 'kombi')
          result = '<i class="fa fa-2x fa-shuttle-van"></i>';
        if (vehiclesType === 'automobil ')
          result = '<i class="fa fa-2x fa-car-side"></i>';
        return result;
      },
    },
    registarskiBroj: {
      title: 'Registarski broj',
    },
    datumRegistracije: {
      title: 'Registracija važi do',
    },
  },
};
