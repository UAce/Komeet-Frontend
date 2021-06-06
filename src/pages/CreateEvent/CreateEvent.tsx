import React from "react";
import "react-infinite-calendar/styles.css"; // Make sure to import the default stylesheet
import "antd/dist/antd.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import "./CreateEvent.scss";

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = () => {
    return (
        <div>
            <PageTitle title="Create an Event" tooltipMessage="Create an event duh" />
            <CreateEventForm />
        </div>
    );
};

export default CreateEvent;
