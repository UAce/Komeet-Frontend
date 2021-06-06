import axios, { AxiosResponse } from "axios";

import { IEvent, EventFormData } from "../interfaces/EventsInterfaces";
import config from "../config";

const eventAxios = axios.create({
    baseURL: `${config.baseURL}/${config.paths.event}`
    // headers: {}
});

export const getEventById = async (eventId: string): Promise<IEvent> => {
    const { data: event }: AxiosResponse = await eventAxios.get(`/${eventId}`);
    return event;
};

export const createEvent = async (eventData: EventFormData): Promise<IEvent> => {
    const { data: newEvent }: AxiosResponse = await eventAxios.post("/", eventData);
    return newEvent;
};
