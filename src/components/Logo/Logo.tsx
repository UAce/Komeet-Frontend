import * as React from "react";
import logo from "../../logo.svg";

import "./Logo.scss";

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
    return (
        <div className="logo">
            <img src={logo} className="spin" alt="logo" />
        </div>
    );
};

export default Logo;
