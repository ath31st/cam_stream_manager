import { Group } from '@prisma/client';
import { GroupRepository } from '../repositories/group.repository';
import { Logger } from '../utils/logger';
import { GroupDto, NewGroupDto, UpdateGroupDto } from '@shared/types';
import { toGroupDto, toGroupDtos } from '../mappers/group.mapper';

export class GroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  private getGroup = async (id: number): Promise<Group> => {
    try {
      return await this.groupRepository.findGroup(id);
    } catch (error) {
      Logger.error(`Error finding group with id ${id}:`, error);
      throw new Error('Group not found');
    }
  };

  getGroupDto = async (id: number): Promise<GroupDto> => {
    return this.getGroup(id).then(toGroupDto);
  };

  getGroupDtos = async (): Promise<GroupDto[]> => {
    return await this.groupRepository.findGroups().then(toGroupDtos);
  };

  createGroup = async (dto: NewGroupDto): Promise<GroupDto> => {
    try {
      return await this.groupRepository.createGroup(dto).then(toGroupDto);
    } catch (error) {
      Logger.error('Error creating group:', error);
      throw new Error('Cannot create group');
    }
  };

  updateGroup = async (id: number, dto: UpdateGroupDto): Promise<GroupDto> => {
    try {
      return await this.groupRepository.updateGroup(id, dto).then(toGroupDto);
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
