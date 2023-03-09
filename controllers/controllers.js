const fastify = require('../server')
const bcrypt = require('bcrypt')
const User = require('../collections/user-schema')
const mongoose = require('mongoose')

const AddUser = async (req, reply) => {
  try {
    const { username, password, role } = req.body
    const salt = bcrypt.genSaltSync(10) // Generate Salt
    const hashedPassword = bcrypt.hashSync(password, salt) // Hash the password using the salt
    const newUser = new User({ username, role, password: hashedPassword })
    await newUser.save()
    reply.send(newUser)
  } catch (error) {
    reply.status(500).json({ error: error.message })
  }
}
const ValidateUser = async (req, reply) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('Invalid username')
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (isValidPassword) {
      const token = fastify.jwt.sign({ username, role: user.role })
      reply.send({ token })
    } else {
      throw new Error('Invalid password')
    }
  } catch (error) {
    reply.status(500).json({ error: error.message })
  }
}
const DeleteUser = async (req, reply) => {
  try {
    const { _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      reply.code(404).send({ msg: `No User with _id: ${_id}` });
      return;
    }
    await User.findByIdAndDelete(_id);
    reply.send({ msg: `User ${_id} deleted` });
  } catch (error) {
    reply.status(500).json({ error: error.message })
  }
}
const DeveloperAuthorization = (req, reply) => {
  reply.send('This is a protected route just for developers!')
}
module.exports = { AddUser, ValidateUser, DeveloperAuthorization, DeleteUser }