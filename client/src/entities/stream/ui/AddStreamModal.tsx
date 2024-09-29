import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Region } from '../../../entities/region';
import { NewStream } from '..';

interface AddStreamModalProps {
  visible: boolean;
  regions: Region[];
  onConfirm: (value: NewStream) => void;
  onCancel: () => void;
}

const AddStreamModal: React.FC<AddStreamModalProps> = ({
  visible,
  regions,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleFormSubmit = (value: NewStream) => {
    onConfirm(value);
    form.resetFields();
  };

  return (
    <Modal
      title="Добавить новый поток"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
          name="regionId"
          label="Регион"
          rules={[{ required: true, message: 'Выберите регион' }]}
        >
          <Select placeholder="Выберите регион">
            {regions.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="Местоположение"
          rules={[{ required: true, message: 'Введите местоположение' }]}
        >
          <Input placeholder="Введите местоположение" />
        </Form.Item>
        <Form.Item
          name="streamUrl"
          label="URL стрима"
          rules={[{ required: true, message: 'Введите URL стрима' }]}
        >
          <Input placeholder="Введите URL стрима" />
        </Form.Item>
        <Form.Item name="comment" label="Комментарий">
          <Input.TextArea placeholder="Комментарий (опционально)" />
        </Form.Item>
        <Form.Item name="responsiblePerson" label="Ответсвенное лицо">
          <Input.TextArea placeholder="Ответсвенное лицо (опционально)" />
        </Form.Item>
        <Form.Item name="responsiblePhone" label="Телефон ответственного лица">
          <Input.TextArea placeholder="Телефон ответственного лица (опционально)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStreamModal;
