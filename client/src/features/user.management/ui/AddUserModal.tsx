import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { NewUser, Group } from '../../../shared/api.types';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared';
import {
  confirmPasswordValidationRules,
  emailValidationRules,
  passwordValidationRules,
  usernameValidationRules,
} from '../../../shared/validations';

interface AddUserModalProps {
  groups: Group[];
  visible: boolean;
  onConfirm: (value: NewUser) => void;
  onCancel: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  groups,
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newUser: NewUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        role: values.role,
        groupIds: values.groupIds || [],
      };
      onConfirm(newUser);
      form.resetFields();
    });
  };

  const handleFormSubmit = (value: NewUser) => {
    onConfirm(value);
    form.resetFields();
  };

  return (
    <Modal
      className={styles.modal}
      title={
        <p className={styles['modal-title']}>Создание нового пользователя</p>
      }
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="username"
            label="Логин"
            rules={usernameValidationRules}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={passwordValidationRules}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Повторите пароль"
            dependencies={['password']}
            rules={confirmPasswordValidationRules.map((rule) =>
              typeof rule === 'function' ? rule(form) : rule,
            )}
          >
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={emailValidationRules}>
            <Input placeholder="Введите email (опционально)" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: 'Выберите роль' }]}
          >
            <Select placeholder="Выберите роль">
              <Select.Option value="ADMIN">Администратор</Select.Option>
              <Select.Option value="USER">Пользователь</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="groupIds" label="Группы">
            <Select mode="multiple" placeholder="Выберите группы">
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
