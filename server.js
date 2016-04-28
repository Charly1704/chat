var express = require("express");
var app = express();
var logger =require("log4js")
var bodyParser = require("body-parser");
var Chat = require("./models/chat").Chat;
var message;


app.set("view engine","pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);

var mensajes = [{
    mensaje:"Mensaje numero 1",
}];

io.on('connect',function(socket){
    //logger.info("Alguien se ha conectado al chat");
    socket.emit("enviarMensajes",mensajes);
    socket.on("mensajeNuevo",function(data){
        mensajes.push(data);
        io.sockets.emit("enviarMensajes",mensajes);
    }
    )
})

app.get("/",function(req,res){
    res.render("index");


});
app.get("/api/chat",function(req,res){
  console.log("Procesando informacion");
  Chat.find()
  .exec(function(err, mensaje){
    message = mensaje
    res.json(mensaje);
    console.log(mensaje);
  }),function(err){
    console.log(err)
  }
})

app.get("/prueba",function(req,res){
  console.log(message);
  res.send(message);
})


app.post("/api/guardar",function(req,res){
    var chat = new Chat({
        mensaje: req.body.mensaje

    });
    chat.save().then(function(us){

res.redirect("/")
console.log("Se guardo el mensaje");

},function(err){

  console.log(String(err));

});


});

server.listen(8080);