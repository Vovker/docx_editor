import React, {useState} from "react";
import {
  CardWrapper,
  CardTitle,
} from './styled';
import {WordIcon} from "../../assets/wordIcon";
import {DocumentCardTypes} from "./documentCard.types";
import {deleteTemplate, selectTemplate} from "../../store/actions/templates.action";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {MouseEvent} from "react";
import {Button, Modal} from "antd";

export const DocumentCard: React.FC<DocumentCardTypes> = ({name, isSelected}) => {

  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent) => {
    if(event.ctrlKey) {
      showModal();
    }
    else {
      dispatch(selectTemplate(name));
    }
  }

  const showModal = () => {
    setVisible(true);
  }

  const handleSubmit = () => {
    dispatch(deleteTemplate(name));
    setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <>
      <Modal
        visible={visible}
        title={'Удалить шаблон?'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key={'back'} onClick={handleCancel}>Отменить</Button>,
          <Button key={'submit'} onClick={handleSubmit}>Удалить</Button>
        ]}
      >
        <p>Вы действительно хотите удалить шаблон {name}?</p>
      </Modal>
      <CardWrapper
        isSelected={isSelected}
        onClick={(event) => handleClick(event)}
      >
        <WordIcon/>
        <CardTitle>{name}</CardTitle>
      </CardWrapper>
    </>
  )
}
