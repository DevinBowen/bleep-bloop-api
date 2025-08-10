import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import Auth from './routers/auth'
import Files from './routers/files'
import Email from './routers/email'
import Sql from './routers/sql'
import GRFc from './routers/GRF'

export default async function App(): Promise<FastifyInstance> {
    const app = fastify({
        logger: false,
        trustProxy: true
    })

    await app.register(cors, {
        origin: [
            'http://localhost:8080',
            'https://gatorridgefarm.com'
        ],
        credentials: false,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })

    await app.register(async function (api) {
        api.register(Auth, { prefix: '/auth' })
        api.register(Files, { prefix: '/files' })
        api.register(Email, { prefix: '/email' })
        api.register(Sql, { prefix: '/sql' })
        api.register(GRFc, { prefix: '/GRF' })
    }, { prefix: '/api' })

    return app
}