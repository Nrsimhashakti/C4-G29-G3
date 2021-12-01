import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css'


export default function RegistroCotizacion(){

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
        const respuesta= await Axios.get('/socio/listar-socio/'+documento);

        if (respuesta.data.documento) {

            setNombre(respuesta.data.nombre);
            setApellido(respuesta.data.apellido);
            setDocumento(respuesta.data.documento);
            setCorreo(respuesta.data.correo);
            setTelefono(respuesta.data.telefono);

            console.log("nombre: "+nombre);
            const mensaje = respuesta.data.mensaje

            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(()=>{
                setValidar(true);
            },1500)
        }
    }

    const cotizar=async(e)=>{
        e.preventDefault();
        const cotizacion={
            nombre, apellido, documento, correo, telefono, tipo_evento, num_personas,
            area, fecha, hora, comida, bebidas, grupo_musical, adicionales}

            const respuesta = await Axios.post('/cotizacion/nueva-cotizacion', cotizacion);

            const mensaje = respuesta.data.mensaje

            Swal.fire({
                icon:'success',
                title:mensaje,
                showConfirmButton:false,
            })
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
                            <input  className="" onClick={e =>{e.preventDefault(); window.location.href='/historialcotizacion'}} type="submit" value="VOLVER A HISTORIAL COTIZACIONES" style={{"width":"90%"}}/>
                        </form>
                    </div>
                    <div className="input-resev" hidden={validar? false:true}>
                    <h3 className="active fadeIn first" > REGISTRAR COTIZACIÓN DE SOCIO </h3>

                    {/* <!-- Formulario de Registro de Cotización --> */}
                    <form onSubmit={cotizar}>
                        <Row xs="" className="info">
                            <p>Documento: {documento}</p>
                        </Row>
                        <Row xs="2" className="info">
                            <Col><p>Nombre: {nombre}</p></Col>
                            <Col><p>Apellido: {apellido}</p></Col>
                        </Row>
                        <Row xs="2" className="info">
                            <Col><p>Teléfono: {telefono}</p></Col>
                            <Col><p>Correo: {correo}</p></Col>                                
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
                        <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="20" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)}></textarea>
                        <Row xs="2">
                            <Col><input type="submit" className="fadeIn fourth" value="REGISTRAR COTIZACION"/></Col>
                            <Col><input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); setValidar(false);}} type="submit" value="REGISTRAR COTIZACION DE OTRO SOCIO"/></Col>
                        </Row> 
                        <Row xs="1">
                            <input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); window.location.href='/historialcotizacion'}}  rows="auto" cols="auto" type="submit" value="VOLVER A HISTORIAL DE COTIZACIONES"/>
                        </Row>                         
                    </form> 
                   
                    </div>
                           
               </div>
            </div>
        </div>
   )
}