const SessionManagerMongo = require('./models/session.model')


class SessionManagerMongo {
    constructor() {
        this.products = []
        this.id = 0
        this.path = `${__dirname}/products.json`
    }
}


function auth(req, res, next){
    if(req.session.user == 'adminCoder@coder.com' && req.session.admin){
    return next()
    }
    return res.send('Error en la autenticacion, no autorizado')
}

auth()

module.exports = SessionManagerMongo