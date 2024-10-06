import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { regionNameValidationRules } from '../../../shared/validations';

interface AddRegionModalProps {
  visible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
}

const AddRegionModal: React.FC<AddRegionModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    onOk(form.getFieldValue('name'));
    form.resetFields();
  };

  return (
    <Modal
      title="Добавить новый регион"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Название региона"
          rules={regionNameValidationRules}
        >
          <Input placeholder="Введите название региона" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRegionModal;
