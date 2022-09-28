import styled from "styled-components";
import {CardWrapper} from "../../components/documentCard/styled";

const TemplatesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 40px;
  
  ${CardWrapper}{
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

export { TemplatesWrapper };
