import { Select } from 'antd';
import type React from 'react';
import styles from './EventLevelSelect.module.css';
import type { EventLevel } from '../../../entities/event';

interface EventLevelSelectProps {
  eventLevels: EventLevel[];
  value?: EventLevel;
  onChange?: (value: EventLevel | undefined) => void;
  placeholder?: string;
  id?: EventLevel;
}

const EventLevelSelect: React.FC<EventLevelSelectProps> = ({
  eventLevels,
  value,
  onChange,
  placeholder = 'Фильтр по уровню события',
  id,
}) => {
  return (
    <Select
      id={id}
      className={styles['search-select-field']}
      showSearch
      allowClear
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {eventLevels.map((eventLevel) => (
        <Select.Option key={eventLevel} value={eventLevel}>
          {eventLevel}
        </Select.Option>
      ))}
    </Select>
  );
};

export default EventLevelSelect;
