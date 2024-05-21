
const requireUser = () => {
    return (req, res, next) => {
        if (req.user && req.user.role !== "admin") {
            next()

        } else {
            res.status(403).send("Acceso denegado")
        }
    }
}

const requireAdmin = () => {
    return (req, res, next) => {
        if (req.user && req.user.role === "admin") {
            next()

        } else {
            res.status(403).send("Acceso denegado")
        }
    }
}

const requirePremium = () => {
    return (req, res, next) => {
        if (req.user && req.user.role === "premium") {
            next()

        } else {
            res.status(403).send("Acceso denegado")
        }
    }
}


module.exports = { requireAdmin, requireUser, requirePremium }