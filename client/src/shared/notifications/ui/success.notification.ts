import { notification } from 'antd';
import { notificationDurations } from '../constants/notification.constants';

export const successNotification = (message: string, description?: string) => {
  notification.success({
    message,
    description,
    placement: 'topRight',
    duration: notificationDurations.success,
  });
};
