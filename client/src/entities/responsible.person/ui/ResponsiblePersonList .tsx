import React from 'react';
import listStyles from './ResponsiblePersonList.module.css';
import { ResponsiblePerson } from '../index';

interface ResponsiblePersonListProps {
  responsiblePersons: ResponsiblePerson[];
}

const ResponsiblePersonList: React.FC<ResponsiblePersonListProps> = ({
  responsiblePersons,
}) => {
  return (
    <ul className={listStyles.list}>
      {responsiblePersons.map((person) => (
        <li key={person.id} className={listStyles['list-item']}>
          <p className={listStyles['person-name']}>{person.name}</p>
          <p className={listStyles['person-phone']}>Телефон: {person.phone}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResponsiblePersonList;
