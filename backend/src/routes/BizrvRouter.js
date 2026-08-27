import express from 'express';
import * as bizrvController from '../controllers/bizrvController.js';
import * as bizrvCheckoutController from '../controllers/bizrvCheckoutController.js';

const router = express.Router();

router.get('/bizrv', bizrvController.getBizrvLead);
router.post('/bizrv', bizrvController.createBizrvLead);
router.post('/bizrv/checkout', bizrvCheckoutController.checkoutBizrvWorkspace);
router.post('/bizrv/verify', bizrvCheckoutController.verifyBizrvPayment);

export default router;
