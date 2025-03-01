import { GroupDto, NewGroupDto, UpdateGroupDto } from '@shared/types';
import AddGroupModal from './ui/AddGroupModal';
import UpdateGroupModal from './ui/UpdateGroupModal';
import DeleteGroupModal from './ui/DeleteGroupModal';

export { AddGroupModal, UpdateGroupModal, DeleteGroupModal };
export { useGroupStore } from './model/group.store';

export type Group = GroupDto;
export type NewGroup = NewGroupDto;
export type UpdateGroup = UpdateGroupDto;
