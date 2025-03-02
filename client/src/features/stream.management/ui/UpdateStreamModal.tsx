import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { Stream, UpdateStream, Playlist } from '../../../shared/types';
import {
  streamCommentValidationRules,
  streamNameValidationRules,
  streamUrlValidationRules,
} from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';

interface UpdateStreamModalProps {
  visible: boolean;
  stream: Stream | null;
  playlists: Playlist[];
  onConfirm: (values: UpdateStream) => void;
  onCancel: () => void;
}

const UpdateStreamModal: React.FC<UpdateStreamModalProps> = ({
  visible,
  stream,
  playlists,
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
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование потока</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={
        <FooterModal onCancel={onCancel} onOk={handleOk} okText="Сохранить" />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="playlistId"
            label="Плейлист"
            rules={[{ required: true, message: 'Выберите плейлист' }]}
          >
            <Select placeholder="Выберите плейлист">
              {playlists.map((playlist) => (
                <Select.Option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </Select.Option>
              ))}
            </Select>
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
            name="isVisible"
            label="Видимость в списке плеера"
            valuePropName="checked"
          >
            <Switch checkedChildren="Виден" unCheckedChildren="Скрыт" />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={streamCommentValidationRules}
          >
            <Input.TextArea placeholder="Комментарий (опционально)" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateStreamModal;
