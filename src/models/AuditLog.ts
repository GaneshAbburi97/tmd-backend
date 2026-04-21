import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AuditLogAttributes {
  id: string;
  userId: string | null;
  entity: string;
  entityId: string;
  action: string;
  metadata: object;
}

type AuditCreation = Optional<AuditLogAttributes, 'id' | 'userId' | 'metadata'>;

export class AuditLog extends Model<AuditLogAttributes, AuditCreation> implements AuditLogAttributes {
  declare id: string;
  declare userId: string | null;
  declare entity: string;
  declare entityId: string;
  declare action: string;
  declare metadata: object;
}

AuditLog.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: true },
    entity: { type: DataTypes.STRING, allowNull: false },
    entityId: { type: DataTypes.STRING, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    metadata: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
  },
  {
    sequelize,
    modelName: 'AuditLog',
    tableName: 'audit_logs',
    underscored: true
  }
);
