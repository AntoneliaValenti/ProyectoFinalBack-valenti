const passport = require('passport')
const github = require('passport-github2')
const LocalStrategy = require("passport-local").Strategy
const userModel = require('../dao/db/models/user.model')
const Cart = require('../dao/db/models/cart.model')
const { createHash, isValidatePassword } = require('../utils/bcrypts')



const initializePassport = () => {

    passport.use("github", new github.Strategy(
        {
            clientID: "Iv1.3b69f5c084e4d724",
            clientSecret: "3d9f377be3f7ec775fb7de84fdcf2d3a3d282cc2",
            callbackURL: "http://localhost:8080/api/sessions/loginGHub"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let { name, email } = profile._json;
                let usuario = await userModel.findOne({ mail: email })
                if (!usuario) {
                    usuario = await userModel.create({
                        First_name: name,
                        email,
                        role: "user"
                    });
                }
                done(null, usuario)
            } catch (error) {
                done(error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        { usernameField: 'mail', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                let userData = req.body;
                let user = await userModel.findOne({ mail: username })
                if (user) {
                    return done('Error, usuario ya existe')
                }

                // Crear el carrito para el nuevo usuario
                let newCart = await Cart.create({ date: new Date(), products: [] })


                // Crear el usuario
                let userNew = {
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    mail: username,
                    age: userData.age,
                    password: createHash(userData.password),
                    role: "user",
                    cart: newCart._id
                }

                let newUser = await userModel.create(userNew)

                done(null, newUser);
            } catch (error) {
                done('Error al crear el usuario: ' + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'mail', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ mail: username })

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' })
                }

                const isMatch = isValidatePassword(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Contraseña incorrecta' })
                }
                console.log(user)
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ))
}


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})


module.exports = {initializePassport } 