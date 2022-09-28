import {Button, Form, Modal, Row, TreeSelect, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import * as fs from "fs";
import {saveFile} from "../../utils/saveFile";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addTemplate} from "../../store/actions/templates.action";
import {useAppSelector} from "../../hooks/useAppSelector";
import PizZip from "pizzip";
import InspectModule from "docxtemplater/js/inspect-module";
import DocxTemplater from "docxtemplater";

export const UploadDocx = () => {

  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const props = {
    multiple: false,
    accept: '.docx',
    beforeUpload: () => {
      return false;
    },
    onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
    },
  };

  const onFinish = async (values: {files: {file: File}, categories: string[]}) => {
    const file = values.files.file;

    await saveFile(file)
      .then(() => {
        const content = fs.readFileSync(`templates/${file.name}`, 'binary');
        const zip = new PizZip(content);
        const iModule = new InspectModule();
        new DocxTemplater(zip, { modules: [iModule] });

        toast(`${file.name} успешно сохранен`, {type: 'success'})
        dispatch(addTemplate(file.name, values.categories));
      })
      .catch((e) => {
        if(e.name === "TemplateError"){
          toast(`
          Ошибка в шаблоне
          Неправильный тег: ${e.properties.errors[0].properties.context}`, {type: 'error'})
        }
        else
          toast('Что-то не так с файлом', {type: 'error'})
      })
    await form.resetFields();
    await setVisible(false);
  }

  const handleSubmit = () => {
    form.submit();
  }

  return (
    <>
      <Button onClick={showModal}>Добавить шаблон</Button>
      <Modal
        visible={visible}
        title={'Загрузка шаблонов'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key={'back'} onClick={handleCancel}>Отменить</Button>,
          <Button key={'submit'} onClick={handleSubmit}>Загрузить</Button>
        ]}
      >
        <Form
          size={'middle'}
          layout={'vertical'}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name={'files'}
            style={{width: '100%'}}
            rules={[
              {
                required: true,
                message: 'Выберите файл'
              }
            ]}
          >
            <Upload.Dragger
              {...props}
              style={{height: '70px', padding: '0 20px'}}
            >
              <Row>
                <p className="ant-upload-drag-icon" style={{marginRight: '20px'}}>
                  <InboxOutlined/>
                </p>
                <div>
                  <p className="ant-upload-text">Добавить новый шаблон</p>
                  <p className="ant-upload-hint">
                    Поддерживает только формат .docx
                  </p>
                </div>
              </Row>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <SelectCategory/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const SelectCategory = () => {
  const {categories} = useAppSelector(state => state.categories);

  return (
    <Form.Item
      name={'categories'}
      rules={[
        {
          required: true,
          message: 'Выберите категорию'
        }
      ]}
    >
      <TreeSelect
        showSearch
        style={{width: '100%'}}
        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
        placeholder="Выберите категорию"
        multiple
      >
        {categories.map(category => (
          <TreeSelect.TreeNode key={category.id} value={category.id} title={category.name} disabled={true}>
            {category.tags.map(tag => (
              <TreeSelect.TreeNode key={tag.id} value={tag.id} title={tag.name}/>
            ))}
          </TreeSelect.TreeNode>
        ))}

      </TreeSelect>
    </Form.Item>
  )
}
