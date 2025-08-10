import { FastifyPluginAsync } from 'fastify'
import { GRFController } from '../controllers/GRF'

// ROUTE: /GRF
export const GRF: FastifyPluginAsync = async (fastify) => {

    fastify.post<{ Body: {name: string, description: string, price: number, stock: number} }>('/product/create', async (req, res) => {
        return GRFController.productCreate(req.body)
    })

    fastify.get<{ Params: { id: string } }>('/product/read/:id', async (req, res) => {
        return GRFController.read(req.params)
    })

    fastify.put<{ Params: { id: string }, Body: {name?: string, description?: string, price?: number, stock?: number} }>('/product/update/:id', async (req, res) => {
        return GRFController.productUpdate(req.params, req.body)
    })

    fastify.delete<{ Params: { id: string } }>('/product/delete/:id', async (req, res) => {
        return GRFController.delete(req.params)
    })

    fastify.get('/product/read/all/active', async (req, res) => {
        return GRFController.productReadAllActive()
    })

}

export default GRF