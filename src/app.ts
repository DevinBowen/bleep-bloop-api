import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import Auth from './routers/auth'
import Files from './routers/files'

export default async function App(): Promise<FastifyInstance> {
    const app = fastify({
        logger: false,
    })

    await app.register(cors, {
        origin: ['http://localhost:4200'],
        credentials: false,
    })

    app.register(Auth, { prefix: '/auth' })
    app.register(Files, { prefix: '/files' })

    return app
}