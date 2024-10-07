import { ResponsiblePerson } from '../../../entities/responsible.person';

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
