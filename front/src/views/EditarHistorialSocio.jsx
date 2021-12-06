import React, { useState ,useEffect} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'


export default function EditarHistorialSocio(props) {
    
    const[tipo_eventos, setTipoEventos]=useState([])
    const[eventoselect, setEventoSelect]=useState('')

    const[areas, setAreas]=useState([])
    const[areaselect, setAreaSelect]=useState('')

    const[num_personas, setNumPersonas]=useState('')
    const[fecha, setFecha]=useState('')
    const[hora, setHora]=useState('')
    const[comida, setComida]=useState('')
    const[bebidas, setBebidas]=useState('')
    const[grupo_musical, setGrupoMusical]=useState('')
    const[adicionales, setAdicionales]=useState('')

    useEffect(()=>{
        obtenerReservas()
        setTipoEventos(['Matrimonio','Grado','Cumpleaños','Reunion Empresarial'])
        setAreas(['Salón presidencial','Salón Gourtmet','Piscina','Terraza Parrilla', 'Terraza Fútbol'])

    },[])

    const obtenerReservas= async()=>{
        const id=props.match.params.id
        const respuesta= await Axios.get('/reserva/listar-reserva/'+id)

        console.log(respuesta.data);
        setEventoSelect(respuesta.data.tipo_evento)
        setNumPersonas(respuesta.data.num_personas)
        setAreaSelect(respuesta.data.area)
        setFecha(respuesta.data.fecha)
        setHora(respuesta.data.hora)
        setComida(respuesta.data.comida)
        setBebidas(respuesta.data.bebidas)
        setGrupoMusical(respuesta.data.grupo_musical)
        setAdicionales(respuesta.data.adicionales)
     
    }

    const actualizar= async(e)=>{
        e.preventDefault();
        const id=props.match.params.id
        const reserva={
                tipo_evento: eventoselect,
                num_personas,
                area: areaselect,
                fecha,
                hora,
                comida,
                bebidas,
                grupo_musical,
                adicionales,

        }

        const respuesta= await Axios.put('/reserva/actualizar-reserva/'+id,reserva)
        const mensaje=respuesta.data.mensaje

        
        Swal.fire({
              
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })

            //   setTimeout(()=>{
                  window.location.href='/historial'
            //   },1500)
    }

    return(
        <div className="container col-md-6 mt-4">
        {/* <!--=======content================================--> */}
            <div className="regwrapper fadeInDown">
                <div className="user-details2 ">
                <h3>Editar</h3>
                    <div className="">
                        <form onSubmit={actualizar}>
                            <Row xs="3" className="input-resev">
                                <Col><select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) => setEventoSelect(e.target.value)} value={eventoselect}>
                                        {
                                            tipo_eventos.map(tipo_evento=>
                                            <option key={tipo_evento}>
                                                {tipo_evento}
                                            </option>)
                                        }
                                    </select></Col>
                                <Col><select name="tipoEspacio" id="tipoEspacio" className="fadeIn fourth " onChange={(e) =>setAreaSelect(e.target.value)} value={areaselect}>
                                        {
                                            areas.map(area =>
                                            <option key={area}>
                                                {area}
                                            </option>    
                                            )

                                        }
                                    </select></Col>

                                <Col><input type="number" className="fadeIn third" name="login" placeholder="Número de personas" onChange={e =>setNumPersonas(e.target.value)} value={num_personas}/></Col>
                            </Row>
                            <Row xs="2" className="input-resev">
                                <Col><input type="date" className="fadeIn fourth" name="login" placeholder="Fecha" onChange={e =>setFecha(e.target.value)} value={fecha} /></Col>
                                <Col><input type="time" className="fadeIn fourth" name="login" placeholder="Hora" onChange={e =>setHora(e.target.value)} value={hora}/></Col>
                            </Row>
                            <Row xs="3" className="input-resev">
                                <Col>
                                    <select name="comida" id="comida" className="fadeIn fourth" onChange={(e) =>setComida(e.target.value)} value={comida}>
                                        <option defaultValue>Seleccione la comida:</option>
                                        <option value="Buffet">Buffet</option>
                                        <option value="Servicio Americano">Servicio Americano</option>
                                        <option value="Bocadillos">Bocadillos</option>
                                        <option value="Cathering">Cathering</option>
                                    </select>
                                </Col>
                                <Col>
                                    <select name="bebidas" id="bebidas" className="fadeIn fourth" onChange={(e) =>setBebidas(e.target.value)} value={bebidas}>
                                        <option defaultValue>Seleccione las bebidas:</option>
                                        <option value="Vino Espumoso">Vino Espumoso</option>
                                        <option value="Wisky">Wisky</option>
                                        <option value="Tequila">Tequila</option>
                                        <option value="Agua">Agua</option>
                                    </select>
                                </Col>
                                <Col>
                                    <select name="grupo_musical" id="grupo_musical" className="fadeIn fourth" onChange={(e) =>setGrupoMusical(e.target.value)} value={grupo_musical}>
                                        <option defaultValue>Seleccione la música:</option>
                                        <option value="DJ">DJ</option>
                                        <option value="Parranda Vallenata">Parranda Vallenata</option>
                                        <option value="Serenata">Serenata</option>
                                    </select>
                                </Col>
                            </Row>
                            <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)} value={adicionales}></textarea>
                            <input type="submit" className="fadeIn fourth" value="ACTUALIZAR"/>
                            <Row xs="1">
                                <input  className="fadeIn fourth" onClick={e =>{e.preventDefault(); window.location.href='/historial'}}  rows="auto" cols="auto" type="submit" value="VOLVER A HISTORIAL DE RESERVAS"/>
                            </Row>                     

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
