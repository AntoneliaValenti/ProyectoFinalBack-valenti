const Message = require ('../db/models/message.model')

class MessageManagerMongo{
    async addMessage(Messages){
        try {
            await Message.create(Messages)
            return "Mensaje enviado"
        } catch(err) {
            return 'error: ' + err
        }
    }
}
module.exports = MessageManagerMongo