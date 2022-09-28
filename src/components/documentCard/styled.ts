import styled from "styled-components";

const CardWrapper = styled.div<{isSelected: boolean}>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px 15px;
  border: ${props => props.isSelected ? `2px solid #1890ff` : `1px solid #bae7ff`};
  border-radius: 5px;
  box-sizing: border-box;
  height: 40px;
  gap: 30px;
  transition: 0.5s;
  margin: 10px;
  
  &:hover {
    cursor: pointer;
    border: ${props => props.isSelected ? '2px' : '1px'} solid #1890ff;
  }
`;

const CardTitle = styled.div`
  display: flex;
  font-size: 14px;
`;

const CardIcon = styled.img`
  width: 50px;
`;

export {
  CardWrapper,
  CardIcon,
  CardTitle
}
