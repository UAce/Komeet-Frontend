import axios, { AxiosResponse } from "axios";
import { GetEventResponse, CreateEventResponse, EventFormData } from "../interfaces/EventInterfaces";

const eventAxios = axios.create({
    baseURL: "http://localhost:4000/events" // for testing purposes
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
