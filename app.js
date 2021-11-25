const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const app = express();
require('dotenv').config();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  try {
      try {
          //sandgrid email service
const API_KEY1 = "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"
sgMail.setApiKey(API_KEY1)

const message = {
    to: 'niranjanuit@gmail.com',
    from: {
        name:"Yours Niranjan",
        email:'niranjan17091998@gmail.com'}
        ,
    subject:'Hello from Niranjan',
    text:'Hello India',
    html:'<h1>Hello from Niranjan Kumar</h1>',
    html: output //
};

sgMail.send(message)
.then((response) => console.log("email sent..."))
.catch((error) => console.log(error.message));

        
      } catch{
          // mailgun

var mailgun = require('mailgun-js')({apiKey:process.env.api_key2, domain: process.env.domain2});
var data ={
    from: 'niranjan17091998@gmail.com',
    to:'niranjanuit@gmail.com',
    subject:'Hello',
    text: 'Testing Some Mailgun messages'
};

mailgun.messages().send(data, function (error, body){
    if(error){
        console.log(error)
    }
    console.log(body);
});
      }
  } catch (error) {
      console.log(error)
      
  }
 res.end()

  
  });

app.listen(3000, () => console.log('server started..'));