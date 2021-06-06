import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider } from "antd";
import moment from "moment";

// import config from "../../common/config";
import { IEvent } from "../../common/interfaces/EventsInterfaces";
import CopyToClipboard from "../../components/Widgets/CopyToClipboard/CopyToClipboard";
import { getEventById } from "../../common/api/EventsApis";
import PageLoader from "../../components/Widgets/PageLoader/PageLoader";
import SigninForm from "../../components/SigninForm/SigninForm";
import { IParticipant } from "../../common/interfaces/ParticipantsInterfaces";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./EventPage.scss";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match, history }) => {
    const [event, setEvent] = useState<IEvent>();
    const [eventLink, setEventLink] = useState<string>("");
    const [participant, setParticipant] = useState<IParticipant | undefined>();
    const [slots, setSlots] = useState<number>(0);
    const getTimeSlots = (event: IEvent) => {
        const start = new Date(`01/01/2007 ${event.startTime}`).getTime();
        const end = new Date(`01/01/2007 ${event.endTime}`).getTime();
        const diff = end - start;
        const hours = diff / 1000 / 60 / 60;
        setSlots(hours * 2);
    };
    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: IEvent = await getEventById(match.params.eventId);
                console.log(currentEvent);
                setEvent(currentEvent);
                setEventLink(`${window.location.origin}/event/${currentEvent._id}`);
                getTimeSlots(currentEvent);
            } catch (error) {
                console.error(error);
                history.push(`/404`);
            }
        };
        getEvent();
    }, [match.params.eventId, history, participant]);
    return (
        <>
            {event ? (
                <>
                    <PageTitle title={event.name} tooltipMessage="Sign in and fill out your availabilities!">
                        {event.description ? <span className="description">{event.description}</span> : <></>}
                        <CopyToClipboard text="Copy Event Link" content={eventLink} />
                    </PageTitle>

                    <div className="event-page-container" style={{ textAlign: "left" }}>
                        <div className="event-page-subcontainer">
                            {!participant ? (
                                <SigninForm setParticipant={setParticipant} eventId={event._id} />
                            ) : (
                                <div style={{ textAlign: "left" }}>
                                    <h2>{participant.username}'s Availability</h2>
                                    <p>Max Participants: {event.maxParticipants}</p>
                                    <p>Timezone: {event.timezone}</p>
                                    <p>
                                        Start Time: {moment(new Date(`01/01/2001 ${event.startTime}`)).format("HH:mm")}
                                    </p>
                                    <p>End Time: {moment(new Date(`01/01/2001 ${event.endTime}`)).format("HH:mm")}</p>
                                    Selection {event.eventType}:
                                    <div className="availabilities">
                                        {event.possibleDates.map((item) => {
                                            // const timeSlots = new Array(slots).fill(null);
                                            return (
                                                <div className="availabilityDate">
                                                    <div>{item}</div>
                                                    {/* {timeSlots.map(() => (
                                                        <div className="availabilitySlots"></div>
                                                    ))} */}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="event-page-subcontainer">
                            <h2>Group's Availability</h2>
                            <p>TODO</p>
                            {event.participants.length} Participants:
                            <ul>
                                {event.participants.map((participant) => {
                                    return <li>{participant.username}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                    <Divider />
                </>
            ) : (
                <PageLoader />
            )}
        </>
    );
};

export default EventPage;
