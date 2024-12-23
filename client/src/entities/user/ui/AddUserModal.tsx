import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { NewUser } from '..';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';
import {
  confirmPasswordValidationRules,
  emailValidationRules,
  passwordValidationRules,
  usernameValidationRules,
} from '../../../shared/validations/lib/validation.rules';

interface AddUserModalProps {
  visible: boolean;
  onConfirm: (value: NewUser) => void;
  onCancel: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
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
        </Form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
