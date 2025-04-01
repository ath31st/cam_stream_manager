import type { ResponsiblePerson } from '../../../shared/api.types';

export const useFilterResponsiblePersons = (
  selectedStreamId: number | null,
  responsiblePersons: ResponsiblePerson[],
) => {
  return selectedStreamId
    ? responsiblePersons.filter(
        (person) => person.streamId === selectedStreamId,
      )
    : responsiblePersons;
};
