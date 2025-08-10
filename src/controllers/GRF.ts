import { GRFServices } from '../services/GRF'

export class GRFController {

    static productCreate(data: {name: string, description: string, price: number, stock: number}) {
        return GRFServices.productCreate(data)
    }

    static read(params: { id: string }) {
        return GRFServices.read(params)
    }

    static productUpdate(params: { id: string }, data: {name?: string, description?: string, price?: number, stock?: number}) {
        return GRFServices.productUpdate(params, data)
    }

    static delete(params: { id: string }) {
        return GRFServices.delete(params)
    }

    static productReadAllActive() {
        return GRFServices.productReadAllActive()
    }

}