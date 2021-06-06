import * as React from "react";
import logo from "../../../logo.svg";

import "./Logo.scss";

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
    return <img src={logo} className="logo spin" alt="logo" />;
};

export default Logo;
