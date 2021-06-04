import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Divider, Spin } from "antd";
import "antd/dist/antd.css";

import { getExampleEvent } from "../../common/api/EventsApis";
import { Event, EventData } from "../../interfaces/EventInterfaces";
import PageLoader from "../../components/PageLoader/PageLoader";

interface AboutProps extends RouteComponentProps {}
const About: React.FC<AboutProps> = ({ history }) => {
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: EventData = await getExampleEvent();
                setEvent(currentEvent);
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
                            history.push(`/event/${event.eventId}`);
                        }}
                    >
                        Example
                    </span>{" "}
                    event
                </span>
            ) : (
                <PageLoader />
            )}
        </div>
    );
};

export default withRouter(About);
