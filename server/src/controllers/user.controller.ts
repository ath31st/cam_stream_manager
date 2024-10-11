import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import {
  NewUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from '@shared/types';
import { Logger } from '../utils/logger';
import { trimObjectValues } from '../utils/trim.utils';
import {
  newUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
} from '../validators/user.validator';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const userDto = await this.userService.getUserDto(userId);
      res.status(200).json(userDto);
    } catch (error) {
      Logger.error('Error getting user:', error);
      res.status(404).json({
        message: 'User not found',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const usersDto = await this.userService.getAllUsersDto();
      res.status(200).json(usersDto);
    } catch (error) {
      Logger.error('Error getting all users:', error);
      res.status(500).json({
        message: 'Failed to retrieve users',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = newUserSchema.validate(trimmedBody);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: NewUserDto = value;
      const createdUser = await this.userService.createUser(dto);
      res.status(201).json(createdUser);
    } catch (error) {
      Logger.error('Error creating user:', error);
      res.status(400).json({
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = updateUserSchema.validate({
        id: Number(req.params.id),
        ...trimmedBody,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: UpdateUserDto = value;
      const updatedUser = await this.userService.updateUser(dto);
      res.status(200).json(updatedUser);
    } catch (error) {
      Logger.error('Error updating user:', error);
      res.status(400).json({
        message: 'Failed to update user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = updateUserPasswordSchema.validate({
        id: Number(req.params.id),
        ...trimmedBody,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: UpdateUserPasswordDto = value;
      await this.userService.changePassword(dto);
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      Logger.error('Error changing password:', error);
      res.status(400).json({
        message: 'Failed to update password',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      await this.userService.deleteUser(userId);
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      Logger.error('Error deleting user:', error);
      res.status(400).json({
        message: 'Failed to delete user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
