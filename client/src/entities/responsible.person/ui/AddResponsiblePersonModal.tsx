import React from 'react';
import { Modal, Form, Input } from 'antd';
import { NewResponsiblePerson } from '../../../entities/responsible.person';
import { Stream } from '../../../entities/stream';
import StreamSelect from '../../../shared/ui/selects/StreamSelect';
import {
  phoneValidationRules,
  rpNameValidationRules,
} from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

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
            <Input placeholder="Введите телефон" autoComplete="phone"/>
          </Form.Item>
          <Form.Item
            name="streamId"
            label="Местоположение"
            rules={[{ required: true, message: 'Выберите местоположение' }]}
          >
            <StreamSelect streams={streams} id="streamId" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddResponsiblePersonModal;
