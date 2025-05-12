import config from 'config'
import buildApp from './app'

async function startServer() {
    const app = await buildApp()

    const port = config.get<number>('server.port') ?? 3000
    const host = config.get<string>('server.host') ?? 'localhost'

    try {
        await app.listen({ port, host })
        console.log(`Server running at http://${host}:${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

startServer()