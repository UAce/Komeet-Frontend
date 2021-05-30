import React, { useState } from "react";
import { Tooltip, Divider } from "antd";
import "react-infinite-calendar/styles.css"; // Make sure to import the default stylesheet
import "antd/dist/antd.css";

import { QuestionCircleOutlined } from "@ant-design/icons";
import "./CreateEvent.scss";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = () => {
    return (
        <div>
            <div className="header-with-icon">
                <h1>Create an Event</h1>
                <Tooltip placement="top" title="Create an event, what else?">
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <Divider />
            <CreateEventForm />
        </div>
    );
};

export default CreateEvent;
