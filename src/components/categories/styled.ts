import styled from "styled-components";

const CategoriesWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 10px;
`;


const CategoryWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin-bottom: 2px;
  user-select: none;
`;

const CategoryTitle = styled.div<{isActive: boolean}>`
  font-size: 18px;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
`;

const TagsWrapper = styled.div<{isVisible: boolean}>`
  margin-top: 10px;
  display: ${props => props.isVisible ? 'block' : 'none'};
  padding: 10px;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
`;

const TagWrapper = styled.div<{isSelected: boolean}>`
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  font-size: 14px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const DocxList = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
`;

export {
  CategoriesWrapper,
  CategoryWrapper,
  CategoryTitle,
  TagsWrapper,
  TagWrapper,
  DocxList
};
