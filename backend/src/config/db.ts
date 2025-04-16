import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || '';

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connect successfully 🍵');
  } catch (error) {
    console.error('Error connecting to mongo ❌: ', error);
  }
};

export default connectDB;
