import { Form, Input, Modal } from 'antd';
import type React from 'react';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared/ui';

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
  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      onLogin(values.username, values.password);
      onClose();
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Вход</p>}
      open={visible}
      onCancel={onClose}
      footer={
        <FooterModal
          onCancel={onClose}
          onOk={handleLogin}
          cancelText="Отмена"
          okText="Войти"
        />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} onFinish={handleLogin}>
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
        </Form>
      </div>
    </Modal>
  );
};

export default LoginModal;
