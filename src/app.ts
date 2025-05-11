import fastify, { FastifyInstance } from 'fastify'

import Files from './routers/files'

export default async function App(): Promise<FastifyInstance> {
    const app = fastify({
        logger: false,
    })

    app.register(Files, { prefix: '/files' })

    return app
}