import { FastifyPluginAsync } from 'fastify'

export const SanchezRestore: FastifyPluginAsync = async (fastify) => {

    fastify.get('/test', async (req, res) => {
        return console.log('Test route working.')
    })

}

export default SanchezRestore