import { Form, Input, Modal } from 'antd';
import type React from 'react';
import type { NewStream, Playlist } from '../../../shared/api.types';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal, PlaylistSelect } from '../../../shared/ui';
import {
  optionalPhoneValidationRules,
  optionalRpNameValidationRules,
  streamCommentValidationRules,
  streamNameValidationRules,
  streamUrlValidationRules,
} from '../../../shared/validations';

interface AddStreamModalProps {
  visible: boolean;
  playlists: Playlist[];
  onConfirm: (value: NewStream) => void;
  onCancel: () => void;
}

const AddStreamModal: React.FC<AddStreamModalProps> = ({
  visible,
  playlists,
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
            name="playlistId"
            label="Плейлист"
            rules={[{ required: true, message: 'Выберите плейлист' }]}
          >
            <PlaylistSelect playlists={playlists} id="playlistId" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Название"
            rules={streamNameValidationRules}
          >
            <Input placeholder="Введите название" />
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
              ...optionalRpNameValidationRules,
            ]}
          >
            <Input.TextArea placeholder="Ответсвенное лицо (опционально)" />
          </Form.Item>
          <Form.Item
            name="responsiblePhone"
            label="Телефон ответственного лица"
            rules={[
              { validator: validateResponsibleFields },
              ...optionalPhoneValidationRules,
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
