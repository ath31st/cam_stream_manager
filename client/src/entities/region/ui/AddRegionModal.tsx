import React from 'react';
import { Modal, Form, Input } from 'antd';
import { regionNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import NarrowButton from '../../../shared/ui/buttons/NarrowButton';

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
      className={styles.modal}
      title={<p className={styles['modal-title']}>Создание нового региона</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <NarrowButton key="cancel" onClick={onCancel}>
          Отмена
        </NarrowButton>,
        <NarrowButton key="submit" onClick={handleOk}>
          Добавить
        </NarrowButton>,
      ]}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название региона"
            rules={regionNameValidationRules}
          >
            <Input placeholder="Введите название региона" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddRegionModal;
