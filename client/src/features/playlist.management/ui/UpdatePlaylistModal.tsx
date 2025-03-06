import React, { useEffect } from 'react';
import { Modal, Input, Form, Switch, Select } from 'antd';
import { Playlist, UpdatePlaylist, Group } from '../../../shared/api.types';
import { playlistNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import { FooterModal } from '../../../shared';

interface UpdatePlaylistModalProps {
  groups: Group[];
  visible: boolean;
  playlist: Playlist | null;
  onConfirm: (updatedPlaylist: UpdatePlaylist) => void;
  onCancel: () => void;
}

const UpdatePlaylistModal: React.FC<UpdatePlaylistModalProps> = ({
  groups,
  visible,
  playlist,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (playlist) {
      form.setFieldsValue({
        ...playlist,
        groupIds: playlist.groupIds || [],
      });
    }
  }, [playlist, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedPlaylist: UpdatePlaylist = {
        id: playlist!.id,
        name: values.name,
        isVisible: values.isVisible,
        groupIds: values.groupIds || [],
      };
      onConfirm(updatedPlaylist);
    });
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование плейлиста</p>}
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
            label="Название плейлиста"
            rules={playlistNameValidationRules}
          >
            <Input placeholder="Введите новое название плейлиста" />
          </Form.Item>
          <Form.Item
            name="isVisible"
            label="Видимость в списке плеера"
            valuePropName="checked"
          >
            <Switch checkedChildren="Виден" unCheckedChildren="Скрыт" />
          </Form.Item>
          <Form.Item name="groupIds" label="Группы">
            <Select mode="multiple" placeholder="Выберите группы">
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdatePlaylistModal;
