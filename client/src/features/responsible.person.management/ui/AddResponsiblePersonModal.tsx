import { Form, Input, Modal } from 'antd';
import type React from 'react';
import type { NewResponsiblePerson, Stream } from '../../../shared/api.types';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal, StreamSelect } from '../../../shared/ui';
import {
  phoneValidationRules,
  rpNameValidationRules,
} from '../../../shared/validations';

interface AddResponsiblePersonModalProps {
  visible: boolean;
  onConfirm: (person: NewResponsiblePerson) => void;
  onCancel: () => void;
  streams: Stream[];
}

const AddResponsiblePersonModal: React.FC<AddResponsiblePersonModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  streams,
}) => {
  const [form] = Form.useForm<NewResponsiblePerson>();

  const handleOk = (values: NewResponsiblePerson) => {
    onConfirm(values);
    form.resetFields();
  };

  return (
    <Modal
      className={styles.modal}
      title={
        <p className={styles['modal-title']}>
          Создание нового ответственного лица
        </p>
      }
      open={visible}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={() => form.submit()} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item name="name" label="Имя" rules={rpNameValidationRules}>
            <Input placeholder="Введите имя" autoComplete="name" />
          </Form.Item>
          <Form.Item name="phone" label="Телефон" rules={phoneValidationRules}>
            <Input placeholder="Введите телефон" autoComplete="phone" />
          </Form.Item>
          <Form.Item
            name="streamId"
            label="Название"
            rules={[{ required: true, message: 'Выберите название' }]}
          >
            <StreamSelect streams={streams} id="streamId" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddResponsiblePersonModal;
