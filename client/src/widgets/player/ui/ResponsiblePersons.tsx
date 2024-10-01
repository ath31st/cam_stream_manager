import React from 'react';
import { ResponsiblePerson } from '../../../entities/responsible.person';

interface ResponsiblePersonsProps {
  responsiblePersons: ResponsiblePerson[];
}

const ResponsiblePersons: React.FC<ResponsiblePersonsProps> = ({
  responsiblePersons,
}) => {
  return (
    <div>
      <h4>Ответственные лица:</h4>
      {responsiblePersons.length > 0 ? (
        <ul>
          {responsiblePersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет ответственных лиц</p>
      )}
    </div>
  );
};

export default ResponsiblePersons;
