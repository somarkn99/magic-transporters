import express from 'express';
import { addMover, getMovers, loadMover, startMission, endMission, listCompletedMissions } from '../controllers/moverController';

const router = express.Router();

router.post('/', addMover);
router.get('/', getMovers);
router.post('/:id/load', loadMover);
router.put('/:id/start-mission', startMission);
router.put('/:id/end-mission', endMission);
router.get('/missions', listCompletedMissions);

export default router;
