import { Layout } from "antd";
import React from "react";

const { Footer } = Layout;

interface CustomFooterProps {}

const CustomFooter: React.FC<CustomFooterProps> = () => {
    return <Footer style={{ textAlign: "center" }}>Komeet 2021 | Created by UAce</Footer>;
};

export default CustomFooter;
