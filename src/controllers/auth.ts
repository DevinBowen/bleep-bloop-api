import { Credientials } from "../types/auth"

export default class AuthController {

    static login(credentials: Credientials) {
        console.log(credentials)
        return {status: 'Success'}
    }

    static logout() {
        return 'Logout Successful'
    }

    static register(credentials: Credientials) {
        console.log(credentials)
        return {status: 'Success'}
    }
}
