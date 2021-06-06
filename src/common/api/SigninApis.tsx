import axios, { AxiosResponse } from "axios";

import { IParticipant, SigninData } from "../interfaces/ParticipantsInterfaces";
import config from "../config";

const signinAxios = axios.create({
    baseURL: `${config.baseURL}/${config.paths.signin}`
    // headers: {}
});

export const signin = async (signinData: SigninData): Promise<IParticipant> => {
    const { data: participant }: AxiosResponse = await signinAxios.post("/", signinData);
    return participant;
};
