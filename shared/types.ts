// stream interfaces

export interface NewStreamDto {
  playlistId: number;
  name: string;
  streamUrl: string;
  comment: string | null;
  responsiblePerson: string | null;
  responsiblePhone: string | null;
}

export interface StreamDto {
  id: number;
  playlistId: number;
  name: string;
  isVisible: boolean;
  streamUrl: string;
  status: string;
  comment: string | null;
}

export interface UpdateStreamDto {
  id: number;
  playlistId: number;
  name: string;
  isVisible: boolean;
  streamUrl: string;
  comment: string | null;
}

// playlist interfaces

export interface NewPlaylistDto {
  name: string;
  groupIds: number[];
}

export interface PlaylistDto {
  id: number;
  name: string;
  isVisible: boolean;
  groupIds: number[];
}

export interface UpdatePlaylistDto {
  id: number;
  name: string;
  isVisible: boolean;
  groupIds: number[];
}

// responsible person interfaces

export interface NewResponsiblePersonDto {
  name: string;
  phone: string;
  streamId: number;
}

export interface ResponsiblePersonDto {
  id: number;
  name: string;
  phone: string;
  streamId: number;
}

export interface UpdateResponsiblePersonDto {
  id: number;
  name: string;
  phone: string;
}

// dashboard interfaces

export interface PlaylistInfoDto {
  playlistName: string;
  streams: StreamDashboardDto[];
  activeCount: number;
  noConnectionCount: number;
  badConnectionCount: number;
}

export interface StreamDashboardDto {
  id: number;
  playlistId: number;
  name: string;
  status: string;
}

// user interfaces

export interface UserDto {
  id: number;
  username: string;
  email: string | null;
  role: string;
  isLocked: boolean;
  registeredAt: Date;
  updatedAt: Date;
  groupIds: number[];
}

export interface NewUserDto {
  username: string;
  password: string;
  email: string | null;
  role: string;
  groupIds: number[];
}

export interface UpdateUserDto {
  id: number;
  username: string;
  email: string | null;
  role: string;
  isLocked: boolean;
  groupIds: number[];
}

export interface UpdateUserPasswordDto {
  id: number;
  oldPassword: string;
  newPassword: string;
}

// group interfaces

export interface GroupDto {
  id: number;
  name: string;
}

export interface NewGroupDto {
  name: string;
}

export interface UpdateGroupDto {
  id: number;
  name: string;
}

// auth interfaces

export interface LoginDto {
  username: string;
  password: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

// event interfaces

export interface EventDto {
  id: number;
  type: string;
  level: string;
  info: string;
  createdAt: Date;
}

export interface Page<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
