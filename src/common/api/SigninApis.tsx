import axios, { AxiosResponse } from "axios";

import { ParticipantData, SigninData } from "../../interfaces/SigninInterfaces";
import config from "../config";

const signinAxios = axios.create({
    baseURL: `${config.baseURL}/${config.paths.signin}`
    // headers: {}
});

export const signin = async (signinData: SigninData): Promise<ParticipantData> => {
    const { data: participant }: AxiosResponse = await signinAxios.post("/", signinData);
    return participant;
};
