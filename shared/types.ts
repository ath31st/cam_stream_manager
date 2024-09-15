// stream interfaces

export interface NewStreamDto {
  regionId: number;
  location: string;
  streamUrl: string;
  comment: string | null;
  responsiblePerson: string | null;
  responsiblePhone: string | null;
}

export interface UpdateStreamDto {
  id: number;
  regionId?: number;
  location?: string;
  isVisible?: boolean;
  streamUrl?: string;
  comment?: string;
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
  name?: string;
  isVisible?: boolean;
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
  name?: string;
  phone?: string;
}