import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css'


import './AppLayout.scss';
import AppHeader from '../AppHeader/AppHeader';

const { Content, Footer } = Layout;

interface AppLayoutProps {
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Layout>
            <AppHeader />
            <Content>
                <div className="site-layout-content">
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default AppLayout;
