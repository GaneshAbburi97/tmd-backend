import { Appointment } from './Appointment';
import { AuditLog } from './AuditLog';
import { CBTModule } from './CBTModule';
import { CBTProgress } from './CBTProgress';
import { Exercise } from './Exercise';
import { ExerciseCompletion } from './ExerciseCompletion';
import { MoodRecord } from './MoodRecord';
import { PainRecord } from './PainRecord';
import { User } from './User';

User.hasMany(PainRecord, { foreignKey: 'userId' });
PainRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ExerciseCompletion, { foreignKey: 'userId' });
ExerciseCompletion.belongsTo(User, { foreignKey: 'userId' });
Exercise.hasMany(ExerciseCompletion, { foreignKey: 'exerciseId' });
ExerciseCompletion.belongsTo(Exercise, { foreignKey: 'exerciseId' });

User.hasMany(CBTProgress, { foreignKey: 'userId' });
CBTProgress.belongsTo(User, { foreignKey: 'userId' });
CBTModule.hasMany(CBTProgress, { foreignKey: 'moduleId' });
CBTProgress.belongsTo(CBTModule, { foreignKey: 'moduleId' });

User.hasMany(MoodRecord, { foreignKey: 'userId' });
MoodRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  PainRecord,
  Exercise,
  ExerciseCompletion,
  CBTModule,
  CBTProgress,
  MoodRecord,
  Appointment,
  AuditLog
};
