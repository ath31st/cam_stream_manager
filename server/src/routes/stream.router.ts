import express from 'express';
import { StreamService } from '../services/stream.service';
import { StreamRepository } from '../repositories/stream.repository';
import { StreamController } from '../controllers/stream.controller';
import { prismaService } from '../database/prisma.service';

const prisma = prismaService;
const streamRepository = new StreamRepository(prisma.client);
const streamService = new StreamService(streamRepository);
const streamController = new StreamController(streamService);

const router = express.Router();

router.post('/streams', streamController.createStream);
router.put('/streams/:id', streamController.updateStream);
router.delete('/streams/:id', streamController.deleteStream);
router.get('/streams', streamController.getAllStreams);

export default router;
