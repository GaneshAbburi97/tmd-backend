import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PainRecordAttributes {
  id: string;
  userId: string;
  intensity: number;
  location: string;
  triggers: string;
  notes: string | null;
  recordedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type PainCreationAttributes = Optional<PainRecordAttributes, 'id' | 'notes' | 'recordedAt'>;

export class PainRecord extends Model<PainRecordAttributes, PainCreationAttributes> implements PainRecordAttributes {
  declare id: string;
  declare userId: string;
  declare intensity: number;
  declare location: string;
  declare triggers: string;
  declare notes: string | null;
  declare recordedAt: Date;
}

PainRecord.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    intensity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 10 } },
    location: { type: DataTypes.STRING, allowNull: false },
    triggers: { type: DataTypes.TEXT, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    recordedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    modelName: 'PainRecord',
    tableName: 'pain_records',
    paranoid: true,
    underscored: true
  }
);
