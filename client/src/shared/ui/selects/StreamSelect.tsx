import React from 'react';
import { Select } from 'antd';
import { Stream } from '../../../entities/stream';
import styles from './StreamSelect.module.css';

interface StreamSelectProps {
  streams: Stream[];
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  id?: string;
}

const StreamSelect: React.FC<StreamSelectProps> = ({
  streams,
  value,
  onChange,
  placeholder = 'Выберите местоположение',
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
      {streams.map((stream) => (
        <Select.Option key={stream.id} value={stream.id}>
          {stream.location}
        </Select.Option>
      ))}
    </Select>
  );
};

export default StreamSelect;
