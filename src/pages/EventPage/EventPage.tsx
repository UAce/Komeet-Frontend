import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider } from "antd";

// import config from "../../common/config";
import { Event, EventData } from "../../interfaces/EventInterfaces";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import { getEventById } from "../../common/api/EventsApis";
import PageLoader from "../../components/PageLoader/PageLoader";
import SigninForm from "../../components/SigninForm/SigninForm";
import { ParticipantData } from "../../interfaces/SigninInterfaces";
import "./EventPage.scss";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match }) => {
    const [event, setEvent] = useState<Event>();
    const [eventLink, setEventLink] = useState<string>("");
    const [participantData, setParticipantData] = useState<ParticipantData | undefined>();
    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: EventData = await getEventById(match.params.eventId);
                setEvent(currentEvent);
                setEventLink(`${window.location.origin}/event/${currentEvent.eventId}`);
            } catch (error) {
                console.error(error);
            }
        };
        getEvent();
    }, [match.params.eventId]);
    return (
        <div>
            {event ? (
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
                                <SigninForm setParticipantData={setParticipantData} eventId={event.eventId} />
                            ) : (
                                <div style={{ textAlign: "left" }}>
                                    <h2>{participantData.username}'s Availability</h2>
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
                        <div className="event-page-subcontainer">
                            <h2>Group's Availability</h2>
                            <p>TODO</p>
                        </div>
                    </div>
                    <Divider />
                </>
            ) : (
                <PageLoader />
            )}
        </div>
    );
};

export default EventPage;
