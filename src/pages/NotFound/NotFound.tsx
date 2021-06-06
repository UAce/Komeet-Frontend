import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal } from "antd";
import "antd/dist/antd.css";

import "./NotFound.scss";

interface NotFoundProps extends RouteComponentProps {}
const NotFound: React.FC<NotFoundProps> = ({ history }) => {
    return (
        <Modal
            centered={true}
            visible={true}
            closable={false}
            onOk={() => history.push("/new-event")}
            okText={"Create an Event"}
            width={600}
            cancelButtonProps={{ style: { display: "none" } }}
        >
            <h2>Oops! 😵</h2>
            <p>The event you're looking for does not exist...</p>
        </Modal>
    );
};

export default withRouter(NotFound);
