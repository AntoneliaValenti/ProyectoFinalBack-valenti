const User = require("../dao/db/models/user.model");

class SessionManagerMongo {
  constructor() {
    this.users = [];
    this.id = 0;
    this.path = `${__dirname}/userManagerMongo`;
  }

  async loginUser(mail, password) {
    try {
      const users = await User.find({ mail: `${mail}` });
      console.log(users);
      if (users.length > 0) {
        if (users[0].password === password) {
          return users[0];
        } else return false;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async registerUser(userData) {
    try {
      const users = await User.find();
      const userFound = users.find((e) => {
        return e.mail === userData.mail;
      });
      if (!userFound) {
        const register = await User.create(userData);
        if (register) {
          return true;
        } else return false;
      } else return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

function auth(req, res, next) {
  if (req.session.user == "adminCoder@coder.com" && req.session.admin) {
    return next();
  }
  return res.send("Error en la autenticacion, no autorizado");
}

module.exports = SessionManagerMongo;

