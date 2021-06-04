import { Skeleton, Spin } from "antd";
import React from "react";

interface PageLoaderProps {}

const PageLoader: React.FC<PageLoaderProps> = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Skeleton active />
            <Spin size="large" />
            <Skeleton active />
        </div>
    );
};

export default PageLoader;
