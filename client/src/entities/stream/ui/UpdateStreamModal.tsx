import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { Stream, UpdateStream } from '../../../entities/stream';
import { Region } from '../../../entities/region';

interface UpdateStreamModalProps {
  visible: boolean;
  stream: Stream | null;
  regions: Region[];
  onConfirm: (values: UpdateStream) => void;
  onCancel: () => void;
}

const UpdateStreamModal: React.FC<UpdateStreamModalProps> = ({
  visible,
  stream,
  regions,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (stream) {
      form.setFieldsValue(stream);
    }
  }, [stream, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleFormSubmit = (value: UpdateStream) => {
    onConfirm(value);
    form.resetFields();
  };

  return (
    <Modal
      title="Редактировать поток"
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
        <Form.Item name="isVisible" label="Видимость" valuePropName="checked">
          <Switch checkedChildren="Виден" unCheckedChildren="Скрыт" />
        </Form.Item>
        <Form.Item name="comment" label="Комментарий">
          <Input.TextArea placeholder="Комментарий (опционально)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStreamModal;
