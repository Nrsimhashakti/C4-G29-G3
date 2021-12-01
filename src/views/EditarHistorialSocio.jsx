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

    const[comidas, setComidas]=useState([])
    const[comidaselect, setComidaSelect]=useState('')


    const[bebidas, setBebidas]=useState([])
    const[bebidasselect, setBebidasSelect]=useState('')

    const[grupo_musical, setGrupoMusical]=useState([])
    const[musicaselect, setMusicaSelect]=useState('')

    const[adicionales, setAdicionales]=useState('')

   


    useEffect(()=>{
        obtenerReservas()
        setTipoEventos(['Matrimonio','Grado','Cumpleaños','Reunion Empresarial'])
        setAreas(['Salón presidencial','Salón Gourtmet','Piscina','Terraza Parrilla', 'Terraza Fútbol'])
        setComidas(['Buffet','Servicio Americano','Bocadillos','Cathering'])
        setBebidas(['Vino Espumoso','Whisky','Tequila','Agua'])
        setGrupoMusical(['DJ','Parranda Vallenata','Serenata'])

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
        setComidaSelect(respuesta.data.comida)
        setBebidasSelect(respuesta.data.bebidas)
        setMusicaSelect(respuesta.data.grupo_musical)
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
                comida: comidaselect,
                bebidas: bebidasselect,
                grupo_musical: musicaselect ,
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

              setTimeout(()=>{
                  window.location.href='/historial'
              },1500)


    }

   

    return(
        <div className="container col-md-6 mt-4" style={{width:"750px"}}>
        {/* <!--=======content================================--> */}
            <div className="regwrapper fadeInDown">
                <div className="user-details2 ">
                <h3>Editar</h3>
                    <div className="card-body">
                        <form onSubmit={actualizar}>
                            <Row xs="3" className="input-resev">
                                <Col>
                                <label>Seleccione Evento:</label>
                                    <select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) => setEventoSelect(e.target.value)} value={eventoselect}>
                                        {
                                            tipo_eventos.map(tipo_evento=>
                                            <option key={tipo_evento}>
                                                {tipo_evento}
                                            </option>)
                                        }
                                    </select>
                                </Col>
                                <Col>
                                <label>Seleccione Area:</label>
                                <select name="tipoEspacio" id="tipoEspacio" className="fadeIn fourth " onChange={(e) =>setAreaSelect(e.target.value)} value={areaselect}>
                                        {
                                            areas.map(area =>
                                            <option key={area}>
                                                {area}
                                            </option>    
                                            )

                                        }
                                    </select></Col>

                                <Col>
                                <label style={{width:"180px"}}>Ingrese numero de personas:</label>
                                <input type="number" className="fadeIn third" name="login" placeholder="Número de personas" onChange={e =>setNumPersonas(e.target.value)} value={num_personas}/>
                                </Col>
                            </Row>
                            <Row xs="2" className="input-resev">
                                <Col>
                                <label>Fecha Evento:</label>
                                <input type="date" className="fadeIn fourth" name="login" placeholder="Fecha" onChange={e =>setFecha(e.target.value)} value={fecha} />
                                </Col>

                                <Col>
                                <label>Hora Evento:</label>
                                <input type="time" className="fadeIn fourth" name="login" placeholder="Hora" onChange={e =>setHora(e.target.value)} value={hora}/>
                                </Col>
                            </Row>
                            <Row xs="3" className="input-resev">
                                <Col>
                                <label>Comida:</label>
                                    <select name="comida" id="comida" className="fadeIn third" onChange={(e) => setComidaSelect(e.target.value)} value={comidaselect}>
                                        {
                                            comidas.map(comida=>
                                            <option key={comida}>
                                                {comida}
                                            </option>
                                            )
                                        }
                                    </select>  
                                </Col>
                                <Col>
                                <label>Bebida:</label>
                                <select name="bebida" id="bebida" className="fadeIn third" onChange={(e) => setBebidasSelect(e.target.value)} value={bebidasselect}>
                                        {
                                            bebidas.map(bebidas=>
                                            <option key={bebidas}>
                                                {bebidas}
                                            </option>
                                            )
                                        }
                                </select>                          
                                </Col>
                                <Col>
                                <label>Musica:</label>
                                <select name="bebida" id="bebida" className="fadeIn third" onChange={(e) => setMusicaSelect(e.target.value)} value={musicaselect}>
                                        {
                                            grupo_musical.map(grupo_musical=>
                                            <option key={grupo_musical}>
                                                {grupo_musical}
                                            </option>
                                            )
                                        }
                                </select>  
                                   
                                </Col>
                            </Row>
                            <Row className="input-resev">
                                <Col>
                                <label style={{marginLeft:"15px"}} > Adicionales</label>
                                <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="" onChange={(e) =>setAdicionales(e.target.value)} value={adicionales}></textarea>
                                </Col>
                            </Row>

                            <input type="submit" className="fadeIn fourth" value="ACTUALIZAR"/>
                            <input type="submit" onClick={e =>{e.preventDefault(); window.location.href='/historial'}} className="fadeIn fourth" value="ATRAS"/>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
