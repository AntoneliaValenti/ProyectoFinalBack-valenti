const passport = require('passport') 
const github = require('passport-github2') 
const LocalStrategy = require("passport-local").Strategy
const userModel = require('../dao/db/models/user.model');
const {createHash, isValidatePassword} = require('../utils/bcrypts')


const initPassport = () => {

    passport.use("github", new github.Strategy(
        {
            clientID:"Iv1.3b69f5c084e4d724",
            clientSecret: "3d9f377be3f7ec775fb7de84fdcf2d3a3d282cc2",
            callbackURL: "http://localhost:8080/api/view/loginGHub"
        },
        async(accesToken, refresToken, profile, done)=>{
            try{
                //console.log(profile)    
                let {name, mail}=profile._json
                let usuario=await userModel.findOne({mail})
                if(!usuario){
                    usuario=await userModel.create(
                        {
                            nombre: name, mail, github: profile
                        }
                    )
                }
            
            } catch (error) {
                return done (error)
            }
        }
    ))

}
passport.serializeUser((usuario, done) =>{
    done(null, usuario)
})
passport.deserializeUser((usuario, done) =>{
    done(null, usuario)
})

const initializePassport = () => {

    passport.use('resgister', new LocalStrategy(
        {usernameField:'mail', passReqToCallback: true},
        async (req, username, password, done) => {
            try{
                let userData = req.body
                let user = await userModel.findOne({mail: username})
                if(user){
                    done('Error, usuario ya existe')
                }
                let userNew = {
                    name: userData.name,
                    mail: username,
                    lastname: userData.lastname,
                    password: createHash(userData.passport)
                }
                let result = await userModel.create(userNew)
                done(null, result)
            } catch(error) {
                done('Error, al crear el usuario' + error)
            }
        }
    ))    
}




module.exports = {  initPassport, initializePassport } //