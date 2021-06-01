import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Scrollbars } from "react-custom-scrollbars";

import "./AppLayout.scss";
import AppHeader from "../AppHeader/AppHeader";

const { Content, Footer } = Layout;

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Scrollbars autoHide={true} thumbSize={200} style={{ width: "100%", height: "100vh" }}>
            <Layout>
                <AppHeader />
                <Content>
                    <div className="site-layout-content">{children}</div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Komeet ©2021 Created by UAce</Footer>
            </Layout>
        </Scrollbars>
    );
};

export default AppLayout;
