import { Subject } from '../models/subjectModel';

export const seedSubjects = async () => {
  const subjects = [
    { subjectName: 'Français' },
    { subjectName: 'Arabe' },
    { subjectName: 'Mathématiques' },
    { subjectName: 'Sciences de la Vie et de la Terre (SVT)' },
    { subjectName: 'Physique-Chimie' },
    { subjectName: 'Anglais' },
    { subjectName: 'Philosophie' },
    { subjectName: 'Informatique' },
  ];

  await Subject.deleteMany({});
  await Subject.insertMany(subjects);
  console.log('Subjects seeded successfully');
};
