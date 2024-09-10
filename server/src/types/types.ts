export interface NewStreamDto {
  location: string;
  streamUrl: string;
  comment: string | null;
  responsiblePerson: string | null;
  responsiblePhone: string | null;
}

export interface UpdateStreamDto {
  id: number;
  location?: string;
  isVisible?: boolean;
  streamUrl?: string;
  comment?: string;
  responsiblePerson?: string;
  responsiblePhone?: string;
}
