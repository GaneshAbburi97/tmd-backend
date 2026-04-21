import { Op, fn, col } from 'sequelize';
import { PainRecord } from '../models';
import { paginate } from '../utils/helpers';

interface PainInput {
  intensity: number;
  location: string;
  triggers: string;
  notes?: string | null;
  recordedAt?: Date;
}

export const createPainRecord = async (userId: string, input: PainInput): Promise<PainRecord> =>
  PainRecord.create({ ...input, userId });

export const listPainRecords = async (userId: string, page = 1, limit = 20): Promise<{ rows: PainRecord[]; count: number }> =>
  PainRecord.findAndCountAll({
    where: { userId },
    order: [['recordedAt', 'DESC']],
    ...paginate(page, limit)
  });

export const getPainRecord = async (id: string, userId: string): Promise<PainRecord> => {
  const record = await PainRecord.findOne({ where: { id, userId } });
  if (!record) {
    throw Object.assign(new Error('Pain record not found'), { status: 404 });
  }
  return record;
};

export const updatePainRecord = async (id: string, userId: string, input: Partial<PainInput>): Promise<PainRecord> => {
  const record = await getPainRecord(id, userId);
  await record.update(input);
  return record;
};

export const deletePainRecord = async (id: string, userId: string): Promise<void> => {
  const record = await getPainRecord(id, userId);
  await record.destroy();
};

export const painSummary = async (userId: string): Promise<object> => {
  const [total, avgIntensity] = await Promise.all([
    PainRecord.count({ where: { userId } }),
    PainRecord.findOne({
      where: { userId },
      attributes: [[fn('AVG', col('intensity')), 'avgIntensity']],
      raw: true
    })
  ]);

  return {
    totalRecords: total,
    averageIntensity: Number((avgIntensity as { avgIntensity?: string })?.avgIntensity ?? 0)
  };
};

export const painTrends = async (userId: string, days = 30): Promise<PainRecord[]> => {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return PainRecord.findAll({
    where: { userId, recordedAt: { [Op.gte]: since } },
    order: [['recordedAt', 'ASC']]
  });
};
