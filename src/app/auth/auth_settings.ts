export const VALLIDATION_SETTINGS: any = {
  // Registracija Korisnika
  korisnickoIme: {
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  ime: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z \-\']+',
  },
  prezime: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z \-\']+',
  },
  telefon: {
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  // Registracija firma
  nazivFirme: {
    required: true,
    minLength: 1,
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
  opstina: {
    required: true,
  },
  mesto: {
    required: true,
  },
  postanskiBroj: {
    required: true,
    minLength: 5,
    maxLength: 5,
  },
  ulica: {
    required: true,
  },
  delatnost: {
    required: true,
  },
  imeZakonskogZastupinka: {
    required: true,
    minLength: 5,
    maxLength: 50,
    pattern: '^[a-zA-Z \-\']+',
  },
  // Registracija skladista
  velicinaSkladista: {
    required: true,
    pattern: '[0-9]*',
  },
};
