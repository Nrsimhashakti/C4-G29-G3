<<<<<<< HEAD
<<<<<<< HEAD
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 

const roles ={
    values: ['Admin','Socio'],
    message: '{value} no es un rol valido'
}
const socioSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']},
    telefono: Number,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    documento: {
        type: String, 
        required: [true, 'Documento obligatorio'],
        unique: true
    }, 
    contraseña: {type: String, required: [true, 'contraseña obligatorio']},
    rol: {type: String, default:'Socio', enum:roles},

});

=======
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 

const roles ={
    values: ['Admin','Socio'],
    message: '{value} no es un rol valido'
}
const socioSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']},
    telefono: Number,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    documento: {
        type: String, 
        required: [true, 'Documento obligatorio'],
        unique: true
    }, 
    contraseña: {type: String, required: [true, 'contraseña obligatorio']},
    rol: {type: String, default:'Socio', enum:roles},

});

>>>>>>> 533c1a2 (Actualizacion rep)
=======
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 

const roles ={
    values: ['Admin','Socio'],
    message: '{value} no es un rol valido'
}
const socioSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']},
    telefono: Number,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    documento: {
        type: String, 
        required: [true, 'Documento obligatorio'],
        unique: true
    }, 
    contraseña: {type: String, required: [true, 'contraseña obligatorio']},
    rol: {type: String, default:'Socio', enum:roles},

});

>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=mongoose.model('socio',socioSchema)