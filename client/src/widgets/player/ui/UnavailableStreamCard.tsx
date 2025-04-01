import { WarningOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import type React from 'react';
import type { ResponsiblePerson } from '../../../shared/api.types';
import { ResponsiblePersonList } from '../../responsible.person';
import styles from './UnavailableStreamCard.module.css';

interface UnavailableStreamCardProps {
  responsiblePersons: ResponsiblePerson[];
}

const UnavailableStreamCard: React.FC<UnavailableStreamCardProps> = ({
  responsiblePersons,
}) => (
  <Card className={styles['unavailable-card']}>
    <WarningOutlined className={styles.icon} />
    <h2>Поток временно недоступен</h2>
    {responsiblePersons && responsiblePersons.length > 0 ? (
      <div>
        <p>Обратитесь по телефону к ответственным лицам:</p>
        <ResponsiblePersonList responsiblePersons={responsiblePersons} />
      </div>
    ) : (
      <p>Ответственные лица не указаны</p>
    )}
  </Card>
);

export default UnavailableStreamCard;
