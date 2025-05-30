import type {
  NewUserDto,
  Page,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UserDto,
} from '@shared/types';
import bcrypt from 'bcrypt';
import { toUserDto, toUserDtos } from '../mappers/user.mapper';
import type { UserRepository } from '../repositories/user.repository';
import { EventLevel, EventType, type NewEvent } from '../types/event.types';
import type { UserWithGroups } from '../types/extended.types';
import Logger from '../utils/logger';
import { UserRoles } from '../utils/user.roles';
import type { EventService } from './event.service';

export class UserService {
  private userRepository: UserRepository;
  private eventService: EventService;
  private readonly saltRounds = 10;

  constructor(userRepository: UserRepository, eventService: EventService) {
    this.userRepository = userRepository;
    this.eventService = eventService;
  }

  getUser = async (id: number): Promise<UserWithGroups> => {
    try {
      return await this.userRepository.findUser(id);
    } catch (error) {
      Logger.error(`Error finding user with id ${id}:`, error);
      throw new Error('User not found');
    }
  };

  getUserDto = async (id: number): Promise<UserDto> => {
    return await this.getUser(id).then(toUserDto);
  };

  getUserByUsername = async (username: string): Promise<UserWithGroups> => {
    try {
      return await this.userRepository.findUserByUsername(username);
    } catch (error) {
      Logger.error(`Error finding user with username ${username}:`, error);
      throw new Error('User not found');
    }
  };

  getUserByEmail = async (email: string): Promise<UserWithGroups> => {
    try {
      return await this.userRepository.findUserByEmail(email);
    } catch (error) {
      Logger.error(`Error finding user with email ${email}:`, error);
      throw new Error('User not found');
    }
  };

  private getAllUsers = async (
    pageNumber: number,
    pageSize: number,
    sortOrder: 'asc' | 'desc',
    searchTerm?: string,
  ): Promise<UserWithGroups[]> => {
    try {
      return await this.userRepository.findPageableUsers(
        pageNumber,
        pageSize,
        sortOrder,
        searchTerm,
      );
    } catch (error) {
      Logger.error('Error getting users:', error);
      throw new Error('Cannot get all users');
    }
  };

  getPageUserDtos = async (
    pageNumber: number,
    pageSize: number,
    sortOrder: 'asc' | 'desc',
    searchTerm?: string,
  ): Promise<Page<UserDto>> => {
    const totalCount = await this.userRepository.countUsers(searchTerm);
    const totalPages =
      Math.floor(totalCount / pageSize) + (totalCount % pageSize !== 0 ? 1 : 0);

    const usersDto = await this.getAllUsers(
      pageNumber,
      pageSize,
      sortOrder,
      searchTerm,
    ).then(toUserDtos);

    return {
      items: usersDto,
      totalItems: totalCount,
      totalPages: totalPages,
      currentPage: pageNumber,
      pageSize: pageSize,
    };
  };

  private existsUserByUsername = async (username: string): Promise<void> => {
    const userExists = await this.userRepository.existsUserByUsername(username);
    if (userExists) {
      throw new Error('User with this username already exists');
    }
  };

  private existsUserByEmail = async (email: string): Promise<void> => {
    const userExists = await this.userRepository.existsUserByEmail(email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
  };

  createUser = async (dto: NewUserDto): Promise<UserDto> => {
    try {
      await this.existsUserByUsername(dto.username);
      if (dto.email) {
        await this.existsUserByEmail(dto.email);
      }
      this.checkExistsRole(dto.role);

      const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);
      const createdUser = await this.userRepository
        .createUser({
          ...dto,
          password: hashedPassword,
        })
        .then(toUserDto);

      await this.logUserEvent(
        EventLevel.INFO,
        `User ${createdUser.username} created`,
      );

      return createdUser;
    } catch (error) {
      Logger.error('Error creating user:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Could not create user');
    }
  };

  updateUser = async (dto: UpdateUserDto): Promise<UserDto> => {
    try {
      const user = await this.getUser(dto.id);

      if (dto.username && dto.username !== user.username) {
        await this.existsUserByUsername(dto.username);
      }

      if (dto.email && dto.email !== user.email) {
        await this.existsUserByEmail(dto.email);
      }
      this.checkExistsRole(dto.role);

      const updatedUser = await this.userRepository
        .updateUser(dto)
        .then(toUserDto);

      await this.logUserEvent(
        EventLevel.INFO,
        `User ${updatedUser.username} updated`,
      );

      return updatedUser;
    } catch (error) {
      Logger.error('Error updating user:', error);
      throw new Error('Could not update user');
    }
  };

  changePassword = async (dto: UpdateUserPasswordDto): Promise<void> => {
    const user = await this.getUser(dto.id);

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, this.saltRounds);

    await this.userRepository.changePassword(dto.id, hashedPassword);
  };

  deleteUser = async (id: number) => {
    try {
      await this.userRepository.deleteUser(id);

      await this.logUserEvent(EventLevel.INFO, `User with id: ${id} deleted`);
    } catch (error) {
      Logger.error('Error deleting user:', error);
      throw new Error('Could not delete user');
    }
  };

  private logUserEvent = async (level: EventLevel, info: string) => {
    const event: NewEvent = { type: EventType.USER, level, info };
    await this.eventService.createEvent(event);
  };

  private checkExistsRole = (role: string) => {
    const roleExists = UserRoles[role as keyof typeof UserRoles];
    if (!roleExists) {
      throw new Error('Role does not exist');
    }
  };
}
