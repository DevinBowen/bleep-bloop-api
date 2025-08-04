import Auth from "../routers/auth"
import AuthService from "../services/auth"
import { Credientials } from "../types/auth"

export default class AuthController {

    static async login(credentials: Credientials) {
        return AuthService.login(credentials)
    }

    static async register(credentials: Credientials) {
        return AuthService.register(credentials)
    }

}
