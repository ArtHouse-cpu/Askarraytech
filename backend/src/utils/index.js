const { randomUUID } = require('crypto');

const nowIso = () => new Date().toISOString();
const generateId = () => randomUUID();

module.exports = {
  nowIso,
  generateId,
};