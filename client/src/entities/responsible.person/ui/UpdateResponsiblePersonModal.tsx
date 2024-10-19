import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import {
  ResponsiblePerson,
  UpdateResponsiblePerson,
} from '../../../entities/responsible.person';
import {
  phoneValidationRules,
  rpNameValidationRules,
} from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

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
      className={styles.modal}
      title={
        <p className={styles['modal-title']}>
          Редактирование ответственного лица
        </p>
      }
      open={visible}
      onCancel={onCancel}
      footer={
        <FooterModal
          onCancel={onCancel}
          onOk={() => form.submit()}
          okText="Сохранить"
        />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Имя" rules={rpNameValidationRules}>
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item name="phone" label="Телефон" rules={phoneValidationRules}>
            <Input placeholder="Введите телефон" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateResponsiblePersonModal;
