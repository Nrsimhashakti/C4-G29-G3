const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 


const empleadoSchema = new Schema({ 
    nombre: String, 
    apellido:String,
    telefono: Number,
    correo: String,
    documento:Number, 
    contraseña: String,
    rol: String,
    user: String
});



module.exports=mongoose.model('Empleado',empleadoSchema)