import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'


export default function Historial () {
    const [reservas,setReservas]=useState([])
    

     const obtenerReservas= async()=>{
            const id=sessionStorage.getItem('idsocio')
            const token= sessionStorage.getItem('token')
            const respuesta= await Axios.get('/reserva/listar-reservas-socio/' +id,
            {
                headers:{'autorizacion':token}
            })
            console.log(respuesta.data)
            setReservas(respuesta.data)
        }

        const eliminar= async(id)=>{
            const token= sessionStorage.getItem('token')
            const respuesta= await Axios.delete('/reserva/eliminar-reserva/'+id,{
                headers:{'autorizacion':token}
            })
    
            const mensaje=respuesta.data.mensaje
    
            Swal.fire({
                  
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
                  })
    
                  obtenerReservas()
    
        }
        
        const buscar=async(e)=>{
            if(e.target.value===''){
                return obtenerReservas()
            }
            const buscar= e.target.value
            const token= sessionStorage.getItem('token')
            const respuesta= await Axios.get(`/reserva/listar-reservas-socio/${buscar}/${sessionStorage.getItem('idsocio')}`,{
                headers:{'autorizacion':token}
    
            })
            setReservas(respuesta.data)
        }
    
    return(
        <div>
            <header className='py-2 bg-primary'>
                <div className="">
                    <div className="row">
                        <div className="col-md-6">
                            <h3><i className="fas fa-pencil-alt">Reservas</i></h3>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="navbar py-4">
                <div className="" style={{height: "100px", width:"800px"}}>

                
                <div className="col-md-3">
                    <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
                        <i className='fas fa-plus'></i>
                        Add Reservas         
                    </Link>
                </div>

                <div className="col-md-6 ml-auto">
                    <div className="input-group">
                        <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search' />
                    </div>

                </div>
                </div>

            </nav>

        {/* mostrar empleado */}
        <section>
            <div className="">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h1>Reservas de {sessionStorage.getItem('nombre')}</h1>

                            </div>

                            <table className="table table-responsive-lg table-striped">
                                <thead className='thead-dark'>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">TIPO EVENTO</th>
                                    <th scope="col">NUMERO DE PERSONAS</th>
                                    <th scope="col">AREA</th>
                                    <th scope="col">FECHA</th>
                                    <th scope="col">HORA</th>
                                    <th scope="col">COMIDA</th>
                                    <th scope="col">BEBIDAS</th>
                                    <th scope="col">GRUPO MUSICAL</th>
                                    <th scope="col">ADICIONALES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reservas.map((reserva,i)=>(

                                            <tr key={reserva._id}>
                                                <td>{i+1}</td>
                                                <td>{reserva.tipo_evento}</td>
                                                <td>{reserva.num_personas}</td>
                                                <td>{reserva.area}</td>
                                                <td>{reserva.fecha}</td>
                                                <td>{reserva.hora}</td>
                                                <td>{reserva.comida}</td>
                                                <td>{reserva.bebidas}</td>
                                                <td>{reserva.grupo_musical}</td>
                                                <td>{reserva.adicionales}</td>
                                                
                                                <td> 
                                                    <Link className='btn btn-warning mr-1' to={'/editar/'+reserva._id}>Editar</Link>
                                                    <button className='btn btn-danger mr-1' onClick={()=>eliminar(reserva._id)}>Eliminar</button>
                                                </td>



                                            </tr>
                                        

                                        ))
                                    }
                                    
                                </tbody>
                                </table>

                        </div>

                    </div>

                </div>
                
            </div>
        </section>


        </div>
        
    )
    
}
