import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CBTModuleAttributes {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  estimatedMinutes: number;
  isActive: boolean;
}

type CBTModuleCreation = Optional<CBTModuleAttributes, 'id' | 'isActive'>;

export class CBTModule extends Model<CBTModuleAttributes, CBTModuleCreation> implements CBTModuleAttributes {
  declare id: string;
  declare title: string;
  declare description: string;
  declare content: string;
  declare category: string;
  declare estimatedMinutes: number;
  declare isActive: boolean;
}

CBTModule.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    estimatedMinutes: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    sequelize,
    modelName: 'CBTModule',
    tableName: 'cbt_modules',
    underscored: true,
    paranoid: true
  }
);
