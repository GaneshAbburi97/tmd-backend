import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CBTProgressAttributes {
  id: string;
  userId: string;
  moduleId: string;
  completed: boolean;
  completedAt: Date | null;
}

type CBTProgressCreation = Optional<CBTProgressAttributes, 'id' | 'completed' | 'completedAt'>;

export class CBTProgress extends Model<CBTProgressAttributes, CBTProgressCreation> implements CBTProgressAttributes {
  declare id: string;
  declare userId: string;
  declare moduleId: string;
  declare completed: boolean;
  declare completedAt: Date | null;
}

CBTProgress.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    moduleId: { type: DataTypes.UUID, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    completedAt: { type: DataTypes.DATE, allowNull: true }
  },
  {
    sequelize,
    modelName: 'CBTProgress',
    tableName: 'cbt_progress',
    underscored: true
  }
);
