import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { NewResponsiblePerson } from '../../../entities/responsible.person';
import { Stream } from '../../../entities/stream';
import { StreamSelect } from '../../../shared/StreamSelect';

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

  const handleFinish = (values: NewResponsiblePerson) => {
    onConfirm(values);
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      title="Добавить ответственное лицо"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: 'Введите телефон' }]}
        >
          <Input placeholder="Телефон" />
        </Form.Item>
        <Form.Item
          name="streamId"
          label="Местоположение"
          rules={[{ required: true, message: 'Выберите местоположение' }]}
        >
          <StreamSelect streams={streams} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddResponsiblePersonModal;
