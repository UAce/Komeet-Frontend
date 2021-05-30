import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

import HeaderMenu from "../HeaderMenu/HeaderMenu";
import Logo from "../Logo/Logo";
import "./AppHeader.scss";

interface AppHeaderProps {}
const AppHeader: React.FC<AppHeaderProps> = () => {
    return (
        <Layout.Header>
            <Logo />
            <HeaderMenu />
        </Layout.Header>
    );
};

export default AppHeader;
