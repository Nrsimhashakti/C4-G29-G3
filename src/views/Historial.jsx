import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'



export default function Historial () {
    const [reservas,setReservas]=useState([])

    useEffect(()=>{
        obtenerReservas()
        
    },[])
    

     const obtenerReservas= async()=>{
            const id=sessionStorage.getItem('idsocio');
            const token= sessionStorage.getItem('token');
            const respuesta= await Axios.get('/reserva/listar-reservas-socio/' +id,{
                headers:{'autorizacion':token} 
            });
            console.log(respuesta.data)
            setReservas(respuesta.data)
        }

       
    
    return(
        <div>
        {/* mostrar empleado */}
        <section>
            <div className="">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 style={titulo}>Reservas de {sessionStorage.getItem('nombre')}</h3>

                            </div>
                           

                            <table className="table table-responsive-lg table-striped">
                                <thead className='text-white' style={{backgroundColor: " #263555"}}>
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
                                    <th scope="col">ACCIONES</th>
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

const titulo={
    textAlign: "left",
    fontSize: "42px"

}