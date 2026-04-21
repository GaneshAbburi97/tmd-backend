import { sequelize } from '../config/database';
import '../models';
import { CBTModule, Exercise } from '../models';

const run = async (): Promise<void> => {
  await sequelize.sync();

  await Exercise.bulkCreate([
    {
      title: 'Jaw Relaxation Stretch',
      description: 'Gentle jaw opening and closing routine',
      category: 'mobility',
      difficulty: 'easy',
      instructions: 'Open your jaw slowly, hold for 3 seconds, release.',
      videoUrl: 'https://example.com/video/jaw-relaxation'
    },
    {
      title: 'Neck and Shoulder Release',
      description: 'Stretch sequence for neck and shoulder muscles',
      category: 'stretching',
      difficulty: 'medium',
      instructions: 'Roll your shoulders and stretch lateral neck for 10 reps.'
    }
  ]);

  await CBTModule.bulkCreate([
    {
      title: 'Breathing for Jaw Tension',
      description: 'Guided breathing module',
      content: 'Inhale 4s, hold 4s, exhale 6s for 5 minutes.',
      category: 'breathing',
      estimatedMinutes: 10
    },
    {
      title: 'Stress Reframing',
      description: 'Cognitive reframing for stress triggers',
      content: 'Identify thought patterns and replace with balanced alternatives.',
      category: 'coping',
      estimatedMinutes: 12
    }
  ]);

  process.stdout.write('Seed data inserted\n');
  await sequelize.close();
};

void run();
