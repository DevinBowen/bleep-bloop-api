import { GRFPool } from "../db";

export class GRFServices {

    static async productCreate(data: {name: string, description: string, price: number, stock: number}) {
        const pool = await GRFPool()
        const { name, description, price, stock } = data
        console.log('data:', data)

        const result = await pool.request()
            .input("name", name)
            .input("description", description)
            .input("price", price)
            .input("stock", stock)
            .query("INSERT INTO PROD.products (name, description, price, stock) VALUES (@name, @description, @price, @stock)")
        return result.recordset
    }

    static read(params: { id: string }) {
        // Implementation for reading a product
    }

    static update(params: { id: string }, data?: {name?: string, description?: string, price?: number, stock?: number}) {
        // Implementation for updating a product
    }

    static delete(params: { id: string }) {
        // Implementation for deleting a product
    }

    static async productReadAllActive() {
        const pool = await GRFPool()
        const result = await pool.request()
            .query("SELECT id, name, description, price, stock FROM PROD.products WHERE is_active = 1")
        console.log(result.recordset)
        return result.recordset
    }

}
