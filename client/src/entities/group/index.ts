import { GroupDto, NewGroupDto, UpdateGroupDto } from '@shared/types';
import AddGroupModal from './ui/AddGroupModal';
import UpdateGroupModal from './ui/UpdateGroupModal';
import DeleteGroupModal from './ui/DeleteGroupModal';
import {
  fetchGroup,
  fetchGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from './api/group.api';

export { fetchGroup, fetchGroups, createGroup, updateGroup, deleteGroup };
export { AddGroupModal, UpdateGroupModal, DeleteGroupModal };

export type Group = GroupDto;
export type NewGroup = NewGroupDto;
export type UpdateGroup = UpdateGroupDto;
