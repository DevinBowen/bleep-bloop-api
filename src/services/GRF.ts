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

    static async productUpdate(params: { id: string }, data: {name?: string, description?: string, price?: number, stock?: number}) {
        const pool = await GRFPool();
        const { id } = params;
        // Build dynamic query parts
        const updates = [];
        const request = pool.request().input("id", id);
        if (data.name !== undefined) {
            updates.push("name = @name");
            request.input("name", data.name);
        }
        if (data.description !== undefined) {
            updates.push("description = @description");
            request.input("description", data.description);
        }
        if (data.price !== undefined) {
            updates.push("price = @price");
            request.input("price", data.price);
        }
        if (data.stock !== undefined) {
            updates.push("stock = @stock");
            request.input("stock", data.stock);
        }
        if (updates.length === 0) {
            throw new Error("No fields provided to update.");
        }
        const query = `UPDATE PROD.products SET ${updates.join(", ")} WHERE id = @id`;
        const result = await request.query(query);
        return { status: 200, message: "Product updated successfully" };
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
