import { FastifyPluginAsync } from 'fastify'

import AuthController from '../controllers/auth'
import { LoginPostRequest } from '../types/requests/authRequests'

export const Auth: FastifyPluginAsync = async (fastify) => {

    fastify.post<LoginPostRequest>('/login', { schema: fastify.getSchema('auth:postLogin') as {} }, async (req, res) => {
        const credentials = req.body
        return AuthController.login(credentials)
    })

    fastify.get('/logout', async (req, res) => {
        return AuthController.logout()
    })

    fastify.post<LoginPostRequest>('/register', async (req, res) => {
        const credentials = req.body
        return AuthController.register(credentials)
    })

}

export default Auth