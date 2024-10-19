import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { Stream, UpdateStream } from '../../../entities/stream';
import { Region } from '../../../entities/region';
import {
  streamCommentValidationRules,
  streamLocationValidationRules,
  streamUrlValidationRules,
} from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import NarrowButton from '../../../shared/ui/buttons/NarrowButton';

interface UpdateStreamModalProps {
  visible: boolean;
  stream: Stream | null;
  regions: Region[];
  onConfirm: (values: UpdateStream) => void;
  onCancel: () => void;
}

const UpdateStreamModal: React.FC<UpdateStreamModalProps> = ({
  visible,
  stream,
  regions,
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
    form.resetFields();
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование потока</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <NarrowButton key="cancel" onClick={onCancel}>
          Отмена
        </NarrowButton>,
        <NarrowButton key="submit" onClick={handleOk}>
          Сохранить
        </NarrowButton>,
      ]}
    >
      <div className={styles['modal-body']}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="regionId"
            label="Регион"
            rules={[{ required: true, message: 'Выберите регион' }]}
          >
            <Select placeholder="Выберите регион">
              {regions.map((region) => (
                <Select.Option key={region.id} value={region.id}>
                  {region.name}
                </Select.Option>
              ))}
            </Select>
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
