import React from 'react';
import { Modal, Form, Input } from 'antd';
import { regionNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

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
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название региона"
            rules={regionNameValidationRules}
          >
            <Input placeholder="Введите название региона" autoComplete='off' />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddRegionModal;
