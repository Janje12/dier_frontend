export const FORM_SETTINGS: any = [
  {
    redirectDelay: 0,
    showMessages: {
      success: true,
      error: true,
    },
  },
];

export const VALLIDATION_SETTINGS: any = {
  // User Registration
  firstName: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-ZšđžćčŠĐŽĆČ \-\']+',
  },
  lastName: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-ZšđžćčŠĐŽĆČ \-\']+',
  },
  username: {
    required: true,
    minLength: 6,
    maxLength: 20,
    pattern: '^(?!.*(@|\\?|!))\\S*',
  },
  email: {
    pattern: '^[a-zšđžćč0-9._%+-]+@[a-zšđžćč0-9.-]+\\.[a-zšđčćž]{2,4}$',
    required: true,
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 50,
    pattern: '\\S*',
  },
  telephone: {
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  // Company Registration
  companyName: {
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  pib: {
    required: true,
    minLength: 9,
    maxLength: 9,
    pattern: '[0-9]{9}',
  },
  mat: {
    required: true,
    minLength: 8,
    maxLength: 8,
    pattern: '[0-9]{8}',
  },
  // Use one value for placeName, placeCode, townshipName, townshipCode
  address: {
    required: true,
  },
  street: {
    required: true,
    minLength: 3,
  },
  zipCode: {
    required: true,
    minLength: 5,
    maxLength: 5,
  },
  occupation: {
    required: true,
  },
  // Storage Registration
  storageName: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  storageSize: {
    required: true,
    pattern: '[0-9]*',
    min: 0.1,
  },
  geolocation: {
    required: false,
    pattern: '[0-9].*',
    minLength: 6,
  },
  date: {
    required: true,
  },
  dumpType: {
    required: true,
  },
  // Transport Vehicle Registration
  permitName: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  permitCode: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  licensePlate: {
    required: true,
    minLength: 9,
    maxLength: 10,
    pattern: '([A-Ž]{2})-([0-9]{3,4})-([A-Ž]{2})',
  },
  vehicleType: {
    required: true,
  },
};
