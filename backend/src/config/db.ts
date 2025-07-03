import mongoose from 'mongoose';
import { seedSubjects } from '../seeds/subjectSeeder';
import seedGrades from '../seeds/gradeSeeder';
import seedDays from '../seeds/daySeeder';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || '';

  try {
    await mongoose.connect(MONGO_URI);
    // await seedGrades();
    // await seedSubjects();
    // await seedDays();
    console.log('Mongo connect successfully 🍵');
  } catch (error) {
    console.error('Error connecting to mongo ❌: ', error);
  }
};

export default connectDB;
