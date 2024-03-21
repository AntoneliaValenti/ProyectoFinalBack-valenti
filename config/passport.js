const passport = require('passport') 
const github = require('passport-github2') 
const LocalStrategy = require("passport-local").Strategy
const userModel = require('../dao/db/models/user.model')
const Cart = require('../dao/db/models/cart.model')
const {createHash, isValidatePassword} = require('../utils/bcrypts')


const initPassport = () => {

    // passport.use("github", new github.Strategy(
    //     {
    //         clientID:"Iv1.3b69f5c084e4d724",
    //         clientSecret: "3d9f377be3f7ec775fb7de84fdcf2d3a3d282cc2",
    //         callbackURL: "http://localhost:8080/api/view/loginGHub"
    //     },
    //     async(accesToken, refresToken, profile, done) => {
    //         try {
    //             let { name, mail } = profile._json;
    //             let usuario = await userModel.findOne({ mail })
    //             if (!usuario) {
    //                 usuario = await userModel.create({
    //                     First_name: name,
    //                     mail,
    //                     role: "user"
    //                 });
    //             }
    //             done(null, usuario)
    //         } catch (error) {
    //             done(error)
    //         }
    //     }
    // ))
    

}



passport.serializeUser((usuario, done) =>{
    done(null, usuario)
})
passport.deserializeUser((usuario, done) =>{
    done(null, usuario)
})


const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { usernameField: 'mail', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                let userData = req.body;
                let user = await userModel.findOne({ mail: username });
                if (user) {
                    return done('Error, usuario ya existe');
                }

                // Crear el carrito para el nuevo usuario
                let newCart = await Cart.create({ date: new Date(), products: [] });

                // Crear el usuario
                let userNew = {
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    mail: username,
                    age: userData.age,
                    password: createHash(userData.password),
                    role: "user",
                    cartId: newCart._id  // Asociar el ID del carrito al usuario
                };

                let newUser = await userModel.create(userNew);

                done(null, newUser);
            } catch (error) {
                done('Error al crear el usuario: ' + error);
            }
        }
    ));
}


module.exports = {  initPassport, initializePassport  } //