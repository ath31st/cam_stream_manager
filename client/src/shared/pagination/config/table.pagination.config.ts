import { TablePaginationConfig } from "antd";

export const PaginationConfig: TablePaginationConfig  = {
  defaultCurrent: 1,
  showSizeChanger: true,
  defaultPageSize: 5,
  pageSizeOptions: ['5', '10', '15', '20'],
  position: ['bottomCenter'],
};
