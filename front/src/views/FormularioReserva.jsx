import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'
import '../assets/css/forms.css';


export default function  FormularioReserva () {

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

    
    const reservar=async(e)=>{
        e.preventDefault();
        const idSocio=sessionStorage.getItem('idsocio');
        const respuestaSocio= await Axios.get('/socio/listar-socioid/'+idSocio);
        const nombre=respuestaSocio.data.nombre;
        const apellido=respuestaSocio.data.apellido;
        const documento=respuestaSocio.data.documento;
        const correo=respuestaSocio.data.correo;
        const telefono=respuestaSocio.data.telefono;

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

            const respuesta = await Axios.post('/reserva/nueva-reserva', reserva);

            const mensaje = respuesta.data.mensaje

            Swal.fire({
                icon:'success',
                title:mensaje,
                showConfirmButton:false,
            })
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
        <div>

            <div className="regwrapper fadeInDown container">
                <div className="user-details2 ">
                    <h3 className="active fadeIn first"> RESERVA AQUÍ {sessionStorage.getItem('nombre')} </h3>
                           
                    <form onSubmit={reservar}>
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
                        <textarea className="fadeIn fourth input-resev" name="textarea" rows="8" cols="40" placeholder="Adicionales" onChange={(e) =>setAdicionales(e.target.value)}></textarea>
                        <input type="submit" className="fadeIn fourth" value="RESERVAR"/>
                    </form>                    
                </div>
            </div>
        </div>
   )
}