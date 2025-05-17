import { Pagination } from 'antd';
import styles from './CommonPaginationBar.module.css';

interface PaginationBarProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  handlePageChange: (pageNumber: number, pageSize: number) => void;
}

const CommonPaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  pageSize,
  totalItems,
  handlePageChange,
}) => {
  return (
    <div className={styles['pagination-container']}>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CommonPaginationBar;
