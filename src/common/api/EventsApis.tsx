import axios, { AxiosResponse } from "axios";

import { GetEventResponse, CreateEventResponse, EventFormData } from "../../interfaces/EventInterfaces";
import config from "../config";

const eventAxios = axios.create({
    baseURL: `${config.baseURL}` + `${config.paths.event}`
    // headers: {}
});

// For testing
export const getExampleEvent = async (): Promise<GetEventResponse> => {
    const { data: event }: AxiosResponse = await eventAxios.get("/example");
    return event;
};

export const getEventById = async (eventId: string): Promise<GetEventResponse> => {
    const { data: event }: AxiosResponse = await eventAxios.get(`/${eventId}`);
    return event;
};

export const createEvent = async (eventData: EventFormData): Promise<CreateEventResponse> => {
    const { data: newEvent }: AxiosResponse = await eventAxios.post("/", eventData);
    return newEvent;
};
