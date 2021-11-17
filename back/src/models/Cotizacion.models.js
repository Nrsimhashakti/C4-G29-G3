<<<<<<< HEAD
<<<<<<< HEAD
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const cotizacionSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']}, 
    documento: String,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    telefono: Number,
    tipo_evento: String,
    num_personas: Number,  
    area: String,
    fecha:String, 
    hora: String,
    comida: String, 
    bebidas: String, 
    grupo_musical: String, 
    adicionales: String, 
  
});


//convertir modelo 
=======
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const cotizacionSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']}, 
    documento: String,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    telefono: Number,
    tipo_evento: String,
    num_personas: Number,  
    area: String,
    fecha:String, 
    hora: String,
    comida: String, 
    bebidas: String, 
    grupo_musical: String, 
    adicionales: String, 
  
});


//convertir modelo 
>>>>>>> 533c1a2 (Actualizacion rep)
=======
const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const cotizacionSchema = new Schema({ 
    nombre: {type: String, required: [true, 'Nombre obligatorio']}, 
    apellido: {type: String, required: [true, 'Apellido obligatorio']}, 
    documento: String,
    correo: {type: String, required: [true, 'Correo obligatorio']}, 
    telefono: Number,
    tipo_evento: String,
    num_personas: Number,  
    area: String,
    fecha:String, 
    hora: String,
    comida: String, 
    bebidas: String, 
    grupo_musical: String, 
    adicionales: String, 
  
});


//convertir modelo 
>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=mongoose.model('Cotizacion',cotizacionSchema)