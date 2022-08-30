import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {Layout} from "antd";
import {ToastContainer} from "react-toastify";
import {HashRouter, Route, Routes} from "react-router-dom";
import Wrapper from "./components/wrapper/wrapper";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <ToastContainer/>
      <HashRouter>
        <Routes>
          <Route path={'/'} element={<Wrapper/>}>

          </Route>
        </Routes>
      </HashRouter>
    </Layout>
  )
}

ReactDom.render(<App />, mainElement);
