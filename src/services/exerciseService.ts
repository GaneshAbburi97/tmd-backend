import { fn, col } from 'sequelize';
import { Exercise, ExerciseCompletion } from '../models';

export const getExercises = async (): Promise<Exercise[]> => Exercise.findAll({ where: { isActive: true } });

export const getExerciseById = async (id: string): Promise<Exercise> => {
  const exercise = await Exercise.findByPk(id);
  if (!exercise) {
    throw Object.assign(new Error('Exercise not found'), { status: 404 });
  }
  return exercise;
};

export const logExerciseCompletion = async (
  userId: string,
  input: { exerciseId: string; durationMinutes: number; notes?: string | null }
): Promise<ExerciseCompletion> => {
  await getExerciseById(input.exerciseId);
  return ExerciseCompletion.create({ ...input, userId });
};

export const getExerciseProgress = async (userId: string): Promise<object> => {
  const [totalCompletions, avgDuration] = await Promise.all([
    ExerciseCompletion.count({ where: { userId } }),
    ExerciseCompletion.findOne({
      where: { userId },
      attributes: [[fn('AVG', col('duration_minutes')), 'avgDuration']],
      raw: true
    })
  ]);

  return {
    totalCompletions,
    averageDurationMinutes: Number((avgDuration as { avgDuration?: string })?.avgDuration ?? 0)
  };
};

export const getRecommendedExercises = async (_userId: string): Promise<Exercise[]> =>
  Exercise.findAll({ where: { isActive: true }, limit: 5, order: [['difficulty', 'ASC']] });
