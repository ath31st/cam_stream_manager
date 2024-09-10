import { StreamService } from '../services/stream.service';
import { StreamRepository } from '../repositories/stream.repository';
import { StreamController } from '../controllers/stream.controller';
import { prismaService } from '../database/prisma.service';

const prisma = prismaService;
const streamRepository = new StreamRepository(prisma.client);
const streamService = new StreamService(streamRepository);
const streamController = new StreamController(streamService);

export { streamController, streamService };
