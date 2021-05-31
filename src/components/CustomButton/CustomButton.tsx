import React from "react";
import { Button } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";

import "./CustomButton.scss";

interface CustomButtonProps extends NativeButtonProps {
    text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...buttonProps }) => {
    return (
        <Button className="custom-button" type="primary" {...buttonProps}>
            {text}
        </Button>
    );
};

export default CustomButton;
