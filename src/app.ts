import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

import Auth from './routers/auth'
import Files from './routers/files'
import Email from './routers/email'
import Sql from './routers/sql'
import GRF from './routers/GRF'
import SanchezRestore from './routers/sanchezRestore'

export default async function App(): Promise<FastifyInstance> {
    const app = fastify({
        logger: true,
        trustProxy: true
    })

    await app.register(cors, {
        origin: [
            /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
            'https://gatorridgefarm.com',
            'https://sanchezrestore.com',
            'https://sanchezdetail.com'
        ],
        credentials: false,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })

    await app.register(async function (api) {
        api.register(Auth, { prefix: '/auth' })
        api.register(Files, { prefix: '/files' })
        api.register(Email, { prefix: '/email' })
        api.register(Sql, { prefix: '/sql' })
        api.register(GRF, { prefix: '/GRF' })
        api.register(SanchezRestore, { prefix: '/sanchezRestore' })
    }, { prefix: '/api' })

    return app
}