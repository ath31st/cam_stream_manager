import { notification } from 'antd';
import { notificationDurations } from '../constants/notification.constants';

export const errorNotification = (
  message: string,
  onClose: () => void,
  description?: string,
) => {
  notification.error({
    message,
    description,
    placement: 'topRight',
    duration: notificationDurations.error,
    onClose,
  });
};
