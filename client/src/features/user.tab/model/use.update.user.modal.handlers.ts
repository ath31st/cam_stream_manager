import { Form } from 'antd';
import { useEffect } from 'react';
import type { UpdateUser, User } from '../../../shared/api.types';

const useUpdateUserModalHandlers = (
  user: User | null,
  onConfirm: (user: UpdateUser) => void,
) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleUpdateUser = () => {
    const fieldsValue = form.getFieldsValue();

    const updatedUser: UpdateUser = {
      id: user?.id || 0,
      username: fieldsValue.username,
      email: fieldsValue.email,
      role: fieldsValue.role,
      isLocked: fieldsValue.isLocked,
      groupIds: fieldsValue.groupIds || [],
    };

    onConfirm(updatedUser);
  };

  return { form, handleUpdateUser };
};

export default useUpdateUserModalHandlers;
