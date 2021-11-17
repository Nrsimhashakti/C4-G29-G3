<<<<<<< HEAD
<<<<<<< HEAD
const mongoose = require('mongoose');

const uri ='mongodb://localhost:27017/arrayanes'

const options = {useNewUrlParser: true, useUnifiedTopology: true}; 

// Or using promises 
mongoose.connect(uri, options).then( 
    () => { console.log('Conectado a DB') }, 
    err => { console.log(err) } 
);

=======
const mongoose = require('mongoose');

const uri ='mongodb://localhost:27017/arrayanes'

const options = {useNewUrlParser: true, useUnifiedTopology: true}; 

// Or using promises 
mongoose.connect(uri, options).then( 
    () => { console.log('Conectado a DB') }, 
    err => { console.log(err) } 
);

>>>>>>> 533c1a2 (Actualizacion rep)
=======
const mongoose = require('mongoose');

const uri ='mongodb://localhost:27017/arrayanes'

const options = {useNewUrlParser: true, useUnifiedTopology: true}; 

// Or using promises 
mongoose.connect(uri, options).then( 
    () => { console.log('Conectado a DB') }, 
    err => { console.log(err) } 
);

>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=mongoose