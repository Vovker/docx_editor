import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {Layout} from "antd";
import {ToastContainer} from "react-toastify";
import {HashRouter, Route, Routes} from "react-router-dom";
import Wrapper from "./components/wrapper/wrapper";
import {TemplatesPage} from "./pages/templatesPage/templatesPage";
import {GeneratePage} from "./pages/generatePage";
import fs from "fs";
import {Provider} from "react-redux";
import {store} from "./store";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {

  if (!fs.existsSync('templates')){
    fs.mkdirSync('templates');
  }

  return (
    <Provider store={store}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <ToastContainer/>
        <HashRouter>
          <Routes>
            <Route path={'/'} element={<Wrapper/>}>
              <Route path={'/'} element={<TemplatesPage/>}/>
              <Route path={'/templates'} element={<TemplatesPage/>}/>
              <Route path={'/generate'} element={<GeneratePage/>}/>
            </Route>
          </Routes>
        </HashRouter>
      </Layout>
    </Provider>
  )
}

ReactDom.render(<App />, mainElement);
