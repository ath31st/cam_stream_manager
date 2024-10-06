import React, { useEffect } from 'react';
import { Modal, Input, Checkbox, Form, Button } from 'antd';
import { Region, UpdateRegion } from '..';
import { regionNameValidationRules } from '../../../shared/validations';

interface UpdateRegionModalProps {
  visible: boolean;
  region: Region | null;
  onOk: (updatedRegion: UpdateRegion) => void;
  onCancel: () => void;
}

const UpdateRegionModal: React.FC<UpdateRegionModalProps> = ({
  visible,
  region,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (region) {
      form.setFieldsValue(region);
    }
  }, [region, form]);

  const handleOk = () => {
    onOk(form.getFieldsValue());
    form.resetFields();
  };

  return (
    <Modal
      title="Редактировать регион"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Сохранить
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
        <Form.Item name="isVisible" valuePropName="checked">
          <Checkbox>Видимый</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRegionModal;
