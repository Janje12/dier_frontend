export const VEHICLES_SETTINGS: any = {
  hideSubHeader: true,
  actions: {
    position: 'right',
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    type: {
      title: 'Vrsta vozila',
      type: 'html',
      valuePrepareFunction: (cell: any, row: any) => {
        const vehiclesType = row.type;
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
    licensePlate: {
      title: 'Registarski broj',
    },
    licensePlateExpiration: {
      title: 'Registracija važi do',
    },
  },
};
