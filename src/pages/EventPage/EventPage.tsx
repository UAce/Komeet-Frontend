import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Divider } from "antd";
import moment from "moment";
// import ScheduleSelector from "react-schedule-selector";

// import config from "../../common/config";
import { IEvent } from "../../common/interfaces/EventsInterfaces";
import CopyToClipboard from "../../components/Widgets/CopyToClipboard/CopyToClipboard";
import { getEventById } from "../../common/api/EventsApis";
import PageLoader from "../../components/Widgets/PageLoader/PageLoader";
import SigninForm from "../../components/SigninForm/SigninForm";
import { IParticipant } from "../../common/interfaces/ParticipantsInterfaces";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./EventPage.scss";
import AvailabilityGrid from "../../components/AvailabilityGrid/AvailabilityGrid";
import ScheduleSelector from "../../thirdPartyComponents/ReactScheduleSelector/ScheduleSelector";

interface EventPageProps extends RouteComponentProps<{ eventId: string }> {}

const EventPage: React.FC<EventPageProps> = ({ match, history }) => {
    const [event, setEvent] = useState<IEvent>();
    const [eventLink, setEventLink] = useState<string>("");
    const [participant, setParticipant] = useState<IParticipant | undefined>();
    const today = new Date().toISOString().split("T")[0];
    const [selection, setSelection] = useState<Date[]>([]);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const currentEvent: IEvent = await getEventById(match.params.eventId);
                console.log(currentEvent);
                setEvent(currentEvent);
                setEventLink(`${window.location.origin}/event/${currentEvent._id}`);
                setSelection(currentEvent.possibleDates.map((dateStr: string) => new Date(dateStr)));
                console.log(new Date(`${today} ${currentEvent.startTime}`).getHours());
                console.log(new Date(`${today} ${currentEvent.endTime}`).getHours());
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
                                    <div>
                                        <ScheduleSelector
                                            possibleDates={event.possibleDates}
                                            selection={selection}
                                            minTime={new Date(`${today} ${event.startTime}`).getHours()}
                                            hourlyChunks={2}
                                            onChange={(newSelection: Date[]) => setSelection(newSelection)}
                                            dateFormat="D MMM (ddd)"
                                            timeFormat="h:mm a"
                                            columnGap="4px"
                                            rowGap="4px"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="event-page-subcontainer">
                            <h2>Group's Availability</h2>
                            {event.participants.length} Participants:
                            <ul>
                                {event.participants.map((participant) => {
                                    return <li>{participant.username}</li>;
                                })}
                            </ul>
                            <ScheduleSelector
                                possibleDates={event.possibleDates}
                                selection={selection}
                                minTime={new Date(`${today} ${event.startTime}`).getHours()}
                                hourlyChunks={2}
                                onChange={(newSelection: Date[]) => setSelection(newSelection)}
                                dateFormat="D MMM (ddd)"
                                timeFormat="h:mm a"
                                columnGap="4px"
                                rowGap="4px"
                                readOnly={true}
                            />
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
