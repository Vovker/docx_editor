import {Layout, Row} from "antd";
import React from "react";
import {Outlet} from "react-router-dom";

const Wrapper = () => {


  const { Header, Content } = Layout;

  return (
    <>
      <Header>
        <Row align={'middle'}>
          <h1 style={{color: 'white'}}>Docx manager</h1>
        </Row>
      </Header>
      <Layout>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </>
  );
}

export default Wrapper;
