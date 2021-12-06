import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css'


export default function RegistroCotizacion(){

    const[idSocio, setIdSocio]=useState('')
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
    const [precios, setPrecios] = useState({});
    const [precio, setPrecio]=useState(0);
    const [flagMostrar, setFlagMostrar]=useState(false);
    const hoy = new Date();
    const anio = hoy.getFullYear();


    const validarSocio = async(e) => {
        e.preventDefault();
        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/socio/listar-socio/'+documento,{
            headers:{'autorizacion':token} 
        });

        if (respuesta.data.documento) {
            setIdSocio(respuesta.data._id);
            setNombre(respuesta.data.nombre);
            setApellido(respuesta.data.apellido);
            setDocumento(respuesta.data.documento);
            setCorreo(respuesta.data.correo);
            setTelefono(respuesta.data.telefono);

            setValidar(true);
            e.target.reset();
            obtenerPrecios();
        }
    }

    const obtenerPrecios = async() => {

        const token= sessionStorage.getItem('token');
        const respuestaCot= await Axios.get('/precio/listar-precios/' + anio,{
           headers:{'autorizacion':token}
        });
       setPrecios(respuestaCot.data);
   }

    const cotizar=async(e)=>{
        e.preventDefault();

        const precioTipo=obtPrecioTipo();
        const precioArea=obtPrecioArea();
        const precioComida=obtPrecioComida();
        const precioBebidas=obtPrecioBebidas();
        const precioMusica=obtPrecioMusica();
        const precioTotal=precioTipo+precioArea+precioComida+precioBebidas+precioMusica;
        setPrecio(precioTotal);

        const cotizacion={
            nombre, apellido, documento, correo, telefono, tipo_evento, num_personas,
            area, fecha, hora, comida, bebidas, grupo_musical, adicionales, socio:idSocio, precio:precioTotal}
        const token= sessionStorage.getItem('token');
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
        setFlagMostrar(true);
    }

    const obtPrecioTipo=()=>{
        switch (tipo_evento) {
        case 'Matrimonio':
            return precios.matrimonio;
        case 'Grado':
            return precios.grado;
        case 'Cumpleaños':
            return precios.cumpleanios;
        case 'Reunión Empresarial':
            return precios.empresarial;
        default:
            return 0;
    }
}

    const obtPrecioArea=()=>{

        switch (area) {
            case 'Salón presidencial':
                return precios.presidencial;
            case 'Salón gourmet':
                return precios.gourmet;
            case 'Piscina':
                return precios.piscina;
            case 'Terraza parilla':
                return precios.parilla;
            case 'Terraza fútbol':
                return precios.futbol;
            case 'Parque':
                return precios.parque;
            default:
                return 0;
        }
    }

    const obtPrecioComida=()=>{

        switch (comida) {
            case 'Buffet':
                return (precios.buffet*num_personas);
            case 'Servicio Americano':
                return (precios.servicio*num_personas);
            case 'Bocadillos':
                return (precios.bocadillos*num_personas);
            case 'Cathering':
                return (precios.cathering*num_personas);
            default:
                return 0;
        }
    }

    const obtPrecioBebidas=()=>{
    switch (bebidas) {
        case 'Vino Espumoso':
            return(precios.vino*num_personas);
        case 'Wisky':
            return(precios.wisky*num_personas);
        case 'Tequila':
            return(precios.tequila*num_personas);
        case 'Agua':
            return(precios.agua*num_personas);
        default:
            return 0;
    }
}

const obtPrecioMusica=()=>{
    switch (grupo_musical) {
        case 'DJ':
            return precios.dj;
        case 'Parranda Vallenata':
            return precios.parranda;
        case 'Serenata':
            return precios.serenata;
        default:
            return 0;
    }
}

const convertirReserva =async()=>{
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
     const token= sessionStorage.getItem('token');
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
    window.location.href='/historialreservas'
}

    return (
        <div className="registrocot">
            <div className="regwrapper fadeInDown container" hidden={validar? true:false}>
                <div className="user-details2 ">
                    <div className="input-resev" >
                        <h3 className="fadeIn first" > VALIDAR SOCIO </h3>
                        <form onSubmit={validarSocio}>
                            <div  className="validacion">
                                <div><input type="text" className="fadeIn first"  name="documento" placeholder="Documento"  onChange={(e) =>setDocumento(e.target.value)} required/></div>
                                <div><input type="submit" className="fadeIn first" value="VALIDAR SOCIO"/></div>
                            </div>
                            <input  className="" onClick={e =>{e.preventDefault(); window.location.href='/historialcotizacion'}} type="submit" value="VOLVER A HISTORIAL COTIZACIÓN" style={{"width":"90%"}}/>
                        </form>
                    </div>
                </div>
            </div>
            <div className="regwrapper fadeInDown container"hidden={validar && !flagMostrar? false:true}>
                <div className="user-details2 ">

                    <div className="input-resev formulario">
                        <h3 className="active fadeIn first" > REGISTRAR COTIZACIÓN DE SOCIO </h3>

                        {/* <!-- Formulario de Registro de Cotización --> */}
                        <form onSubmit={cotizar}>
                            <Row xs="2" className="info" style={{"marginBottom":"0px"}}>
                                <Col><input type="text" className="fadeIn first" name="login" placeholder={documento} disabled/></Col>
                            </Row>
                            <Row xs="2" className="info"style={{"margin":"0px"}}>
                                <Col style={{"margin":"0px"}}><input type="text" className="fadeIn first" name="login" placeholder={nombre} disabled/></Col>
                                <Col style={{"margin":"0px"}}><input type="text" className="fadeIn first" name="login" placeholder={apellido} disabled/></Col>
                            </Row>
                            <Row xs="2" className="info">
                                <Col><input type="text" className="fadeIn first" name="login" placeholder={telefono} disabled/></Col>
                                <Col><input type="text" className="fadeIn first" name="login" placeholder={correo} disabled/></Col>
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
                                <Col><input type="submit" className="fadeIn fourth" value="REGISTRAR COTIZACIÓN"/></Col>
                                <Col><input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); setValidar(false);}} type="submit" value="REGISTRAR COTIZACIÓN DE OTRO SOCIO"/></Col>
                            </Row> 
                            <Row xs="1">
                                <input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); window.location.href='/historialcotizacion'}}  rows="auto" cols="auto" type="submit" value="VOLVER A HISTORIAL DE COTIZACIÓN"/>
                            </Row>                     
                        </form> 
                    </div>
                </div>
            </div>
                    {/* <div className="input-resev" > */}
            <div className="mostwrapper fadeInDown container" hidden={validar && flagMostrar? false:true}>
                <div className="user-details2">
                    <h3 className="active fadeIn first"> COTIZACIÓN </h3>
                    <table className="table table-responsive-lg table-striped" style={{fontSize:"16px"}}>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">DESCRIPCIÓN</th>
                                <th scope="col">PRECIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{"marginLeft": "20px"}}>
                                <td style={{"textAlign": "left"}}><span> Tipo de Evento: </span>{tipo_evento}</td>
                                <td>$ {new Intl.NumberFormat().format(obtPrecioTipo())}</td>
                            </tr>
                            <tr>
                                <td style={{"textAlign": "left"}}><span> Tipo de Área: </span>{area}</td>
                                <td>$ {new Intl.NumberFormat().format(obtPrecioArea())}</td>
                            </tr>
                            <tr>
                                <td style={{"textAlign": "left"}}><span> Tipo de Comida: </span>{comida} para {num_personas} personas</td>
                                <td>$ {new Intl.NumberFormat().format(obtPrecioComida())}</td>
                            </tr>
                            <tr>
                                <td style={{"textAlign": "left"}}><span> Tipo de bebidas: </span>{bebidas} para {num_personas} personas</td>
                                <td>$ {new Intl.NumberFormat().format(obtPrecioBebidas())}</td>
                            </tr>
                            <tr>
                                <td style={{"textAlign": "left"}}><span> Tipo de Música: </span>{grupo_musical}</td>
                                <td>$ {new Intl.NumberFormat().format(obtPrecioMusica())}</td>
                            </tr>
                            <tr className='total'>
                                <td style={{"fontWeight": "bold"}}>TOTAL:</td>
                                <td style={{"fontWeight": "bold"}}>$ {new Intl.NumberFormat().format(precio)}</td>
                            </tr>
                        </tbody>
                    </table> 
                    <div className="opciones">
                        <div><input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); setFlagMostrar(false);}} type="submit" value="FORMULARIO DE COTIZACIÓN"/></div>                   
                        <div><input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); convertirReserva();}} type="submit" value="CONVERTIR EN RESERVA"/></div>
                    </div>
                </div>
            </div>
        </div>
   )
}