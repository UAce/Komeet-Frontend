export interface SigninData {
    username: string;
    password?: string;
    eventId: string;
}

export interface IParticipant {
    username: string;
    availabilities: number[][];
}
