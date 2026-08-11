import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Movie from './models/Movie.js';
import Booking from './models/Booking.js';
import Cinema from './models/Cinema.js';
import Screen from './models/Screen.js';
import Show from './models/Show.js';
import connectDB from './config/db.js';
import { movies } from './data/movies.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear all
    await Booking.deleteMany();
    await Show.deleteMany();
    await Screen.deleteMany();
    await Cinema.deleteMany();
    await Movie.deleteMany();
    await User.deleteMany();

    // Users (use create so pre-save hashes passwords)
    const adminUser = await User.create({
      name: 'Admin User', email: 'admin@cinematix.com', password: 'password', role: 'admin'
    });
    const demoUser = await User.create({
      name: 'Demo User', email: 'user@cinematix.com', password: 'password', role: 'user'
    });

    // Movies
    const createdMovies = await Movie.insertMany(movies);

    // Cinemas
    const cinemas = await Cinema.insertMany([
      { name: 'QFX Civil Mall', location: 'Sundhara, Kathmandu', city: 'Kathmandu', address: 'Civil Mall, Sundhara', amenities: ['3D', 'Dolby', 'Parking', 'Food Court'] },
      { name: 'QFX Labim Mall', location: 'Pulchowk, Lalitpur', city: 'Lalitpur', address: 'Labim Mall, Pulchowk', amenities: ['3D', 'Cafeteria', 'Parking'] },
      { name: 'Jai Nepal Cinema', location: 'New Baneshwor, Kathmandu', city: 'Kathmandu', address: 'New Baneshwor', amenities: ['Parking', 'Food Counter'] },
    ]);

    // Screens
    const screens = await Screen.insertMany([
      { cinemaId: cinemas[0]._id, screenName: 'Screen 1', screenType: '3D', rows: 7, columns: 16 },
      { cinemaId: cinemas[0]._id, screenName: 'Screen 2', screenType: 'Standard', rows: 7, columns: 16 },
      { cinemaId: cinemas[1]._id, screenName: 'Audi 1', screenType: 'Standard', rows: 7, columns: 16 },
      { cinemaId: cinemas[1]._id, screenName: 'Audi 2', screenType: '3D', rows: 7, columns: 16 },
      { cinemaId: cinemas[2]._id, screenName: 'Hall A', screenType: 'Standard', rows: 8, columns: 14 },
    ]);

    // Shows - create multiple shows for several movies across cinemas
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);

    await Show.insertMany([
      // Movie 0 (The Good Dinosaur) - 3 shows
      { movieId: createdMovies[0]._id, cinemaId: cinemas[0]._id, screenId: screens[0]._id, date: today, time: '11:45 AM', price: { standard: 350, premium: 500, vip: 800 } },
      { movieId: createdMovies[0]._id, cinemaId: cinemas[0]._id, screenId: screens[1]._id, date: today, time: '04:30 PM', price: { standard: 350, premium: 500, vip: 800 } },
      { movieId: createdMovies[0]._id, cinemaId: cinemas[1]._id, screenId: screens[2]._id, date: today, time: '02:00 PM', price: { standard: 400, premium: 600, vip: 900 } },
      // Movie 1 (Aladdin)
      { movieId: createdMovies[1]._id, cinemaId: cinemas[0]._id, screenId: screens[0]._id, date: tomorrow, time: '01:00 PM', price: { standard: 350, premium: 500, vip: 800 } },
      { movieId: createdMovies[1]._id, cinemaId: cinemas[2]._id, screenId: screens[4]._id, date: today, time: '07:00 PM', price: { standard: 300, premium: 450, vip: 700 } },
      // Movie 2 (Raya)
      { movieId: createdMovies[2]._id, cinemaId: cinemas[1]._id, screenId: screens[3]._id, date: today, time: '03:15 PM', price: { standard: 400, premium: 600, vip: 900 } },
      { movieId: createdMovies[2]._id, cinemaId: cinemas[0]._id, screenId: screens[1]._id, date: tomorrow, time: '10:00 AM', price: { standard: 350, premium: 500, vip: 800 } },
      // Movie 3 (Luca)
      { movieId: createdMovies[3]._id, cinemaId: cinemas[0]._id, screenId: screens[0]._id, date: today, time: '06:00 PM', price: { standard: 350, premium: 500, vip: 800 } },
      { movieId: createdMovies[3]._id, cinemaId: cinemas[1]._id, screenId: screens[2]._id, date: dayAfter, time: '11:00 AM', price: { standard: 400, premium: 600, vip: 900 } },
      // Movie 4 (Tangled)
      { movieId: createdMovies[4]._id, cinemaId: cinemas[2]._id, screenId: screens[4]._id, date: today, time: '09:30 PM', price: { standard: 300, premium: 450, vip: 700 } },
      // Movie 5 (Coco)
      { movieId: createdMovies[5]._id, cinemaId: cinemas[0]._id, screenId: screens[0]._id, date: today, time: '07:00 PM', price: { standard: 350, premium: 500, vip: 800 } },
      { movieId: createdMovies[5]._id, cinemaId: cinemas[1]._id, screenId: screens[3]._id, date: tomorrow, time: '04:00 PM', price: { standard: 400, premium: 600, vip: 900 } },
      // Movie 6 (Monsters Inc.)
      { movieId: createdMovies[6]._id, cinemaId: cinemas[2]._id, screenId: screens[4]._id, date: today, time: '10:00 AM', price: { standard: 300, premium: 450, vip: 700 } },
      { movieId: createdMovies[6]._id, cinemaId: cinemas[0]._id, screenId: screens[1]._id, date: today, time: '01:30 PM', price: { standard: 350, premium: 500, vip: 800 } },
    ]);

    console.log('Data Imported!');
    console.log(`Admin: admin@cinematix.com / password`);
    console.log(`User:  user@cinematix.com / password`);
    console.log(`Movies: ${createdMovies.length}, Cinemas: ${cinemas.length}, Screens: ${screens.length}, Shows: 14`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Show.deleteMany();
    await Screen.deleteMany();
    await Cinema.deleteMany();
    await Movie.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
