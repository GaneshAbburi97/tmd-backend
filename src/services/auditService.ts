import { AuditLog } from '../models';

export const writeAuditLog = async (
  entity: string,
  entityId: string,
  action: string,
  userId?: string,
  metadata: object = {}
): Promise<void> => {
  await AuditLog.create({ entity, entityId, action, userId: userId ?? null, metadata });
};
