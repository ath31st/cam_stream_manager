import { StreamService } from '../services/stream.service';
import { StreamRepository } from '../repositories/stream.repository';
import { StreamController } from '../controllers/stream.controller';
import { prismaService } from '../database/prisma.service';
import { ResponsiblePersonRepository } from '../repositories/responsible.person.repository';
import { ResponsiblePersonService } from '../services/responsible.person.service';
import { RegionRepository } from '../repositories/region.repository';
import { RegionService } from '../services/region.service';
import { RegionController } from '../controllers/region.controller';
import { ResponsiblePersonController } from '../controllers/responsible.person.controller';
import { DashboardService } from '../services/dashboard.service';
import { DashboardController } from '../controllers/dashboard.controller';

const prisma = prismaService;

const rpRepository = new ResponsiblePersonRepository(prisma.client);
const rpService = new ResponsiblePersonService(rpRepository);
const rpController = new ResponsiblePersonController(rpService);

const regionRepository = new RegionRepository(prisma.client);
const regionService = new RegionService(regionRepository);
const regionController = new RegionController(regionService);

const streamRepository = new StreamRepository(prisma.client);
const streamService = new StreamService(streamRepository);
const streamController = new StreamController(streamService, rpService);

const dashboardService = new DashboardService(regionService, streamService);
const dashboardController = new DashboardController(dashboardService);

export {
  streamController,
  streamService,
  regionController,
  rpController,
  dashboardController,
};
