import React, { useState ,useEffect} from 'react'
import {Row, Col} from 'reactstrap'
import Axios from 'axios'
import Swal from 'sweetalert2'
import '../assets/css/forms.css'


export default function Micuenta (props) {

    const[id,setId]=useState('')
    const[nombre,setNombre]=useState('')
    const[apellido,setApellido]=useState('')
    const[correo,setCorreo]=useState('')
    const[telefono,setTelefono]=useState('')

    useEffect(() => {
        obtenerDatos();
    }, [])

    const obtenerDatos = async()=>{

        setId(sessionStorage.getItem('idsocio'));
        const respuesta= await Axios.get('/socio/listar-socioid/'+id);
        setNombre(respuesta.data.nombre);
        setApellido(respuesta.data.apellido);
        setCorreo(respuesta.data.correo);
        setTelefono(respuesta.data.telefono);
    }

    const actualizar= async(e)=>{
        // const id=sessionStorage.getItem('idsocio');
        e.preventDefault();
      
        const socio={
            nombre,
            apellido,
            correo,
            telefono
        }

        const respuesta= await Axios.put('/socio/actualizar-socio/'+id,socio)
        const mensaje=respuesta.data.mensaje
        
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })
    }

    return (
      
        <div className="regwrapper fadeInDown container">
            <Row xs="">
                <input  className="input-resev1"  rows="8" cols="40" type="submit" value="Mis reservas"/>
            </Row>
            <h3>Datos personales</h3>
            <p>Actualiza tu informacion personal </p>
            
    
            <div className="user-details2">       
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
       
    )
}