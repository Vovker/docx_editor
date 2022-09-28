import {Button, Layout, Row} from "antd";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import {UploadDocx} from "../uploadDocx/uploadDocx";

const Wrapper = () => {


  const { Header, Content } = Layout;

  return (
    <>
      <Header style={{padding: '0 24px'}}>
        <Row align={'middle'} style={{height: '100%'}}>
          <UploadDocx/>
          <Button type="default" style={{margin: '0 20px'}}>
            <Link to={'/templates'}>Шаблоны</Link>
          </Button>
          <Button type="default" href={'/generate'}>
            <Link to={'/generate'}>Сгенерировать</Link>
          </Button>
        </Row>
      </Header>
      <Layout>
        <Content style={{padding: '20px'}}>
          <Outlet/>
        </Content>
      </Layout>
    </>
  );
}

export default Wrapper;
