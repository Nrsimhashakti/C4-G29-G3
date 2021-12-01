import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css';


export default function FormularioCotizacion () {

    const[tipo_evento, setTipoEvento]=useState('');
    const[num_personas, setNumPersonas]=useState('');
    const[area, setArea]=useState('');
    const[fecha, setFecha]=useState('');
    const[hora, setHora]=useState('');
    const[comida, setComida]=useState('');
    const[bebidas, setBebidas]=useState('');
    const[grupo_musical, setGrupoMusical]=useState('');
    const[adicionales, setAdicionales]=useState('');
   

    const cotizar=async(e)=>{
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

        const cotizacion={
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

            const respuesta = await Axios.post('/cotizacion/nueva-cotizacion', cotizacion,{
                headers:{'autorizacion':token}
            });

            const mensaje = respuesta.data.mensaje

            Swal.fire({
                icon:'success',
                title:mensaje,
                showConfirmButton:false,
                timer:1500
            })
            e.target.reset();
    }

    

    return (
        <div>

            <div className="regwrapper fadeInDown container">
                <div className="user-details2 ">
                    <h3 className="active fadeIn first"> COTIZA AQUÍ </h3>
                           
                    <form onSubmit={cotizar}>
                        <Row xs="3" className="input-resev">
                            <Col>
                                <select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) =>setTipoEvento(e.target.value)}>
                                    <option defaultValue>Seleccione evento:</option>
                                    <option value="Matrimonio">Matrimonio</option>
                                    <option value="Grado">Grado</option>
                                    <option value="Cumpleaños">Cumpleaños</option>
                                    <option value="Reunión Empresarial">Reunión Empresarial</option>
                                </select>
                            </Col>
                            <Col>
                                <select name="tipoEspacio" id="tipoEspacio" className="fadeIn fourth " onChange={(e) =>setArea(e.target.value)}>
                                    <option defaultValue>Seleccione Area:</option>
                                    <option value="Salón presidencial">Salón presidencial</option>
                                    <option value="Salón gourmet">Salón gourmet</option>
                                    <option value="Piscina">Piscina</option>
                                    <option value="Terraza parilla">Terraza parilla</option>
                                    <option value="Terraza fútbol">Terraza fútbol</option>
                                    <option value="Parque">Parque</option>
                                </select>
                            </Col>

                            <Col>
                                <input type="number" className="fadeIn third" name="login" placeholder="Número de personas" onChange={(e) =>setNumPersonas(e.target.value)}required/>
                            </Col>
                        </Row>
                        <Row xs="2" className="input-resev">
                            <Col>
                            <input type="date" className="fadeIn fourth" name="login" placeholder="Fecha" onChange={(e) =>setFecha(e.target.value)} required/>
                            </Col>
                            <Col>
                            <input type="time" className="fadeIn fourth" name="login" placeholder="Hora" onChange={(e) =>setHora(e.target.value)} required/>
                            </Col>
                        </Row>
                        <Row xs="3" className="input-resev">
                            <Col>
                                <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setComida(e.target.value)}>
                                <option defaultValue>Seleccione Comida:</option>
                                    <option>Buffet</option>
                                    <option>Servicio Americano</option>
                                    <option>Bocadillos</option>
                                    <option>Cathering</option>
                                </select>
                               </Col>
                            <Col>
                                <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setBebidas(e.target.value)}>
                                    <option defaultValue>Seleccione Bebida:</option>
                                    <option>Vino Espumoso</option>
                                    <option>Whisky</option>
                                    <option>Tequila</option>
                                    <option>Agua</option>
                                </select>
                            </Col>

                            <Col>
                             <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setGrupoMusical(e.target.value)}>
                                <option defaultValue>Seleccione Musica:</option>
                                <option>DJ</option>
                                <option>Parranda Vallenata</option>
                                <option>Serenata</option>                                 
                            </select>
                                
                            </Col>
                        </Row>
                        <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)}></textarea>
                        <input type="submit" className="fadeIn fourth" value="COTIZAR"/>
                    </form>                    
                </div>
            </div>
        </div>
   )
}