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

              setTimeout(()=>{
                  window.location.href='/historial'
              },1500)


    }

    return(
        <div className="container col-md-6 mt-4">
        {/* <!--=======content================================--> */}
            <div className="regwrapper fadeInDown">
                <div className="card-header user-details2 ">
                <h3>Editar</h3>
                    <div className="card-body">
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
                                    <h2 className="fadeIn fourth">COMIDA</h2>
                                    <label className="fadeIn fourth"><input type="checkbox" id="buffet" name="buffet" onChange={e =>setComida(e.target.value)} value={comida} /> Buffet</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="americano" name="americano" onChange={e =>setComida(e.target.value)} value={comida}/> Servicio Americano</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="bocadillos" name="bocadillos" onChange={e =>setComida(e.target.value)} value={comida} /> Bocadillos</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="cathering" name="cathering" onChange={e =>setComida(e.target.value)} value={comida}/> Cathering</label><br />
                                </Col>
                                <Col>
                                    <h2 className="fadeIn fourth">BEBIDAS</h2>
                                    <label className="fadeIn fourth"><input type="checkbox" id="vino" name="vino" onChange={e =>setBebidas(e.target.value)} value={bebidas}/> Vino Espumoso</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="wisky" name="wisky" onChange={e =>setBebidas(e.target.value)} value={bebidas} /> Wisky</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="tequila" name="tequila" onChange={e =>setBebidas(e.target.value)} value={bebidas}/> Tequila</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="agua" name="agua" onChange={e =>setBebidas(e.target.value)} value={bebidas} /> Agua</label><br />
                                </Col>

                                <Col>
                                    <h2 className="fadeIn fourth">MÚSICA</h2>
                                    <label className="fadeIn fourth"><input type="checkbox" id="dj" name="dj" onChange={(e) =>setGrupoMusical(e.target.value)}/> DJ</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="parranda" name="parranda" onChange={(e) =>setGrupoMusical(e.target.value)}/> Parranda Vallenata</label><br />
                                    <label className="fadeIn fourth"><input type="checkbox" id="serenata" name="serenata" onChange={(e) =>setGrupoMusical(e.target.value)}/> Serenata</label><br />
                                </Col>
                            </Row>
                            <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)} value={adicionales}></textarea>
                            <input type="submit" className="fadeIn fourth" value="ACTUALIZAR"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
