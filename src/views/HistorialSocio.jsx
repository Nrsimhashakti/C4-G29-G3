import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2';
import { Col, Row } from 'reactstrap';
import '../assets/css/historial.css';



export default function HistorialSocio (){

    const [socios, setSocios]=useState([]);
    const [docBuscado, setDocBuscado]=useState();
    const [renderizar, setRenderizar]=useState([]);
    const [id, setId]=useState('');

    const [nombre, setNombre]=useState('');
    const [apellido, setApellido]=useState('');
    const [documento, setDocumento]=useState('');
    const [correo, setCorreo]=useState('');
    const [telefono, setTelefono]=useState('');


    useEffect(()=>{
        obtenerSocios()
    },[])

     const obtenerSocios = async() => {

        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/socio/listar-socios',{
            headers:{'autorizacion':token} 
        });
        setSocios(respuesta.data)
        setRenderizar(respuesta.data);
    }
    const buscarSocio = () => {

        setRenderizar(socios.filter((socio,i) => socio.documento === docBuscado));
    }

    const mostrarTodos=()=>{
        
        setRenderizar(socios);
    }

    const obtenerInfo=async(id)=>{

        console.log(id);
        setId(id);
        const token= sessionStorage.getItem('token');
        const respuesta= await Axios.get('/socio/listar-socioid/' + id,{
            headers:{'autorizacion':token} 
        });

        setNombre(respuesta.data.nombre);
        setApellido(respuesta.data.apellido);
        setDocumento(respuesta.data.documento);
        setCorreo(respuesta.data.correo);
        setTelefono(respuesta.data.telefono);

        console.log("nombre: "+nombre);
    }

    const actualizar = async(e)=>{
        e.preventDefault();

        const socio={nombre, apellido, documento, correo, telefono};

        const token= sessionStorage.getItem('token')
        const respuesta=await Axios.put('/socio/actualizar-socio/' + id, socio,{
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
            window.location.href='/historialsocio'
        },1500)
    }

    const eliminar= async(id)=>{
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.delete('/socio/eliminar-socio/'+id,{
            headers:{'autorizacion':token} 
        });
        const mensaje=respuesta.data.mensaje

        Swal.fire({
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        obtenerSocios();
    }

    
    return (
        <div className="historial">
        <section>
                <div>
                    <div className="card">
                        <div className="card-header">
                            <h3>Historial de Socios</h3>
                        </div>
                        <div className="input-group rounded">

                        <Row xs="2" className="opciones">
                                <Col>
                                    <Row xs="2" >
                                        
                                            <form>
                                            <div className="input-group rounded" style={{width:"500px", marginLeft: "50px"}}>
                                                <input type="search" className="form-control"  placeholder="Documento" aria-label="Search"
                                                aria-describedby="search-addon" onChange={(e)=>setDocBuscado(e.target.value)} required />
                                                <span className="input-group-text border-0" id="search-addon" onClick={buscarSocio}>
                                                    <i className="fas fa-search"></i>
                                                </span>

                                            </div>
                                          
                                        
                                            </form>
                                          
                                    </Row>
                                </Col>
                            </Row>
                            <input onClick={mostrarTodos} style={boton} type="submit" value="Mostrar Todos los Socios"/>

                            <div>
                                <input style={boton} onClick={e =>{e.preventDefault(); window.location.href='/registroSocio'}} type="submit" value="Crear Socio"/>
                            </div>

                        </div>

                        <table className="table table-responsive-lg table-striped">
                            <thead className='text-white' style={{backgroundColor: " #263555"}}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">APELLIDO</th>
                                    <th scope="col">DOCUMENTO</th>
                                    <th scope="col">CORREO</th>
                                    <th scope="col">TELÉFONO</th>
                                   
                                    <th scope="col">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    renderizar.map((socio,i)=>(
                                        <tr key={socio._id}>
                                            <td>{i+1}</td>
                                            <td>{socio.nombre}</td>
                                            <td>{socio.apellido}</td>
                                            <td>{socio.documento}</td>
                                            <td>{socio.correo}</td>
                                            <td>{socio.telefono}</td>                                    
                                            <td className="accionesSocio"> 
                                                <button className="editar" data-toggle="modal" data-target="#actualizarSocio" onClick={()=>obtenerInfo(socio._id)}><i className="fas fa-edit" ></i></button>
                                                <button className="eliminar" onClick={()=>eliminar(socio._id)}>Eliminar</button>                                                    
                                                
                                                                                             
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> 
                </div>
        </section>

        <div className="modal fade" id='actualizarSocio'>
            <div className="modal-dialog modal-lg regwrapper fadeInDown">
            <div className="modal-content user-details2">
                <div className="modal-body">
                    <div className="modal-header">
                        <h3 className="active fadeIn first"> ACTUALIZAR </h3>
                        <button className='close'  data-dismiss='modal'>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={actualizar}>
                    <Row xs="2" className="input-resev">
                        <Col><input type="text" className="fadeIn first" name="nombre" placeholder="Nombre" onChange={e =>setNombre(e.target.value)}  value={nombre} /></Col>      
                        <Col><input type="text" className="fadeIn first" name="apellido" placeholder="Apellido" onChange={e =>setApellido(e.target.value)} value={apellido}/></Col>
                        <Col><input type="text" className="fadeIn first"  name="correo" placeholder="Correo"  onChange={e =>setCorreo(e.target.value)} value={correo}/></Col>
                        <Col><input type="text" className="fadeIn first" name="telefono" placeholder="Telefono" onChange={e =>setTelefono(e.target.value)} value={telefono}/></Col>
                    </Row>
                    <Row xs="3" col="4"> 
                        <input type="submit" value="Actualizar"/>
                    </Row>
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
    marginRight: "0px"


}