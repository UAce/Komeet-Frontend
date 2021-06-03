import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Scrollbars } from "react-custom-scrollbars";

import "./AppLayout.scss";
import AppHeader from "../AppHeader/AppHeader";
import CustomFooter from "../CustomFooter/CustomFooter";

const { Content } = Layout;

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Scrollbars autoHide={true} thumbSize={200} style={{ width: "100%", height: "100vh" }}>
            <Layout>
                <AppHeader />
                <Content>
                    <div className="site-layout-content">{children}</div>
                </Content>
                <CustomFooter />
            </Layout>
        </Scrollbars>
    );
};

export default AppLayout;
