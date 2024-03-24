const bcrypt = require("bcrypt")

const createHash = (password) => {
  let pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  return pass
}
const isValidatePassword = (user, password) => {
  let decrypt = bcrypt.compareSync(user, password)
  return decrypt
}

module.exports = { createHash, isValidatePassword }