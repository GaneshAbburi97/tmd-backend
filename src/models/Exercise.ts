import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ExerciseAttributes {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string;
  videoUrl: string | null;
  isActive: boolean;
}

type ExerciseCreation = Optional<ExerciseAttributes, 'id' | 'videoUrl' | 'isActive'>;

export class Exercise extends Model<ExerciseAttributes, ExerciseCreation> implements ExerciseAttributes {
  declare id: string;
  declare title: string;
  declare description: string;
  declare category: string;
  declare difficulty: 'easy' | 'medium' | 'hard';
  declare instructions: string;
  declare videoUrl: string | null;
  declare isActive: boolean;
}

Exercise.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), allowNull: false },
    instructions: { type: DataTypes.TEXT, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    sequelize,
    modelName: 'Exercise',
    tableName: 'exercises',
    underscored: true,
    paranoid: true
  }
);
