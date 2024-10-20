import React from 'react';
import { Select } from 'antd';
import { Region } from '../../../entities/region';
import styles from './RegionSelect.module.css';

interface RegionSelectProps {
  regions: Region[];
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  id?: string;
}

const RegionSelect: React.FC<RegionSelectProps> = ({
  regions,
  value,
  onChange,
  placeholder = 'Выберите регион',
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
      {regions.map((region) => (
        <Select.Option key={region.id} value={region.id}>
          {region.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default RegionSelect;
