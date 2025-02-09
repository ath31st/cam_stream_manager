import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';
import { NewGroupDto } from '@shared/types';
import { trimObjectValues } from '../utils/trim.utils';
import {
  newGroupSchema,
  updateGroupSchema,
} from '../validators/group.validator';

export class GroupController {
  private groupService: GroupService;
  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  getGroup = async (req: Request, res: Response) => {
    try {
      const groupId = Number(req.params.id);
      const groupDto = await this.groupService.getGroupDto(groupId);
      res.status(200).json(groupDto);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(404)
          .json({ message: 'Group not found', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to get group',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  getGroups = async (req: Request, res: Response) => {
    try {
      const groupDtos = await this.groupService.getGroupDtos();
      res.status(200).json(groupDtos);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(404)
          .json({ message: 'Groups not found', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to get groups',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  createGroup = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = newGroupSchema.validate(trimmedBody);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: NewGroupDto = value;
      const groupDto = await this.groupService.createGroup(dto);
      res.status(201).json(groupDto);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Invalid request', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to create group',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  updateGroup = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = updateGroupSchema.validate({
        id: Number(req.params.id),
        ...trimmedBody,
      });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto = value;
      const groupDto = await this.groupService.updateGroup(dto);
      res.status(200).json(groupDto);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Invalid request', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to update group',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  deleteGroup = async (req: Request, res: Response) => {
    try {
      const groupId = Number(req.params.id);
      await this.groupService.deleteGroup(groupId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(404)
          .json({ message: 'Group not found', error: error.message });
      } else {
        res.status(500).json({
          message: 'Failed to delete group',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
