import React from "react";
import "antd/dist/antd.css";

import PageTitle from "../../components/PageTitle/PageTitle";

interface UpdatesProps {}
const Updates: React.FC<UpdatesProps> = () => {
    return (
        <div>
            <PageTitle title="Updates" />
        </div>
    );
};

export default Updates;
