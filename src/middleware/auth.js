
const requireUser = () => {
    return async (req, res, next) => {
      try {
        if (req.session.passport.user.role !== 'user') {
          return res.status(401).send("Usuario no autenticado");
        }
     
        next();
      } catch (error) {
        console.error('Error en el middleware requireUser:', error);
        res.status(500).send("Error interno del servidor");
      }
    };
  };

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