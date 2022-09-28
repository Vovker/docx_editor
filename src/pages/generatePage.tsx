import React, {useEffect, useState} from "react";
import {useAppSelector} from "../hooks/useAppSelector";
import {TemplateTypes} from "../store/types/templates.types";
import fs from "fs";
import PizZip from "pizzip";
import DocxTemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module";
import {saveAs} from "file-saver";
import {Button, Form, Input} from "antd";

export const GeneratePage = () => {

  const {templates} = useAppSelector(state => state.templates);
  const [form, setForm] = useState({})
  const [docs, setDocs] = useState([])

  useEffect(() => {
    templates.map(async (template: TemplateTypes) => {
      if(template.isSelected) {
        const content = fs.readFileSync(`templates/${template.name}`, 'binary');
        const zip = new PizZip(content);
        const iModule = new InspectModule();
        new DocxTemplater(zip, { modules: [iModule] });
        const placeholders = iModule.getAllTags();
        setForm((prevState: any) => {
          return {
            ...prevState,
            ...placeholders
          }
        })
        setDocs((prevState: any) => prevState.concat(template.name))
      }
    })
  }, [templates]);

  const onFinish = (values: any) => {
    const names = templates.filter((template: TemplateTypes) => template.isSelected)

    docs.map((doc: string, index) => {
      const content = fs.readFileSync(`templates/${doc}`, 'binary');
      const zip = new PizZip(content);
      const iModule = new InspectModule();
      const data = new DocxTemplater(zip, { modules: [iModule], nullGetter() { return ''; }});
      const buf = data.render(values).getZip().generate({type: 'nodebuffer', compression: 'DEFLATE'});
      saveAs(new Blob([buf]), `${names[index].name}`);
    })
  }

  return (
    <>
      <Form
        size={'middle'}
        layout={'vertical'}
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {
          form && Object.keys(form).map((key: string) => {
            return (
              <Form.Item
                key={key}
                label={key}
                name={key}
              >
                <Input type="text"/>
              </Form.Item>
            )
          })
        }
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            Скачать
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
