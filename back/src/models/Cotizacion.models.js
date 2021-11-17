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

module.exports=mongoose.model('Cotizacion',cotizacionSchema)