const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).send('Acceso denegado')
    }
}

const requireUser = (req, res, next) => {
    if (req.user && req.user.role !== 'admin') {
        next()
    } else {
        res.status(403).send('Acceso denegado')
    }
}
