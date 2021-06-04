export interface SigninData {
    username: string;
    password?: string;
    eventId: string;
}

export interface ParticipantData {
    participantId: string;
    username: string;
    eventId: string;
    availabilities: number[][];
}
