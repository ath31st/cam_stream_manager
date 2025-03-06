import React from 'react';
import { EventDto } from '../../../shared/api.types';
import { Card } from 'antd';
import LevelBadge from './LevelBadge';
import styles from './EventCard.module.css';
import { CommonTooltip } from '../../../shared';
import usePulsing from '../../../entities/event/lib/usePulsing';

const EventCard: React.FC<EventDto> = ({ type, level, info, createdAt }) => {
  const isPulsing = usePulsing(createdAt);

  return (
    <Card
      title={`Категория: ${type}`}
      className={`${styles.card} ${isPulsing ? styles.pulse : ''}`}
      styles={{
        header: { minHeight: 30, paddingLeft: 8, fontSize: 14 },
        body: {
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
        },
      }}
    >
      <LevelBadge level={level} />
      <CommonTooltip title={info} placement="left">
        <p className={styles.info}>{info}</p>
      </CommonTooltip>
      <p className={styles.timestamp}>{new Date(createdAt).toLocaleString()}</p>
    </Card>
  );
};

export default EventCard;
