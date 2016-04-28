var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/chat");
var Schema = mongoose.Schema;
var chatSchema = new Schema({
    
    mensaje:String
});




module.exports ={ 
   Chat: mongoose.model('Chat',chatSchema)
   
};