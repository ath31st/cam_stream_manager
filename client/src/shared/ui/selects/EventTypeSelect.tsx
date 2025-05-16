import { Select } from 'antd';
import type React from 'react';
import styles from './CommonSelect.module.css';
import type { EventType } from '../../../entities/event';

interface EventTypeSelectProps {
  eventTypes: EventType[];
  value?: EventType;
  onChange?: (value: EventType | undefined) => void;
  placeholder?: string;
  id?: EventType;
}

const EventTypeSelect: React.FC<EventTypeSelectProps> = ({
  eventTypes,
  value,
  onChange,
  placeholder = 'Фильтр по типу события',
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
      {eventTypes.map((eventType) => (
        <Select.Option key={eventType} value={eventType}>
          {eventType}
        </Select.Option>
      ))}
    </Select>
  );
};

export default EventTypeSelect;
