// stream interfaces

export interface NewStreamDto {
  regionId: number;
  location: string;
  streamUrl: string;
  comment: string | null;
  responsiblePerson: string | null;
  responsiblePhone: string | null;
}

export interface StreamDto {
  id: number;
  regionId: number;
  location: string;
  isVisible: boolean;
  streamUrl: string;
  status: string;
  comment: string | null;
}

export interface UpdateStreamDto {
  id: number;
  regionId: number;
  location: string;
  isVisible: boolean;
  streamUrl: string;
  comment: string | null;
}

// region interfaces

export interface NewRegionDto {
  name: string;
}

export interface RegionDto {
  id: number;
  name: string;
  isVisible: boolean;
}

export interface UpdateRegionDto {
  id: number;
  name: string;
  isVisible: boolean;
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

export interface RegionInfoDto {
  regionName: string;
  streams: StreamDashboardDto[];
  activeCount: number;
  noConnectionCount: number;
  badConnectionCount: number;
}

export interface StreamDashboardDto {
  id: number;
  regionId: number;
  location: string;
  status: string;
}

// user interfaces

export interface UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  registeredAt: Date;
  updatedAt: Date;
}

export interface NewUserDto {
  username: string;
  password: string;
  email?: string;
  role: string;
}

export interface UpdateUserDto {
  id: number;
  username: string;
  email?: string;
  role: string;
}

export interface UpdateUserPasswordDto {
  id: number;
  oldPassword: string;
  newPassword: string;
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
