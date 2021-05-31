import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Divider, Spin } from "antd";
import "antd/dist/antd.css";

import { getExampleEvent } from "../../api/EventsApis";
import { Event, GetEventResponse } from "../../interfaces/EventInterfaces";

interface AboutProps extends RouteComponentProps {}
const About: React.FC<AboutProps> = ({ history }) => {
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: GetEventResponse = await getExampleEvent();
                setEvent(currentEvent);
                console.log(currentEvent);
            } catch (error) {
                console.error(error);
            }
        };
        getEvent();
    }, []);
    return (
        <div>
            <div className="page-title">
                <h1>About</h1>
                <Divider />
            </div>
            {event ? (
                <span>
                    See{" "}
                    <span
                        className="link clickable"
                        onClick={() => {
                            history.push(`/event/${event.id}`);
                        }}
                    >
                        Example
                    </span>{" "}
                    event
                </span>
            ) : (
                <Spin />
            )}
        </div>
    );
};

export default withRouter(About);
