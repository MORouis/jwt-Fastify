const fastify = require('./server')

const routes = require('./routes/routes')
fastify.register(routes)

const start = async () => {
    try {
        await fastify.listen({ port: 5000 })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}
start()


