import express from 'express';
import * as bizrvController from '../controllers/bizrvController.js';

const router = express.Router();

router.get('/bizrv', bizrvController.getBizrvLead);
router.post('/bizrv', bizrvController.createBizrvLead);

export default router;
