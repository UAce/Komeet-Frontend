import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider, Skeleton, Spin } from "antd";
import { getEventById } from "../../common/api/EventsApis";

import config from "../../common/config";
import { Event, GetEventResponse } from "../../interfaces/EventInterfaces";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match }) => {
    const linkRef = useRef<HTMLSpanElement>() as MutableRefObject<HTMLSpanElement>;
    const [event, setEvent] = useState<Event>();
    const [eventLink, setEventLink] = useState<string>("");
    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: GetEventResponse = await getEventById(match.params.eventId);
                setEvent(currentEvent);
                setEventLink(`${config.baseURL}/event/${currentEvent.id}`);
                console.log(currentEvent);
            } catch (error) {
                console.error(error);
            }
        };
        getEvent();
    }, []);
    return (
        <div>
            {!event ? (
                <>
                    <Skeleton active />
                    <Spin size="large" />
                    <Skeleton active />
                </>
            ) : (
                <>
                    <div className="page-title">
                        <h1>{event.name}</h1>
                        <span>{event.description}</span>
                        <Divider />
                        <div>
                            <span>Event Link: </span>
                            <span ref={linkRef} className="link">
                                {eventLink}
                            </span>
                            <CopyToClipboard text="Copy Link" content={eventLink} />
                        </div>
                        <Divider />
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <p>Max Participants: {event.maxParticipants}</p>
                        <p>Timezone: {event.timezone}</p>
                        <p>Start Time: {event.startTime}</p>
                        <p>End Time: {event.endTime}</p>
                        <p>
                            Selection {event.calendarType}:
                            <ul>
                                {event.selected.map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventPage;
