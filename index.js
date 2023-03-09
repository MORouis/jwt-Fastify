const {fastify} = require('./server')
const mongoose = require('mongoose');

const routes = require('./routes/routes')
fastify.register(routes)

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/JWT', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}
connectToMongoDB()
const start = async () => {
    try {
        await fastify.listen({ port: 5000 })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}
start()


