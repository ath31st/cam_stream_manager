import { StreamService } from '../services/stream.service';
import { StreamRepository } from '../repositories/stream.repository';
import { StreamController } from '../controllers/stream.controller';
import { prismaService } from '../database/prisma.service';
import { ResponsiblePersonRepository } from '../repositories/responsible.person.repository';
import { ResponsiblePersonService } from '../services/responsible.person.service';
import { PlaylistRepository } from '../repositories/playlist.repository';
import { PlaylistService } from '../services/playlist.service';
import { PlaylistController } from '../controllers/playlist.controller';
import { ResponsiblePersonController } from '../controllers/responsible.person.controller';
import { DashboardService } from '../services/dashboard.service';
import { DashboardController } from '../controllers/dashboard.controller';
import { EventService } from '../services/event.service';
import { EventRepository } from '../repositories/event.repository';
import { EventController } from '../controllers/event.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { RefreshTokenRepository } from '../repositories/refresh.token.repository';
import { RefreshTokenService } from '../services/refresh.token.service';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { GroupRepository } from '../repositories/group.repository';
import { GroupService } from '../services/group.service';
import { GroupController } from '../controllers/group.controller';

const prisma = prismaService;

const eventRepository = new EventRepository(prisma.client);
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

const userRepository = new UserRepository(prisma.client);
const userService = new UserService(userRepository, eventService);
const userController = new UserController(userService);

const groupRepository = new GroupRepository(prisma.client);
const groupService = new GroupService(groupRepository, eventService);
const groupController = new GroupController(groupService);

const refreshTokenRepository = new RefreshTokenRepository(prisma.client);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);

const authService = new AuthService(userService, refreshTokenService);
const authController = new AuthController(authService);

const rpRepository = new ResponsiblePersonRepository(prisma.client);
const rpService = new ResponsiblePersonService(rpRepository, eventService);
const rpController = new ResponsiblePersonController(rpService);

const playlistRepository = new PlaylistRepository(prisma.client);
const playlistService = new PlaylistService(playlistRepository, eventService);
const playlistController = new PlaylistController(playlistService);

const streamRepository = new StreamRepository(prisma.client);
const streamService = new StreamService(streamRepository, eventService);
const streamController = new StreamController(streamService, rpService);

const dashboardService = new DashboardService(playlistService, streamService);
const dashboardController = new DashboardController(dashboardService);

export {
  streamController,
  streamService,
  playlistController,
  rpController,
  dashboardController,
  eventController,
  groupController,
  userService,
  userController,
  authController,
};
