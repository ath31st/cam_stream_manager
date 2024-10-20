import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Region } from '../../../entities/region';
import { NewStream } from '..';
import {
  optioanalPhoneValidationRules,
  optioanalRpNameValidationRules,
  streamCommentValidationRules,
  streamLocationValidationRules,
  streamUrlValidationRules,
} from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';
import RegionSelect from '../../../shared/ui/selects/RegionSelect';

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

  const validateResponsibleFields = () => {
    const responsiblePerson = form.getFieldValue('responsiblePerson');
    const responsiblePhone = form.getFieldValue('responsiblePhone');

    if (
      (responsiblePerson && !responsiblePhone) ||
      (!responsiblePerson && responsiblePhone)
    ) {
      return Promise.reject('Оба поля должны быть заполнены или оба пустыми');
    }

    return Promise.resolve();
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Создание нового потока</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="regionId"
            label="Регион"
            rules={[{ required: true, message: 'Выберите регион' }]}
          >
            <RegionSelect regions={regions} id="regionId" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Местоположение"
            rules={streamLocationValidationRules}
          >
            <Input placeholder="Введите местоположение" />
          </Form.Item>
          <Form.Item
            name="streamUrl"
            label="URL потока"
            rules={streamUrlValidationRules}
          >
            <Input placeholder="Введите URL потока" />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={streamCommentValidationRules}
          >
            <Input.TextArea placeholder="Комментарий (опционально)" />
          </Form.Item>
          <Form.Item
            name="responsiblePerson"
            label="Ответсвенное лицо"
            rules={[
              { validator: validateResponsibleFields },
              ...optioanalRpNameValidationRules,
            ]}
          >
            <Input.TextArea placeholder="Ответсвенное лицо (опционально)" />
          </Form.Item>
          <Form.Item
            name="responsiblePhone"
            label="Телефон ответственного лица"
            rules={[
              { validator: validateResponsibleFields },
              ...optioanalPhoneValidationRules,
            ]}
          >
            <Input.TextArea placeholder="Телефон ответственного лица (опционально)" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddStreamModal;
