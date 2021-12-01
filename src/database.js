const mongoose = require('mongoose');

// const uri ='mongodb://localhost:27017/arrayanes'
const uri ='mongodb+srv://Lau21:Laura123@arrayanes.bcpgd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const options = {useNewUrlParser: true, useUnifiedTopology: true}; 

mongoose.connect(uri, options).then( 
    () => { console.log('Conectado a DB') }, 
    err => { console.log(err) } 
);

module.exports=mongoose