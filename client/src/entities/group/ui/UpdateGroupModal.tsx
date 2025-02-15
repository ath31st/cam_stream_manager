import React, { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import { Group, UpdateGroup } from '..';
import { playlistNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

interface UpdateGroupModalProps {
  visible: boolean;
  group: Group | null;
  onConfirm: (updatedGroup: UpdateGroup) => void;
  onCancel: () => void;
}

const UpdateGroupModal: React.FC<UpdateGroupModalProps> = ({
  visible,
  group,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (group) {
      form.setFieldsValue(group);
    }
  }, [group, form]);

  const handleOk = () => {
    onConfirm(form.getFieldsValue());
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование группы</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={
        <FooterModal onCancel={onCancel} onOk={handleOk} okText="Сохранить" />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название группы"
            rules={playlistNameValidationRules}
          >
            <Input placeholder="Введите новое название группы" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateGroupModal;
