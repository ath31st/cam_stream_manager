import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { playlistNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';
import { NewPlaylist } from '../../../shared/types';
import { Group } from '../../../shared/types';

interface AddPlaylistModalProps {
  groups: Group[];
  visible: boolean;
  onConfirm: (newPlaylist: NewPlaylist) => void;
  onCancel: () => void;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({
  groups,
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newPlaylist: NewPlaylist = {
          name: values.name,
          groupIds: values.groupIds || [],
        };
        onConfirm(newPlaylist);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Создание нового плейлиста</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название плейлиста"
            rules={playlistNameValidationRules}
          >
            <Input
              placeholder="Введите название плейлиста"
              autoComplete="off"
            />
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

export default AddPlaylistModal;
