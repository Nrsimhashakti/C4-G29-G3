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
    const[estadoComida, setEstadoComida]=useState({buffet:false, servicio:false, bocadillos: false, cathering:false});
    const[estadoBebidas, setEstadoBebidas]=useState({vino:false, wisky:false, tequila: false, agua:false});
    const[estadoMusica, setEstadoMusica]=useState({dj:false, parranda:false, serenata: false});
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

    const onChangeComida=(tipo)=>{

        if(tipo==='buffet' && !estadoComida.buffet){
            setEstadoComida({buffet:true, servicio:false, bocadillos: false, cathering:false});
            setComida('Buffet');
        }else if (tipo==='servicio' && !estadoComida.servicio) {
            setEstadoComida({buffet:false, servicio:true, bocadillos: false, cathering:false});
            setComida('Servicio Americano');
        }else if (tipo==='bocadillos' && !estadoComida.bocadillos) {
            setEstadoComida({buffet:false, servicio:false, bocadillos: true, cathering:false});
            setComida('Bocadillos');
        }else if (tipo==='cathering' && !estadoComida.cathering) {
            setEstadoComida({buffet:false, servicio:false, bocadillos: false, cathering:true});
            setComida('Cathering');
        }else{
            setEstadoComida({buffet:false, servicio:false, bocadillos: false, cathering:false});
            setComida('');
        }
    }

    const onChangeBebidas=(tipo)=>{

        if(tipo==='vino' && !estadoBebidas.vino){
            setEstadoBebidas({vino:true, wisky:false, tequila: false, agua:false});
            setBebidas('Vino Espumoso');
        }else if (tipo==='wisky' && !estadoBebidas.wisky) {
            setEstadoBebidas({vino:false, wisky:true, tequila: false, agua:false});
            setBebidas('Wisky');
        }else if (tipo==='tequila' && !estadoBebidas.tequila) {
            setEstadoBebidas({vino:false, wisky:false, tequila: true, agua:false});
            setBebidas('Tequila');
        }else if (tipo==='agua' && !estadoBebidas.agua) {
            setEstadoBebidas({vino:false, wisky:false, tequila: false, agua:true});
            setBebidas('Agua');
        }else{
            setEstadoBebidas({vino:false, wisky:false, tequila: false, agua:false});
            setBebidas('');
        }
    }

    const onChangeMusica=(tipo)=>{

        if(tipo==='dj' && !estadoMusica.dj){
            setEstadoMusica({dj:true, parranda:false, serenata: false});
            setGrupoMusical('DJ');
        }else if (tipo==='parranda' && !estadoMusica.parranda) {
            setEstadoMusica({dj:false, parranda:true, serenata: false});
            setGrupoMusical('Parranda Vallenata');
        }else if (tipo==='serenata' && !estadoMusica.serenata) {
            setEstadoMusica({dj:false, parranda:false, serenata: true});
            setGrupoMusical('Serenata');
        }else{
            setEstadoMusica({dj:false, parranda:false, serenata: false});
            setGrupoMusical('');
        }
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
                                <h2 className="fadeIn fourth">COMIDA</h2>
                                <label className="fadeIn fourth"><input type="checkbox" name="Comida" value="Buffet" onChange={(e) =>onChangeComida('buffet')} checked={estadoComida.buffet} /> Buffet</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" name="Comida" value="Servicio" onChange={(e) =>onChangeComida('servicio')} checked={estadoComida.servicio} /> Servicio Americano</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" name="Comida" value="Bocadillos" onChange={(e) =>onChangeComida('bocadillos')} checked={estadoComida.bocadillos} /> Bocadillos</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" name="Comida" value="Cathering" onChange={(e) =>onChangeComida('cathering')} checked={estadoComida.cathering} /> Cathering</label><br />                            
                            </Col>
                            <Col>
                                <h2 className="fadeIn fourth">BEBIDAS</h2>
                                <label className="fadeIn fourth"><input type="checkbox" id="vino" name="Vino Espumoso" onChange={(e) =>onChangeBebidas('vino')} checked={estadoBebidas.vino} /> Vino Espumoso</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="wisky" name="Wisky" onChange={(e) =>onChangeBebidas('wisky')} checked={estadoBebidas.wisky}/> Wisky</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="tequila" name="Tequila" onChange={(e) =>onChangeBebidas('tequila')} checked={estadoBebidas.tequila}/> Tequila</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="agua" name="Agua" onChange={(e) =>onChangeBebidas('agua')} checked={estadoBebidas.agua}/> Agua</label><br />
                            </Col>

                            <Col>
                                <h2 className="fadeIn fourth">MÚSICA</h2>
                                <label className="fadeIn fourth"><input type="checkbox" id="DJ" name="DJ" onChange={(e) =>onChangeMusica('dj')} checked={estadoMusica.dj}/> DJ</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="Parranda Vallenata" name="Parranda Vallenata" onChange={(e) =>onChangeMusica('parranda')} checked={estadoMusica.parranda}/> Parranda Vallenata</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="Serenata" name="Serenata" onChange={(e) =>onChangeMusica('serenata')} checked={estadoMusica.serenata}/> Serenata</label><br />
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