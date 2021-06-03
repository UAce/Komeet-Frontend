export interface SigninData {
    username: string;
    password?: string;
}

export interface ParticipantData {
    username: string;
    availabilities: number[][];
}
