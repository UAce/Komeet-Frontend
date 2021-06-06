import React from "react";
import "antd/dist/antd.css";

import PageTitle from "../../components/PageTitle/PageTitle";

interface AboutProps {}
const About: React.FC<AboutProps> = () => {
    return (
        <div>
            <PageTitle title="About" />
        </div>
    );
};

export default About;
