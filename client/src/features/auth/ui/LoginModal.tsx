import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface LoginModalProps {
  visible: boolean;
  onLogin: (username: string, password: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onLogin,
}) => {
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      onLogin(values.username, values.password);
      onClose();
    } catch (error) {
      console.error('Ошибка логина:', error);
    }
  };

  return (
    <Modal title="Вход" open={visible} onCancel={onClose} footer={null}>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя!' }]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
