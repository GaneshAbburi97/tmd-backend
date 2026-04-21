import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  failedLoginAttempts: number;
  accountLockedUntil: Date | null;
  refreshTokenHash: string | null;
  resetPasswordTokenHash: string | null;
  resetPasswordExpiresAt: Date | null;
  emailVerificationTokenHash: string | null;
  preferences: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'isEmailVerified'
  | 'failedLoginAttempts'
  | 'accountLockedUntil'
  | 'refreshTokenHash'
  | 'resetPasswordTokenHash'
  | 'resetPasswordExpiresAt'
  | 'emailVerificationTokenHash'
  | 'preferences'
>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare firstName: string;
  declare lastName: string;
  declare isEmailVerified: boolean;
  declare failedLoginAttempts: number;
  declare accountLockedUntil: Date | null;
  declare refreshTokenHash: string | null;
  declare resetPasswordTokenHash: string | null;
  declare resetPasswordExpiresAt: Date | null;
  declare emailVerificationTokenHash: string | null;
  declare preferences: object;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    accountLockedUntil: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refreshTokenHash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordTokenHash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    emailVerificationTokenHash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferences: {
      type: DataTypes.JSONB,
      defaultValue: {},
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    underscored: true
  }
);
