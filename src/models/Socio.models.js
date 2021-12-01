const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const socioSchema = new Schema({ 
    nombre: String, 
    apellido: String,
    telefono: Number,
    correo: String,
    documento: String, 
    contraseña:String, 
    rol: String

});


module.exports=mongoose.model('Socio',socioSchema)