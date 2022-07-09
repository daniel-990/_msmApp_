const express = require('express')
const body_parser = require('body-parser')
const config = require('config')
const app = express()

const path = require('path')
const PORT = process.env.PORT || 5000

//archivo de configuracion
const ID = config.get('tokens.accountSid');
const Token = config.get('tokens.authToken');

//Twilio 
const accountSid = ID;
const authToken = Token;
const client = require('twilio')(accountSid, authToken);

app.set('view engine', 'ejs');
app.use(express.static('public'));

//body parser
app.use(body_parser.urlencoded(
  {
    extended:true
  }
));
app.use(body_parser.json());

//para enviar el mensaje con twilio
app.post('/enviarmensaje', (req, res) => {
  const cuerpoMensaje = req.body.mensaje;
  const desdeDonde = req.body.wap;
  const donde = req.body.destino;
  res.send("mensaje enviado con exito");

  //se imprime la respuesta en la terminal
  console.log(req.body);
  
  //wp que se envia
  client.messages 
  .create({ 
      body: cuerpoMensaje, 
      from: `whatsapp:${desdeDonde}`,       
      to: `whatsapp:+57${donde}` 
    }) 
  .then(message => {
    console.log(`Mensaje enviado: ${message.sid}`);
  })
  .done();
});

//para traer los mensajes que me envian 
app.get('/tomarmensajes', (req, res) => {
  //------
  /**
  * body: 'Listo', 
    from: 'whatsapp:+14',       
    to: 'whatsapp:+57' 
  */
  client.messages.list({limit: 100})
  .then(messages => messages.forEach(
    m = (m) =>{
      if(m.from == "whatsapp:+57"){
        res.json({
          from: m.from,
          to: m.to,
          body: m.body,
          date: m.dateSent,
          status: m.status
        })
      }
    } 
  ));
})

app.get('/', (req, res) => {
  res.render('pages/index.ejs');
  //sms
  // client.messages 
  // .create({ 
  //   body: 'Me vas a negrear con el Bot en el wasap que gonorrea de buena',  
  //   messagingServiceSid: 'MG_',      
  //   to: '+57'
  // })
  // .then(message => console.log(message.sid)) 
  // .done();
})

app.listen(PORT, () => console.log(`Puerto: http://localhost:${PORT}`))
