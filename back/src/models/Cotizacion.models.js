const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const cotizacionSchema = new Schema({ 
    nombre: String,  
    apellido: String,
    documento: String,
    correo: String,
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