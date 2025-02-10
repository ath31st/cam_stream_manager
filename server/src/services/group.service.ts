import { Group } from '@prisma/client';
import { GroupRepository } from '../repositories/group.repository';
import { Logger } from '../utils/logger';
import { GroupDto, NewGroupDto, UpdateGroupDto } from '@shared/types';
import { toGroupDto, toGroupDtos } from '../mappers/group.mapper';
import { EventService } from './event.service';
import { EventLevel, EventType, NewEvent } from '../types/event.types';

export class GroupService {
  private groupRepository: GroupRepository;
  private eventService: EventService;

  constructor(groupRepository: GroupRepository, eventService: EventService) {
    this.groupRepository = groupRepository;
    this.eventService = eventService;
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
      const group = await this.groupRepository.createGroup(dto);

      await this.logGroupEvent(EventLevel.INFO, `Group ${group.name} created`);

      return group;
    } catch (error) {
      Logger.error('Error creating group:', error);
      throw new Error('Cannot create group');
    }
  };

  updateGroup = async (dto: UpdateGroupDto): Promise<GroupDto> => {
    try {
      const group = await this.groupRepository.updateGroup(dto);

      await this.logGroupEvent(EventLevel.INFO, `Group ${group.name} updated`);

      return group;
    } catch (error) {
      Logger.error(`Error updating group with id ${dto.id}:`, error);
      throw new Error('Cannot update group');
    }
  };

  deleteGroup = async (id: number): Promise<void> => {
    try {
      await this.groupRepository.deleteGroup(id);

      await this.logGroupEvent(EventLevel.INFO, `Group with id ${id} deleted`);
    } catch (error) {
      Logger.error(`Error deleting group with id ${id}:`, error);
      throw new Error('Cannot delete group');
    }
  };

  private logGroupEvent = async (level: EventLevel, info: string) => {
    const event: NewEvent = { type: EventType.GROUP, level, info };
    await this.eventService.createEvent(event);
  };
}
