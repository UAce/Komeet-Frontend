import React from "react";
import { Divider, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./PageTitle.scss";

interface PageTitleProps {
    title: string;
    tooltipMessage?: string;
    [props: string]: any;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, tooltipMessage, children, ...props }) => {
    return (
        <div className="page-title" {...props}>
            <header className="title-wrapper">
                <h1>{title}</h1>
                <Tooltip placement="top" title={tooltipMessage}>
                    {tooltipMessage ? <QuestionCircleOutlined /> : <span></span>}
                </Tooltip>
            </header>

            {children}
            <Divider />
        </div>
    );
};

export default PageTitle;
