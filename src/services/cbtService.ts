import { CBTModule, CBTProgress } from '../models';

export const getModules = async (): Promise<CBTModule[]> => CBTModule.findAll({ where: { isActive: true } });

export const getModuleById = async (id: string): Promise<CBTModule> => {
  const module = await CBTModule.findByPk(id);
  if (!module) {
    throw Object.assign(new Error('CBT module not found'), { status: 404 });
  }
  return module;
};

export const logModuleProgress = async (
  userId: string,
  input: { moduleId: string; completed: boolean }
): Promise<CBTProgress> => {
  await getModuleById(input.moduleId);
  const [progress] = await CBTProgress.upsert(
    {
      userId,
      moduleId: input.moduleId,
      completed: input.completed,
      completedAt: input.completed ? new Date() : null
    },
    { returning: true }
  );
  return progress;
};

export const getUserCBTProgress = async (userId: string): Promise<CBTProgress[]> =>
  CBTProgress.findAll({ where: { userId } });
