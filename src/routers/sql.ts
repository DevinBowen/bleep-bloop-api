import { FastifyPluginAsync } from 'fastify'

export const Sql: FastifyPluginAsync = async (fastify) => {

    fastify.get('/test', async (req, res) => {
        return console.log('Test route working.')
    })

}

export default Sql