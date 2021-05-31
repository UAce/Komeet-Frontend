import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider, Skeleton, Spin } from "antd";
import { getEventById } from "../../api/eventsApis";

import { Event } from "../../interfaces/EventInterfaces";
import CustomButton from "../../components/CustomButton/CustomButton";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match }) => {
    const linkRef = useRef<HTMLSpanElement>() as MutableRefObject<HTMLSpanElement>;
    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent = await getEventById(match.params.eventId);
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
                            <span ref={linkRef} className="link">{`http://localhost:4000/event/${event.id}`}</span>
                            <CopyToClipboard text="Copy Link" content={`http://localhost:4000/event/${event.id}`} />
                        </div>
                        <Divider />
                        <p>Max Participants: {event.maxParticipants}</p>
                        <p>Timezone: {event.timezone}</p>
                        <p>Start Time: {event.startTime}</p>
                        <p>End Time: {event.endTime}</p>
                        <p>
                            {event.calendarType} selection:
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
