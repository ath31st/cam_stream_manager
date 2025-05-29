import styles from '../ui/StreamItem.module.css';

const useStreamItemHandlers = (status: string, onClick: () => void) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
      onClick();
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return styles.active;
      case 'No connection':
        return styles.noConnection;
      case 'Bad connection':
        return styles.badConnection;
      default:
        return '';
    }
  };

  return {
    actions: {
      handleClick,
      handleKeyDown,
      handleStatusColor: getStatusColor,
    },
  };
};

export default useStreamItemHandlers;
