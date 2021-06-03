import { Skeleton, Spin } from "antd";
import React from "react";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Skeleton active />
            <Spin size="large" />
            <Skeleton active />
        </div>
    );
};

export default Loader;
