import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css'

export default function RegistroReservas (){

    const[nombre, setNombre]=useState('')
    const[apellido, setApellido]=useState('')
    const[documento, setDocumento]=useState('')
    const[correo, setCorreo]=useState('')
    const[telefono, setTelefono]=useState('')
    const[tipo_evento, setTipoEvento]=useState('');
    const[num_personas, setNumPersonas]=useState('');
    const[area, setArea]=useState('');
    const[fecha, setFecha]=useState('');
    const[hora, setHora]=useState('');
    const[comida, setComida]=useState('');
    const[bebidas, setBebidas]=useState('');
    const[grupo_musical, setGrupoMusical]=useState('');
    const[adicionales, setAdicionales]=useState('');
    const[validar, setValidar]=useState(false);

    const validarSocio = async(e) => {
        e.preventDefault();
        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/socio/listar-socio/'+documento,{
            headers:{'autorizacion':token} 
        });

        if (respuesta.data.documento) {

            setNombre(respuesta.data.nombre);
            setApellido(respuesta.data.apellido);
            setDocumento(respuesta.data.documento);
            setCorreo(respuesta.data.correo);
            setTelefono(respuesta.data.telefono);

            setValidar(true);
            e.target.reset();
        }
    }

    const reservar=async(e)=>{

        e.preventDefault();
        const reserva={
            nombre, apellido, documento, correo, telefono, tipo_evento, num_personas,
            area, fecha, hora, comida, bebidas, grupo_musical, adicionales}
        const token= sessionStorage.getItem('token');
        const respuesta = await Axios.post('/reserva/nueva-reserva', reserva,{
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
        <div className="registrocot">
            <div className="regwrapper fadeInDown container">
                <div className="user-details2 ">
                    <div className="input-resev" hidden={validar? true:false}>
                        <h3 className="fadeIn first" > VALIDAR SOCIO </h3>
                        <form onSubmit={validarSocio}>
                            <div  className="validacion">
                                <div><input type="text" className="fadeIn first"  name="documento" placeholder="Documento"  onChange={(e) =>setDocumento(e.target.value)} required/></div>
                                <div><input type="submit" className="fadeIn first" value="VALIDAR SOCIO"/></div>
                            </div>
                            <input  className="" onClick={e =>{e.preventDefault(); window.location.href='/historialreservas'}} type="submit" value="VOLVER A HISTORIAL RESERVAS" style={{"width":"90%"}}/>
                        </form>
                    </div>
                    <div className="input-resev" hidden={validar? false:true}>
                    <h3 className="active fadeIn first" > REGISTRAR RESERVA DE SOCIO </h3>

                    {/* <!-- Formulario de Registro de Reserva --> */}
                    <form onSubmit={reservar}>
                        <Row xs="2" className="info" style={{"textAlign":"left"}}>
                        <Col><p className="fadeIn first" >Documento: {documento}</p></Col><Col></Col>
                        </Row>
                        <Row xs="2" className="info">
                            <Col><p className="fadeIn first">Nombre: {nombre}</p></Col>
                            <Col><p className="fadeIn first">Apellido: {apellido}</p></Col>
                        </Row>
                        <Row xs="2" className="info">
                            <Col><p className="fadeIn first">Teléfono: {telefono}</p></Col>
                            <Col><p className="fadeIn first">Correo: {correo}</p></Col>                                
                        </Row>
                        <Row xs="3" className="input-resev">
                            <Col><select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) =>setTipoEvento(e.target.value)}>
                                    <option defaultValue>Seleccione evento:</option>
                                    <option value="Matrimonio">Matrimonio</option>
                                    <option value="Grado">Grado</option>
                                    <option value="Cumpleaños">Cumpleaños</option>
                                    <option value="Reunión Empresarial">Reunión Empresarial</option>
                                </select></Col>
                            <Col><select name="tipoEspacio" id="tipoEspacio" className="fadeIn fourth " onChange={(e) =>setArea(e.target.value)}>
                                    <option defaultValue>Seleccione Area:</option>
                                    <option value="Salón presidencial">Salón presidencial</option>
                                    <option value="Salón gourmet">Salón gourmet</option>
                                    <option value="Piscina">Piscina</option>
                                    <option value="Terraza parilla">Terraza parilla</option>
                                    <option value="Terraza fútbol">Terraza fútbol</option>
                                    <option value="Parque">Parque</option>
                                </select></Col>

                            <Col><input type="number" className="fadeIn third" name="login" placeholder="Número de personas" onChange={(e) =>setNumPersonas(e.target.value)}required/></Col>
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
                                    <option defaultValue>Seleccione la música:</option>
                                    <option value="DJ">DJ</option>
                                    <option value="Parranda Vallenata">Parranda Vallenata</option>
                                    <option value="Serenata">Serenata</option>
                                </select>
                            </Col>
                        </Row>
                        <textarea className="fadeIn fourth input-resev" name="textarea" rows="6" cols="20" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)}></textarea>
                        <Row xs="2">
                            <Col><input type="submit" className="fadeIn fourth" value="REGISTRAR RESERVA"/></Col>
                            <Col><input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); setValidar(false);}} type="submit" value="REGISTRAR RESERVA DE OTRO SOCIO"/></Col>
                        </Row> 
                        <Row xs="1">
                            <input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); window.location.href='/historialreservas'}}  rows="auto" cols="auto" type="submit" value="VOLVER A HISTORIAL DE RESERVAS"/>
                        </Row>                     
                        </form> 
                    </div>
                </div>
            </div>
        </div>
   )
}