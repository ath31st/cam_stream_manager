import React, { useEffect } from 'react';
import { Modal, Input, Form, Switch } from 'antd';
import { Region, UpdateRegion } from '..';
import { regionNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import NarrowButton from '../../../shared/ui/buttons/NarrowButton';

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
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование региона</p>}
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
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название региона"
            rules={regionNameValidationRules}
          >
            <Input placeholder="Введите новое название региона" />
          </Form.Item>
          <Form.Item
            name="isVisible"
            label="Видимость в списке плеера"
            valuePropName="checked"
          >
            <Switch checkedChildren="Виден" unCheckedChildren="Скрыт" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateRegionModal;
