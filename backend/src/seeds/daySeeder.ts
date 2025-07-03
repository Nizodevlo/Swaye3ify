import { Day } from '../models/dayModel';
import { EDay, IDay } from '../types/sessionTypes';

const seedDays = async (): Promise<void> => {
  const days: IDay[] = [
    { day: EDay.MONDAY },
    { day: EDay.TUESDAY },
    { day: EDay.WEDNESDAY },
    { day: EDay.THURSDAY },
    { day: EDay.FRIDAY },
    { day: EDay.SATURDAY },
    { day: EDay.SUNDAY },
  ];

  await Day.deleteMany({});

  await Day.insertMany(days);

  console.log('Days seeded successfully');
};

export default seedDays;
