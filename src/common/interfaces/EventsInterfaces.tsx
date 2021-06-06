import { IParticipant } from "./ParticipantsInterfaces";

export type EventType = "dates" | "weekdays";

/**
 * EventFormData e.g.
 * {
        name: 'March Book Club',
        description: 'At Park Lafontaine from 2pm to 3pm',
        eventType: 'dates',
        possibleDates: ['2022-05-30'],
        startTime: '9:00',
        endTime: '00:00',
        timezone: 'America/Montreal'
    }
 */
export interface EventFormData {
    name: string;
    description?: string;
    eventType: EventType;
    possibleDates: string[];
    startTime: string;
    endTime: string;
    timezone: string;
}

export interface IEvent extends EventFormData {
    _id: string;
    participants: IParticipant[];
    maxParticipants: number;
}
