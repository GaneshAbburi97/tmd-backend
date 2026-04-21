import { Op, fn, col } from 'sequelize';
import { MoodRecord, PainRecord } from '../models';

export const createMoodRecord = async (
  userId: string,
  input: { moodLevel: number; stressLevel: number; anxietyLevel: number; notes?: string | null }
): Promise<MoodRecord> => MoodRecord.create({ ...input, userId });

export const getMoodHistory = async (userId: string): Promise<MoodRecord[]> =>
  MoodRecord.findAll({ where: { userId }, order: [['recordedAt', 'DESC']] });

export const getMoodAnalytics = async (userId: string): Promise<object> => {
  const [stats, recentPain] = await Promise.all([
    MoodRecord.findOne({
      where: { userId },
      attributes: [
        [fn('AVG', col('mood_level')), 'avgMood'],
        [fn('AVG', col('stress_level')), 'avgStress'],
        [fn('AVG', col('anxiety_level')), 'avgAnxiety']
      ],
      raw: true
    }),
    PainRecord.findAll({
      where: { userId, recordedAt: { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      attributes: ['intensity']
    })
  ]);

  return {
    averageMood: Number((stats as { avgMood?: string })?.avgMood ?? 0),
    averageStress: Number((stats as { avgStress?: string })?.avgStress ?? 0),
    averageAnxiety: Number((stats as { avgAnxiety?: string })?.avgAnxiety ?? 0),
    recentPainAverage:
      recentPain.length > 0 ? recentPain.reduce((sum, record) => sum + record.intensity, 0) / recentPain.length : 0
  };
};
