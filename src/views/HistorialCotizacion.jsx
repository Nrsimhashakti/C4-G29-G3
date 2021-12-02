import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import { Col, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import '../assets/css/historial.css';


export default function HistorialCotizacion (){

    const [cotizaciones, setCotizaciones]=useState([]);
    const [docBuscado, setDocBuscado]=useState();
    const [renderizar, setRenderizar]=useState([]);
    const [id, setId]=useState('');

    const [nombre, setNombre]=useState('');
    const [apellido, setApellido]=useState('');
    const [documento, setDocumento]=useState('');
    const [correo, setCorreo]=useState('');
    const [telefono, setTelefono]=useState('');
    const [tipoEvento, setTipoEvento]=useState('');
    const [numPersonas, setNumPersonas]=useState();
    const [area, setArea]=useState('');
    const [fecha, setFecha]=useState('');
    const [hora, setHora]=useState('');
    const [comida, setComida]=useState('');
    const [bebida, setBebidas]=useState('');
    const [grupoMusical, setGrupoMusical]=useState('');
    const [adicionales, setAdicionales]=useState('');
   // const [flagCheck, setFlagCheck]=useState(fase);

    useEffect(()=>{
        obtenerCotizaciones();
    },[])

    const obtenerCotizaciones = async() => {

        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/cotizacion/listar-cotizaciones/',{
            headers:{'autorizacion':token} 
        });
        setCotizaciones(respuesta.data);
        setRenderizar(respuesta.data);
    }

    const buscarCotizacion = () => {

        setRenderizar(cotizaciones.filter((cotizacion,i) => cotizacion.documento === docBuscado));
    }

    const mostrarTodas=()=>{
        
        setRenderizar(cotizaciones);
    }

    const obtenerInfo=async(id)=>{

        setId(id);
        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/cotizacion/listar-cotizacion/' + id,{
            headers:{'autorizacion':token} 
        });
        setNombre(respuesta.data.nombre);
        setApellido(respuesta.data.apellido);
        setDocumento(respuesta.data.documento);
        setCorreo(respuesta.data.correo);
        setTelefono(respuesta.data.telefono);
        setTipoEvento(respuesta.data.tipo_evento);
        setNumPersonas(respuesta.data.num_personas);
        setArea(respuesta.data.area);
        setFecha(respuesta.data.fecha);
        setHora(respuesta.data.hora);
        setComida(respuesta.data.comida);
        setBebidas(respuesta.data.bebidas);
        setGrupoMusical(respuesta.data.grupo_musical);
        setAdicionales(respuesta.data.adicionales);
    }

    const actualizar = async(e)=>{
        e.preventDefault();

        const cotizacion={
            nombre, apellido, documento, correo, telefono, tipoEvento, numPersonas, 
            area, fecha, hora, comida, bebida, grupoMusical, adicionales
        }

        const token= sessionStorage.getItem('token');
        const respuesta=await Axios.put('/cotizacion/actualizar-cotizacion/' + id, cotizacion,{
            headers:{'autorizacion':token} 
        });

        const mensaje= respuesta.data.mensaje

        Swal.fire({
              
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(()=>{
            window.location.href='/historialcotizacion'
        },1500)
        e.target.reset();
    }

    const eliminar= async(id)=>{

        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.delete('/cotizacion/eliminar-cotizacion/'+id,{
            headers:{'autorizacion':token} 
        });

        const mensaje=respuesta.data.mensaje

        Swal.fire({
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

              obtenerCotizaciones()
    }

   
    
    return (
        <div>
            <section>
                <div className="historial">
                    <div className="card">
                        <div className="card-header">
                            <h3>Historial de Cotizaciones</h3>
                        </div>
                        <div className="input-group rounded">

                            <Row xs="2" className="opciones">
                                <Col>
                                    <Row xs="2">
                                       
                                            <form>
                                            <div className="input-group rounded" style={{width:"500px", marginLeft: "50px"}}>
                                                <input type="search" className="form-control" placeholder="Documento" aria-label="Search"
                                                aria-describedby="search-addon" onChange={(e)=>setDocBuscado(e.target.value)} required />
                                                <span className="input-group-text border-0" id="search-addon" onClick={buscarCotizacion}>
                                                    <i className="fas fa-search"></i>
                                                </span>
                                            </div>
                                            </form>
                                        
                                    </Row>
                                </Col>

                            </Row>
                            <input style={boton} onClick={mostrarTodas} type="submit" value="Mostrar Todos las Cotizaciones"></input>

                            <div>
                                <input style={boton} onClick={e =>{e.preventDefault(); window.location.href='/registrocotizacion'}} type="submit" value="Crear Cotizacion"/>
                            </div>
                        </div>
                        <table className="table table-responsive-lg table-striped" style={{fontSize:"16px"}}>
                            <thead className='text-white' style={{backgroundColor: " #263555"}}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">APELLIDO</th>
                                    <th scope="col">DOCUMENTO</th>
                                    <th scope="col">CORREO</th>
                                    <th scope="col">TELÉFONO</th>
                                    <th scope="col">TIPO EVENTO</th>
                                    <th scope="col">NUMERO DE PERSONAS</th>
                                    <th scope="col">AREA</th>
                                    <th scope="col">FECHA</th>
                                    <th scope="col">HORA</th>
                                    <th scope="col">COMIDA</th>
                                    <th scope="col">BEBIDAS</th>
                                    <th scope="col">GRUPO MUSICAL</th>
                                    <th scope="col">ADICIONALES</th>
                                    <th scope="col">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    renderizar.map((cotizacion,i)=>(
                                        <tr key={cotizacion._id}>
                                            <td>{i+1}</td>
                                            <td>{cotizacion.nombre}</td>
                                            <td>{cotizacion.apellido}</td>
                                            <td>{cotizacion.documento}</td>
                                            <td>{cotizacion.correo}</td>
                                            <td>{cotizacion.telefono}</td>
                                            <td>{cotizacion.tipo_evento}</td>
                                            <td>{cotizacion.num_personas}</td>
                                            <td>{cotizacion.area}</td>
                                            <td>{cotizacion.fecha}</td>
                                            <td>{cotizacion.hora}</td>
                                            <td>{cotizacion.comida}</td>
                                            <td>{cotizacion.bebidas}</td>
                                            <td>{cotizacion.grupo_musical}</td>
                                            <td>{cotizacion.adicionales}</td>
                                            <td className="acciones"> 
                                                <button className="editar" data-toggle="modal" data-target="#actualizarCotizacion" onClick={()=>obtenerInfo(cotizacion._id)}><i className="fas fa-edit"></i></button>
                                                <button className="eliminar" onClick={()=>eliminar(cotizacion._id)}><i className="far fa-trash-alt"></i></button>                                                    
                                            </td>                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="modal fade" id='actualizarCotizacion'>
                <div className="modal-dialog modal-lg regwrapper fadeInDown container">
                    <div className="modal-content user-details2">
                        <div className="modal-body">
                            <div className="modal-header">
                                <h3 className="active fadeIn first"> ACTUALIZAR </h3>
                                <button className='close'  data-dismiss='modal'>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={actualizar}>
                                <Row xs="3" className="input-resev">
                                    <Col><select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) =>setTipoEvento(e.target.value)} value={tipoEvento}>
                                            <option defaultValue>Seleccione evento:</option>
                                            <option value="Matrimonio">Matrimonio</option>
                                            <option value="Grado">Grado</option>
                                            <option value="Cumpleaños">Cumpleaños</option>
                                            <option value="Reunión Empresarial">Reunión Empresarial</option>
                                        </select></Col>
                                    <Col><select name="tipoEspacio" id="tipoEspacio" className="fadeIn third " onChange={(e) =>setArea(e.target.value)} value={area}>
                                            <option defaultValue>Seleccione Area:</option>
                                            <option value="Salón presidencial">Salón presidencial</option>
                                            <option value="Salón gourmet">Salón gourmet</option>
                                            <option value="Piscina">Piscina</option>
                                            <option value="Terraza parilla">Terraza parilla</option>
                                            <option value="Terraza fútbol">Terraza fútbol</option>
                                            <option value="Parque">Parque</option>
                                        </select></Col>
                                    <Col><input type="number" className="fadeIn third" name="login" placeholder="Número de personas" onChange={(e) =>setNumPersonas(e.target.value)} value={numPersonas} required /></Col>
                                </Row>
                                <Row xs="2" className="input-resev">
                                    <Col><input type="date" className="fadeIn third" name="login" placeholder="Fecha" onChange={(e) =>setFecha(e.target.value)} value={fecha} required/></Col>
                                    <Col><input type="time" className="fadeIn third" name="login" placeholder="Hora" onChange={(e) =>setHora(e.target.value)} value={hora} required/></Col>
                                </Row>
                                <Row xs="3" className="input-resev">
                            <Col>
                                <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setComida(e.target.value)} value={comida}>
                                <option defaultValue>Seleccione Comida:</option>
                                    <option>Buffet</option>
                                    <option>Servicio Americano</option>
                                    <option>Bocadillos</option>
                                    <option>Cathering</option>
                                </select>
                            </Col>
                            <Col>
                                <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setBebidas(e.target.value)} value={bebida}>
                                <option defaultValue>Seleccione bebida:</option>
                                    <option>Vino Espumoso</option>
                                    <option>Whisky</option>
                                    <option>Tequila</option>
                                    <option>Agua</option>
                                </select>
                            </Col>

                            <Col>
                             <select name="comida" id="comida" className="fadeIn fourth " onChange={(e) =>setGrupoMusical(e.target.value)} value={grupoMusical}>
                                <option defaultValue>Seleccione Musica:</option>
                                <option>DJ</option>
                                <option>Parranda Vallenata</option>
                                <option>Serenata</option>                                 
                            </select>
                                
                            </Col>
                        </Row>
                                <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)} value={adicionales}></textarea>
                                <input type="submit" className="fadeIn fourth" value="ACTUALIZAR"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const boton={
    fontSize: "20px",
    borderRadius: "5px",
    border: "1px solid #263555",
    borderBottomWidth: "2px",
    transition: "all 0.3s ease",
    fontFamily: "Pathway Gothic One, sans-serif",
    backgroundColor: " #263555",
    marginLeft:"100px",
    marginRight: "0px",
    paddingLeft: "20px",
    paddingRight: "20px"
}