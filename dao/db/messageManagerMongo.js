const Message = require ('../models')

class MessageManagerMongo{
    async addMessage(msg){
        try {
            await Message.create(msg)
            return "Mensaje enviado"
        } catch(err) {
            return 'error: ' + err
        }
    }
}
module.exports = MessageManagerMongo