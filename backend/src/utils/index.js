import { randomUUID } from 'crypto';

export const nowIso = () => new Date().toISOString();
export const generateId = () => randomUUID();