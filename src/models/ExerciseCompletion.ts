import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ExerciseCompletionAttributes {
  id: string;
  userId: string;
  exerciseId: string;
  completedAt: Date;
  durationMinutes: number;
  notes: string | null;
}

type ExerciseCompletionCreation = Optional<ExerciseCompletionAttributes, 'id' | 'notes' | 'completedAt'>;

export class ExerciseCompletion
  extends Model<ExerciseCompletionAttributes, ExerciseCompletionCreation>
  implements ExerciseCompletionAttributes
{
  declare id: string;
  declare userId: string;
  declare exerciseId: string;
  declare completedAt: Date;
  declare durationMinutes: number;
  declare notes: string | null;
}

ExerciseCompletion.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    exerciseId: { type: DataTypes.UUID, allowNull: false },
    completedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    durationMinutes: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    notes: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    sequelize,
    modelName: 'ExerciseCompletion',
    tableName: 'exercise_completions',
    underscored: true
  }
);
