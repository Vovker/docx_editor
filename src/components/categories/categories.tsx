import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {
  CategoriesWrapper,
  CategoryWrapper,
  CategoryTitle,
  TagsWrapper,
  TagWrapper,
  DocxList
} from './styled';
import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import {addCategory, addTag, deleteCategory, deleteTag, selectTag} from "../../store/actions/categories.action";
import {CategoryTypes, TagsTypes} from "../../store/types/categories.types";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {DocumentCard} from "../documentCard/documentCard";
import {TemplateTypes} from "../../store/types/templates.types";
import {deselectAll, deselectByCategory, selectByCategory} from "../../store/actions/templates.action";
import {MouseEvent} from "react";

export const Categories = () => {

  const {categories} = useAppSelector(state => state.categories);

  return (
    <CategoriesWrapper>
      <AddCategory/>
      {categories.map((category: CategoryTypes) =>
        <Category {...category} key={category.id}/>
      )}
    </CategoriesWrapper>
  );
}

const AddCategory = () => {

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = (values: { categoryName: string }) => {
    dispatch(addCategory(values.categoryName));
    form.resetFields();
  }

  return (
    <Form
      size={'middle'}
      layout={'vertical'}
      form={form}
      onFinish={onFinish}
      style={{display: 'flex', alignItems: 'flex-end'}}
    >
      <Form.Item
        label={'Новая категория'}
        name={'categoryName'}
        rules={[
          {
            required: true,
            message: 'Введите название категории'
          }
        ]}
      >
        <Input
          type={'text'}
          style={{width: '400px'}}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type={'primary'}
          htmlType={'submit'}
          style={{marginLeft: '10px'}}
        >
          Добавить
        </Button>
      </Form.Item>

    </Form>
  )
}

const Category: React.FC<CategoryTypes> = ({id, name, tags}) => {

  const [isOpened, setIsOpened] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    tags.find((tag: TagsTypes) => tag.isSelected) ? setIsActive(true) : setIsActive(false);
  }, [tags]);

  const handleSubmit = () => {
    setIsModalVisible(false);
    dispatch(deleteCategory(id));
    dispatch(deselectAll());
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handleClick = (event: MouseEvent) => {
    if(event.ctrlKey) {
      setIsModalVisible(true);
    } else {
      setIsOpened(!isOpened);
    }
  }

  return (
    <CategoryWrapper>
      <Modal
        visible={isModalVisible}
        title={'Удалить категорию?'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key={'back'} onClick={handleCancel}>Отменить</Button>,
          <Button key={'submit'} onClick={handleSubmit}>Удалить</Button>
        ]}
      >
        <p>Вы действительно хотите удалить категорию {name}?</p>
      </Modal>
      <CategoryTitle
        isActive={isActive}
        onClick={(event) => handleClick(event)}
      >
        {name}
        {isOpened ?
          <MinusOutlined
            style={{marginLeft: '10px'}}
          /> :
          <PlusOutlined
            style={{marginLeft: '10px'}}
          />
        }
      </CategoryTitle>
      <TagsWrapper isVisible={isOpened}>
        {tags.map((tag: TagsTypes) =>
          <Tag
            {...tag}
            key={tag.id}
            categoryId={id}
          />
        )}
        <AddTag categoryId={id}/>
      </TagsWrapper>
    </CategoryWrapper>
  );
}

const Tag: React.FC<TagsTypes & { categoryId: string }> = ({id, name, isSelected, categoryId}) => {

  const [isOpened, setIsOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent) => {
    if(event.shiftKey) {
      dispatch(selectTag(categoryId, id));
      !isSelected ? dispatch(selectByCategory(id)) : dispatch(deselectByCategory(id));
    }
    else {
      if(event.ctrlKey) {
        setVisible(true);
      }
      else {
        setIsOpened(prevState => !prevState);
      }
    }
  }

  const handleSubmit = async () => {
    await dispatch(deselectAll());
    await dispatch(deleteTag(categoryId, id));
    await setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const {templates} = useAppSelector(state => state.templates);
  return (
    <>
      <Modal
        visible={visible}
        title={'Удалить категорию?'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key={'back'} onClick={handleCancel}>Отменить</Button>,
          <Button key={'submit'} onClick={handleSubmit}>Удалить</Button>
        ]}
      >
        <p>Вы действительно хотите удалить категорию {name}?</p>
      </Modal>
      <TagWrapper onClick={(event) => handleClick(event)} isSelected={isSelected}>
        {name}
        {isOpened ?
          <MinusOutlined
            style={{marginLeft: '10px'}}
          /> :
          <PlusOutlined
            style={{marginLeft: '10px'}}
          />
        }
      </TagWrapper>
      {
        isOpened &&
        <DocxList>
          {templates.filter((template: TemplateTypes) => template.tags && template.tags.includes(id)).map((template: TemplateTypes) =>
            <DocumentCard name={template.name} key={template.name} isSelected={template.isSelected}/>
          )}
        </DocxList>
      }
    </>

  )
}

const AddTag: React.FC<{categoryId: string}> = ({categoryId}) => {

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = (values: { tagName: string }) => {
    dispatch(addTag(categoryId, values.tagName));
    form.resetFields();
  }

  return (
    <Form
      size={'middle'}
      layout={'vertical'}
      form={form}
      onFinish={onFinish}
      style={{display: 'flex', alignItems: 'flex-end'}}
    >
      <Form.Item
        label={'Новая подкатегория'}
        name={'tagName'}
        rules={[
          {
            required: true,
            message: 'Введите название подкатегории'
          }
        ]}
      >
        <Input
          type={'text'}
          style={{width: '400px'}}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type={'primary'}
          htmlType={'submit'}
          style={{marginLeft: '10px'}}
        >
          Добавить
        </Button>
      </Form.Item>

    </Form>
  )
}
