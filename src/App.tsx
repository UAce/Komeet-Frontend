import React from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import './App.scss';

const { Header, Content, Footer } = Layout;

interface AppProps { }
const App: React.FC<AppProps> = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-content">
          <div className="header-with-icon">
            <h1>Create an Event</h1>
            <Tooltip placement="top" title='help'><QuestionCircleOutlined /></Tooltip>
          </div>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;
