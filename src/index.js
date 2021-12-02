const express = require('express');
const app = express();
const morgan = require ('morgan');
const cors = require ('cors');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

require('./database')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin:'*'}));


//RUTAS
app.use('/socio', require('./routes/Socio.route'))
app.use('/empleado', require('./routes/Empleado.route'))
app.use('/cotizacion', require('./routes/Cotizacion.route'))
app.use('/reserva', require('./routes/Reserva.route'))

//PUERTO
app.set('puerto', process.env.PORT || 4000); 
app.listen(app.get('puerto'), () =>{
    console.log('Example app listening on port ' + app.get ('puerto')); 
});
