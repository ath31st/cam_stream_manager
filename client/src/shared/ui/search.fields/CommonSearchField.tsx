import styles from './CommonSearchField.module.css';

interface CommonSearchFieldProps {
  placeholder?: string;
  searchTerm: string | undefined;
  onSearchChange: (value: string) => void;
}

const CommonSearchField: React.FC<CommonSearchFieldProps> = ({
  placeholder,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <input
      className={styles['search-field']}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={placeholder || 'Поиск...'}
    />
  );
};

export default CommonSearchField;
