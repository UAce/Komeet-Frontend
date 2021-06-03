import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider } from "antd";
import { getEventById } from "../../common/api/EventsApis";

import config from "../../common/config";
import { Event, GetEventResponse } from "../../interfaces/EventInterfaces";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import "./EventPage.scss";
import Loader from "../../components/Loader/Loader";
import SigninForm from "../../components/SigninForm/SigninForm";
import { ParticipantData } from "../../interfaces/ParticipantInterfaces";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match }) => {
    const [event, setEvent] = useState<Event>();
    const [eventLink, setEventLink] = useState<string>("");
    const [participantData, setParticipantData] = useState<ParticipantData | undefined>();
    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: GetEventResponse = await getEventById(match.params.eventId);
                setEvent(currentEvent);
                setEventLink(`${config.baseURL}/event/${currentEvent.id}`);
            } catch (error) {
                console.error(error);
            }
        };
        getEvent();
    }, [match.params.eventId]);
    return (
        <div>
            {!event ? (
                <Loader />
            ) : (
                <>
                    <div className="page-title">
                        <h1>{event.name}</h1>
                        {event.description ? <span className="description">{event.description}</span> : <></>}
                        <CopyToClipboard text="Copy Event Link" content={eventLink} />
                    </div>
                    <Divider />
                    <div className="event-page-container" style={{ textAlign: "left" }}>
                        <div className="event-page-subcontainer">
                            {!participantData ? (
                                <SigninForm setParticipantData={setParticipantData} />
                            ) : (
                                <div style={{ textAlign: "left" }}>
                                    <p>Todo:// User's Availability</p>
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
                            )}
                        </div>
                        <div className="event-page-subcontainer">Todo:// Group's Availability</div>
                    </div>
                    <Divider />
                </>
            )}
        </div>
    );
};

export default EventPage;
