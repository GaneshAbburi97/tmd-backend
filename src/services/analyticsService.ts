import { getExerciseProgress } from './exerciseService';
import { getMoodAnalytics } from './moodService';
import { painSummary, painTrends } from './painService';

export const getDashboardSummary = async (userId: string): Promise<object> => {
  const [pain, exercise, mood] = await Promise.all([
    painSummary(userId),
    getExerciseProgress(userId),
    getMoodAnalytics(userId)
  ]);
  return { pain, exercise, mood };
};

export const getPainTrendAnalytics = async (userId: string): Promise<object> => ({
  trends: await painTrends(userId, 90)
});

export const getExerciseStats = async (userId: string): Promise<object> => getExerciseProgress(userId);

export const getMoodPainCorrelation = async (userId: string): Promise<object> => ({
  mood: await getMoodAnalytics(userId),
  pain: await painSummary(userId)
});

export const generateHealthReport = async (userId: string): Promise<object> => ({
  generatedAt: new Date().toISOString(),
  dashboard: await getDashboardSummary(userId)
});

export const exportUserData = async (userId: string): Promise<object> => ({
  format: 'json',
  data: await generateHealthReport(userId)
});
