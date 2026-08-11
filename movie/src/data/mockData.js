// ─── Mock Users ───
export const mockAdmin = {
  _id: 'u_admin',
  name: 'Admin',
  email: 'admin@cinematix.com',
  phone: '9800000000',
  role: 'admin',
  token: 'mock-jwt-admin-token'
};

export const mockUser = {
  _id: 'u1',
  name: 'Demo User',
  email: 'user@cinematix.com',
  phone: '9800000001',
  role: 'user',
  token: 'mock-jwt-token'
};

// ─── Movies ───
export const mockMovies = [
  {
    _id: 'm1',
    title: 'The Good Dinosaur',
    description: 'An epic journey into the world of dinosaurs where an Apatosaurus named Arlo makes an unlikely human friend.',
    poster: '/posters/dinosaur.avif',
    backdrop: '/posters/dinosaur.avif',
    duration: 93,
    genre: ['Animation', 'Adventure', 'Comedy', 'Family'],
    language: 'English',
    releaseDate: '2015-11-25',
    rating: 7.0,
    imdbRating: '7.0/10',
    status: 'now_showing',
    director: 'Peter Sohn',
    trailer: '',
  },
  {
    _id: 'm2',
    title: 'Aladdin',
    description: 'A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',
    poster: '/posters/aladin.webp',
    backdrop: '/posters/aladin.webp',
    duration: 128,
    genre: ['Animation', 'Adventure', 'Fantasy'],
    language: 'English',
    releaseDate: '2019-05-24',
    rating: 6.9,
    imdbRating: '6.9/10',
    status: 'now_showing',
    director: 'Guy Ritchie',
    trailer: '',
  },
  {
    _id: 'm3',
    title: 'Raya and the Last Dragon',
    description: 'Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity.',
    poster: '/posters/raya and the last dragon.webp',
    backdrop: '/posters/raya and the last dragon.webp',
    duration: 107,
    genre: ['Animation', 'Action', 'Adventure', 'Fantasy'],
    language: 'English',
    releaseDate: '2021-03-05',
    rating: 7.3,
    imdbRating: '7.3/10',
    status: 'now_showing',
    director: 'Don Hall',
    trailer: '',
  },
  {
    _id: 'm4',
    title: 'Luca',
    description: 'On the Italian Riviera, an unlikely but strong friendship grows between a human being and a sea monster disguised as a human.',
    poster: '/posters/luca.webp',
    backdrop: '/posters/luca.webp',
    duration: 95,
    genre: ['Animation', 'Adventure', 'Comedy'],
    language: 'English',
    releaseDate: '2021-06-18',
    rating: 7.5,
    imdbRating: '7.5/10',
    status: 'now_showing',
    director: 'Enrico Casarosa',
    trailer: '',
  },
  {
    _id: 'm5',
    title: 'Tangled',
    description: 'The magically long-haired Rapunzel has spent her entire life in a tower, but now that a runaway thief has stumbled upon her, she is about to discover the world for the first time.',
    poster: '/posters/tangled.webp',
    backdrop: '/posters/tangled.webp',
    duration: 100,
    genre: ['Animation', 'Adventure', 'Comedy', 'Fantasy'],
    language: 'English',
    releaseDate: '2010-11-24',
    rating: 7.7,
    imdbRating: '7.7/10',
    status: 'now_showing',
    director: 'Nathan Greno',
    trailer: '',
  },
  {
    _id: 'm6',
    title: 'Coco',
    description: 'Despite his family\'s generations-old ban on music, Miguel dreams of becoming a celebrated musician like his idol Ernesto de la Cruz.',
    poster: '/posters/coco.webp',
    backdrop: '/posters/coco.webp',
    duration: 105,
    genre: ['Animation', 'Adventure', 'Family'],
    language: 'English',
    releaseDate: '2017-11-22',
    rating: 8.4,
    imdbRating: '8.4/10',
    status: 'now_showing',
    director: 'Lee Unkrich',
    trailer: '',
  },
  {
    _id: 'm7',
    title: 'Monsters, Inc.',
    description: 'Animated film that explores the world of Monstropolis, where monsters generate their city\'s power by scaring children at night.',
    poster: '/mounster.jpg',
    backdrop: '/mounster.jpg',
    duration: 92,
    genre: ['Animation', 'Comedy', 'Family'],
    language: 'English',
    releaseDate: '2001-11-02',
    rating: 8.1,
    imdbRating: '8.1/10',
    status: 'now_showing',
    director: 'Pete Docter',
    trailer: '',
  }
];

// ─── Cinemas / Halls ───
export const mockCinemas = [
  { _id: 'c1', name: 'QFX Civil Mall', location: 'Sundhara, Kathmandu', city: 'Kathmandu', address: 'Civil Mall, Sundhara', amenities: ['3D', 'Dolby', 'Parking', 'Food Court'] },
  { _id: 'c2', name: 'QFX Labim Mall', location: 'Pulchowk, Lalitpur', city: 'Lalitpur', address: 'Labim Mall, Pulchowk', amenities: ['3D', 'Cafeteria', 'Parking'] },
  { _id: 'c3', name: 'Jai Nepal Cinema', location: 'New Baneshwor, Kathmandu', city: 'Kathmandu', address: 'New Baneshwor', amenities: ['Parking', 'Food Counter'] },
];

// ─── Screens ───
export const mockScreens = [
  { _id: 'scr1', cinemaId: 'c1', screenName: 'Screen 1', screenType: '3D', rows: 7, columns: 16 },
  { _id: 'scr2', cinemaId: 'c1', screenName: 'Screen 2', screenType: 'Standard', rows: 7, columns: 16 },
  { _id: 'scr3', cinemaId: 'c2', screenName: 'Audi 1', screenType: 'Standard', rows: 7, columns: 16 },
  { _id: 'scr4', cinemaId: 'c2', screenName: 'Audi 2', screenType: '3D', rows: 7, columns: 16 },
  { _id: 'scr5', cinemaId: 'c3', screenName: 'Hall A', screenType: 'Standard', rows: 8, columns: 14 },
];

// ─── Shows ───
export const mockShows = [
  {
    _id: 's1',
    movieId: mockMovies[0],
    cinemaId: mockCinemas[0],
    screenId: { _id: 'scr1', screenName: 'Screen 1', screenType: '3D' },
    date: new Date().toISOString(),
    time: '11:45 AM',
    price: { standard: 350, premium: 500, vip: 800 }
  },
  {
    _id: 's2',
    movieId: mockMovies[0],
    cinemaId: mockCinemas[0],
    screenId: { _id: 'scr2', screenName: 'Screen 2', screenType: 'Standard' },
    date: new Date().toISOString(),
    time: '04:30 PM',
    price: { standard: 350, premium: 500, vip: 800 }
  },
  {
    _id: 's3',
    movieId: mockMovies[0],
    cinemaId: mockCinemas[1],
    screenId: { _id: 'scr3', screenName: 'Audi 1', screenType: 'Standard' },
    date: new Date().toISOString(),
    time: '02:00 PM',
    price: { standard: 400, premium: 600, vip: 900 }
  },
  {
    _id: 's4',
    movieId: mockMovies[5],
    cinemaId: mockCinemas[0],
    screenId: { _id: 'scr1', screenName: 'Screen 1', screenType: '3D' },
    date: new Date().toISOString(),
    time: '07:00 PM',
    price: { standard: 350, premium: 500, vip: 800 }
  },
  {
    _id: 's5',
    movieId: mockMovies[6],
    cinemaId: mockCinemas[2],
    screenId: { _id: 'scr5', screenName: 'Hall A', screenType: 'Standard' },
    date: new Date().toISOString(),
    time: '10:00 AM',
    price: { standard: 300, premium: 450, vip: 700 }
  },
];

// ─── Seats (generated for seat selection UI) ───
export const mockSeats = Array.from({ length: 7 * 16 }).map((_, i) => {
  const rowNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const rowIdx = Math.floor(i / 16);
  const row = rowNames[rowIdx];
  const number = (i % 16) + 1;
  let type = 'standard';
  let price = 350;

  if (row === 'A' || row === 'B') {
    type = 'vip';
    price = 800;
  } else if (row === 'C' || row === 'D') {
    type = 'premium';
    price = 500;
  }

  return {
    row,
    number,
    type,
    price,
    isBooked: Math.random() > 0.8
  };
});

// ─── Bookings ───
export const mockBookings = [];
