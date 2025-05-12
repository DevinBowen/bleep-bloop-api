import { RequestGenericInterface } from "fastify"

import { Credientials } from "../auth"

export interface LoginPostRequest extends RequestGenericInterface {
    Body: Credientials
}