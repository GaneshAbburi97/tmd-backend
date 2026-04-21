import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface MoodRecordAttributes {
  id: string;
  userId: string;
  moodLevel: number;
  stressLevel: number;
  anxietyLevel: number;
  notes: string | null;
  recordedAt: Date;
}

type MoodCreation = Optional<MoodRecordAttributes, 'id' | 'notes' | 'recordedAt'>;

export class MoodRecord extends Model<MoodRecordAttributes, MoodCreation> implements MoodRecordAttributes {
  declare id: string;
  declare userId: string;
  declare moodLevel: number;
  declare stressLevel: number;
  declare anxietyLevel: number;
  declare notes: string | null;
  declare recordedAt: Date;
}

MoodRecord.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    moodLevel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
    stressLevel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
    anxietyLevel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
    notes: { type: DataTypes.TEXT, allowNull: true },
    recordedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    modelName: 'MoodRecord',
    tableName: 'mood_records',
    underscored: true,
    paranoid: true
  }
);
