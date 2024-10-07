import { notification } from 'antd';
import { notificationDurations } from '../constants/notification.constants';

export const successNotification = (
  message: string,
  onClose: () => void,
  description?: string,
) => {
  notification.success({
    message,
    description,
    placement: 'topRight',
    duration: notificationDurations.success,
    onClose,
  });
};
