import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AppointmentAttributes {
  id: string;
  userId: string;
  providerName: string;
  providerSpecialty: string;
  appointmentAt: Date;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reminderMinutesBefore: number | null;
  notes: string | null;
}

type AppointmentCreation = Optional<AppointmentAttributes, 'id' | 'status' | 'reminderMinutesBefore' | 'notes'>;

export class Appointment extends Model<AppointmentAttributes, AppointmentCreation> implements AppointmentAttributes {
  declare id: string;
  declare userId: string;
  declare providerName: string;
  declare providerSpecialty: string;
  declare appointmentAt: Date;
  declare reason: string;
  declare status: 'scheduled' | 'completed' | 'cancelled';
  declare reminderMinutesBefore: number | null;
  declare notes: string | null;
}

Appointment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    providerName: { type: DataTypes.STRING, allowNull: false },
    providerSpecialty: { type: DataTypes.STRING, allowNull: false },
    appointmentAt: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'), defaultValue: 'scheduled', allowNull: false },
    reminderMinutesBefore: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 5 } },
    notes: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    underscored: true,
    paranoid: true
  }
);
