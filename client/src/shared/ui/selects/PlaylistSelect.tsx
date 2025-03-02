import React from 'react';
import { Select } from 'antd';
import { Playlist } from '../../api.types';
import styles from './PlaylistSelect.module.css';

interface PlaylistSelectProps {
  playlists: Playlist[];
  value?: number;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  id?: string;
}

const PlaylistSelect: React.FC<PlaylistSelectProps> = ({
  playlists,
  value,
  onChange,
  placeholder = 'Выберите плейлист',
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
      {playlists.map((playlist) => (
        <Select.Option key={playlist.id} value={playlist.id}>
          {playlist.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default PlaylistSelect;
