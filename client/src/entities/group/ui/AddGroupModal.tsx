import React from 'react';
import { Modal, Form, Input } from 'antd';
import { groupNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

interface AddGroupModalProps {
  visible: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    onConfirm(form.getFieldValue('name'));
    form.resetFields();
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Создание новой группы</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название группы"
            rules={groupNameValidationRules}
          >
            <Input placeholder="Введите название группы" autoComplete="off" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddGroupModal;
