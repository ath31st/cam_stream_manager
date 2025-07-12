import { Card } from 'antd';
import type React from 'react';
import { usePulsing } from '@/entities/event';
import type { EventDto } from '@/shared/api.types';
import { CommonTooltip, LevelBadge } from '@/shared/ui';
import styles from './EventCard.module.css';
import { formatDate } from '@/shared/common.utils';

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
      <p className={styles.timestamp}>{formatDate(createdAt)}</p>
    </Card>
  );
};

export default EventCard;
