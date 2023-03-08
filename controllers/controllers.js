const fastify = require('../server')

const generateToken = (req, reply) => {
    const { id } = req.params
    const data = {
        name: id
    }
    const token = fastify.jwt.sign(data)
    reply.send({ token })
}

const validateToken = (
  async (request, reply) => {
    return request.user
  }) 

const showMessage = ((req, reply) => {
    return reply.send('in home')
})

module.exports = { generateToken, validateToken, showMessage }