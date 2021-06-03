import { AxiosResponse } from "axios";

export type CalendarType = "dates" | "days";

export interface BaseEvent {
    name: string;
    description: string;
    calendarType: CalendarType;
    selected: string[];
}

export interface Event extends BaseEvent {
    id: string;
    startTime: string; // 24h format
    endTime: string; // 24h format
    timezone: string; // default America/Montreal
    maxParticipants: number; // default 20
}

/**
 * GetEventResponse e.g.
 * {
        "id": "1iNp9SBhy4Vs-5aHZZgmE",
        "startTime": "9:00",
        "endTime": "12:00",
        "timezone": "America/Montreal",
        "maxParticipants": 20,
        "name": "March Book Club",
        "description": "At Park Lafontaine from 2pm to 3pm",
        "calendarType": "dates",
        "selected": [
            "2022-05-30"
        ]
    }
 */
export interface GetEventResponse extends Event {}
export interface CreateEventResponse extends Event {}

/**
 * EventFormData e.g.
 * {
        name: 'March Book Club',
        description: 'At Park Lafontaine from 2pm to 3pm',
        calendarType: 'dates',
        selected: ['2022-05-30'],
        startTime: '9:00',
        endTime: '00:00',
        timezone: 'America/Montreal'
    }
 */
export interface EventFormData {
    name: string;
    description?: string;
    calendarType: CalendarType;
    selected: string[];
    startTime: string;
    endTime: string;
    timezone: string;
}
