const mongoose= require ('mongoose'); 
const {Schema} = mongoose; 

const roles ={
    values: ['Admin','Socio'],
    message: '{value} no es un rol valido'
}
const socioSchema = new Schema({ 
    nombre: String, 
    apellido: String,
    telefono: Number,
    correo: String,
    documento: String, 
    contraseña: {type: String, required: [true, 'contraseña obligatorio']},
    rol: {type: String, default:'Socio', enum:roles},

});


module.exports=mongoose.model('socio',socioSchema)