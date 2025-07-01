import { Grade } from '../models/gradeModel';
import { ECycle, IGrade } from '../types/gradeTypes';

// Seeder function to populate the Grade collection
const seedGrades = async (): Promise<void> => {
  const grades: IGrade[] = [
    // PRIMAIRE cycle
    { gradeName: '1ère année primaire', cycle: ECycle.PRIMAIRE },
    { gradeName: '2ème année primaire', cycle: ECycle.PRIMAIRE },
    { gradeName: '3ème année primaire', cycle: ECycle.PRIMAIRE },
    { gradeName: '4ème année primaire', cycle: ECycle.PRIMAIRE },
    { gradeName: '5ème année primaire', cycle: ECycle.PRIMAIRE },
    { gradeName: '6ème année primaire', cycle: ECycle.PRIMAIRE },
    // COLLÈGE cycle
    { gradeName: '1ère année collège', cycle: ECycle.COLLEGE },
    { gradeName: '2ème année collège', cycle: ECycle.COLLEGE },
    { gradeName: '3ème année collège', cycle: ECycle.COLLEGE },
    // LYCÉE cycle
    { gradeName: 'Tronc Commun', cycle: ECycle.LYCEE },
    { gradeName: '1ère année Baccalauréat', cycle: ECycle.LYCEE },
    { gradeName: '2ème année Baccalauréat', cycle: ECycle.LYCEE },
  ];

  // Remove existing grades to ensure idempotency
  await Grade.deleteMany({});
  // Insert all grade documents
  await Grade.insertMany(grades);
  console.log('Grades seeded successfully');
};

export default seedGrades;
