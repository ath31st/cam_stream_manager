import { Group } from '@prisma/client';
import { GroupRepository } from '../repositories/group.repository';
import { Logger } from '../utils/logger';
import { NewGroupDto, UpdateGroupDto } from '@shared/types';

export class GroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  getGroup = async (id: number): Promise<Group> => {
    try {
      return await this.groupRepository.findGroup(id);
    } catch (error) {
      Logger.error(`Error finding group with id ${id}:`, error);
      throw new Error('Group not found');
    }
  };

  getGroups = async (): Promise<Group[]> => {
    return await this.groupRepository.findGroups();
  };

  createGroup = async (dto: NewGroupDto): Promise<Group> => {
    try {
      return await this.groupRepository.createGroup(dto);
    } catch (error) {
      Logger.error('Error creating group:', error);
      throw new Error('Cannot create group');
    }
  };

  updateGroup = async (id: number, dto: UpdateGroupDto): Promise<Group> => {
    try {
      return await this.groupRepository.updateGroup(id, dto);
    } catch (error) {
      Logger.error(`Error updating group with id ${id}:`, error);
      throw new Error('Cannot update group');
    }
  };

  deleteGroup = async (id: number): Promise<void> => {
    try {
      await this.groupRepository.deleteGroup(id);
    } catch (error) {
      Logger.error(`Error deleting group with id ${id}:`, error);
      throw new Error('Cannot delete group');
    }
  };
}
