import React from 'react';
import { Card } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import styles from './UnavailableStreamCard.module.css';
import { ResponsiblePerson } from '../../../entities/responsible.person';

interface UnavailableStreamCardProps {
  responsiblePersons: ResponsiblePerson[];
}

const UnavailableStreamCard: React.FC<UnavailableStreamCardProps> = ({
  responsiblePersons,
}) => (
  <Card className={styles['unavailable-card']}>
    <WarningOutlined className={styles['icon']} />
    <h2>Поток временно недоступен</h2>
    {responsiblePersons && responsiblePersons.length > 0 ? (
      <div>
        <p>Обратитесь по телефону к ответственным лицам:</p>
        <ul className={styles['responsible-list']}>
          {responsiblePersons.map((person) => (
            <li key={person.id}>
              {person.name}: <strong>{person.phone}</strong>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Ответственные лица не указаны</p>
    )}
  </Card>
);

export default UnavailableStreamCard;
