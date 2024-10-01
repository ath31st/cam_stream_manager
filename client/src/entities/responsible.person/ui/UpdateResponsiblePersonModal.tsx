import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import {
  ResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../../entities/responsible.person';

interface UpdateResponsiblePersonModalProps {
  visible: boolean;
  person: ResponsiblePerson | null;
  onConfirm: (person: UpdateResponsiblePerson) => void;
  onCancel: () => void;
}

const UpdateResponsiblePersonModal: React.FC<
  UpdateResponsiblePersonModalProps
> = ({ visible, person, onConfirm, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (person) {
      form.setFieldsValue(person);
    }
  }, [person, form]);

  const handleFinish = (value: UpdateResponsiblePerson) => {
    onConfirm(value);
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      title="Редактировать ответственное лицо"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Сохранить
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
      </Form>
    </Modal>
  );
};

export default UpdateResponsiblePersonModal;
