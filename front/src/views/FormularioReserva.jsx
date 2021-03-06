import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css';


export default function  FormularioReserva () {

    const[tipo_evento, setTipoEvento]=useState('');
    const[num_personas, setNumPersonas]=useState('');
    const[area, setArea]=useState('');
    const[fecha, setFecha]=useState('');
    const[hora, setHora]=useState('');
    const[comida, setComida]=useState('');
    const[bebidas, setBebidas]=useState('');
    const[grupo_musical, setGrupoMusical]=useState('');
    const[adicionales, setAdicionales]=useState('');

    
    const reservar=async(e)=>{
        e.preventDefault();
        const idSocio=sessionStorage.getItem('idsocio');
        const token= sessionStorage.getItem('token');
        const respuestaSocio= await Axios.get('/socio/listar-socioid/'+idSocio,{
            headers:{'autorizacion':token} 
        });
        const nombre=respuestaSocio.data.nombre;
        const apellido=respuestaSocio.data.apellido;
        const documento=respuestaSocio.data.documento;
        const correo=respuestaSocio.data.correo;
        const telefono=respuestaSocio.data.telefono;

        const reserva={
            nombre, 
            apellido, 
            documento,
            correo, 
            telefono, 
            tipo_evento, 
            num_personas,
            area, fecha, 
            hora, comida, 
            bebidas, 
            grupo_musical, 
            adicionales,
            socio:sessionStorage.getItem('idsocio')

        }

            const respuesta = await Axios.post('/reserva/nueva-reserva', reserva,{
                headers:{'autorizacion':token} 
            });

            const mensaje = respuesta.data.mensaje

            Swal.fire({
                icon:'success',
                title:mensaje,
                showConfirmButton:false,
                timer: 1500
            })
            e.target.reset();
    }

    return (
        <div>

            <div className="regwrapper fadeInDown container">
                <div className="user-details2 ">
                    <h3 className="active fadeIn first"> RESERVA AQU?? {sessionStorage.getItem('nombre')} </h3>
                           
                    <form onSubmit={reservar}>
                        <Row xs="3" className="input-resev">
                            <Col><select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) =>setTipoEvento(e.target.value)}>
                                    <option defaultValue>Seleccione evento:</option>
                                    <option value="Matrimonio">Matrimonio</option>
                                    <option value="Grado">Grado</option>
                                    <option value="Cumplea??os">Cumplea??os</option>
                                    <option value="Reuni??n Empresarial">Reuni??n Empresarial</option>
                                </select></Col>
                            <Col><select name="tipoEspacio" id="tipoEspacio" className="fadeIn fourth " onChange={(e) =>setArea(e.target.value)}>
                                    <option defaultValue>Seleccione Area:</option>
                                    <option value="Sal??n presidencial">Sal??n presidencial</option>
                                    <option value="Sal??n gourmet">Sal??n gourmet</option>
                                    <option value="Piscina">Piscina</option>
                                    <option value="Terraza parilla">Terraza parilla</option>
                                    <option value="Terraza f??tbol">Terraza f??tbol</option>
                                    <option value="Parque">Parque</option>
                                </select></Col>

                            <Col><input type="number" className="fadeIn third" name="login" placeholder="N??mero de personas" onChange={(e) =>setNumPersonas(e.target.value)}required/></Col>
                        </Row>
                        <Row xs="2" className="input-resev">
                            <Col><input type="date" className="fadeIn fourth" name="login" placeholder="Fecha" onChange={(e) =>setFecha(e.target.value)} required/></Col>
                            <Col><input type="time" className="fadeIn fourth" name="login" placeholder="Hora" onChange={(e) =>setHora(e.target.value)} required/></Col>
                        </Row>
                        <Row xs="3" className="input-resev">
                            <Col>
                                <select name="comida" id="comida" className="fadeIn fourth" onChange={(e) =>setComida(e.target.value)}>
                                    <option defaultValue>Seleccione la comida:</option>
                                    <option value="Buffet">Buffet</option>
                                    <option value="Servicio Americano">Servicio Americano</option>
                                    <option value="Bocadillos">Bocadillos</option>
                                    <option value="Cathering">Cathering</option>
                                </select>
                            </Col>
                            <Col>
                                <select name="bebidas" id="bebidas" className="fadeIn fourth" onChange={(e) =>setBebidas(e.target.value)}>
                                    <option defaultValue>Seleccione las bebidas:</option>
                                    <option value="Vino Espumoso">Vino Espumoso</option>
                                    <option value="Wisky">Wisky</option>
                                    <option value="Tequila">Tequila</option>
                                    <option value="Agua">Agua</option>
                                </select>
                            </Col>
                            <Col>
                                <select name="grupo_musical" id="grupo_musical" className="fadeIn fourth" onChange={(e) =>setGrupoMusical(e.target.value)}>
                                    <option defaultValue>Seleccione la m??sica:</option>
                                    <option value="DJ">DJ</option>
                                    <option value="Parranda Vallenata">Parranda Vallenata</option>
                                    <option value="Serenata">Serenata</option>
                                </select>
                            </Col>
                        </Row>
                        <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)}></textarea>
                        <input type="submit" className="fadeIn fourth" value="RESERVAR"/>
                    </form>                    
                </div>
            </div>
        </div>
   )
}