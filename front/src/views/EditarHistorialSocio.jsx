import React, { useState ,useEffect} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row } from 'reactstrap'


export default function EditarHistorialSocio(props) {
    
    const [tipoEvento, setTipoEvento]=useState('');
    const [numPersonas, setNumPersonas]=useState();
    const [area, setArea]=useState('');
    const [fecha, setFecha]=useState('');
    const [hora, setHora]=useState('');
    const [comida, setComida]=useState('');
    const [bebidas, setBebidas]=useState('');
    const [grupoMusical, setGrupoMusical]=useState('');
    const [adicionales, setAdicionales]=useState('');
    const [estadoComida, setEstadoComida]=useState({buffet:false, servicio:false, bocadillos: false, cathering:false});
    const [estadoBebidas, setEstadoBebidas]=useState({vino:false, wisky:false, tequila: false, agua:false});
    const [estadoMusica, setEstadoMusica]=useState({dj:false, parranda:false, serenata: false});


    useEffect(()=>{
        obtenerReservas()
     

    },[])

    const obtenerReservas= async()=>{
        const id=props.match.params.id
        const respuesta= await Axios.get('/reserva/listar-reserva/'+id)

        console.log(respuesta.data);
        setTipoEvento(respuesta.data.tipo_evento);
        setNumPersonas(respuesta.data.num_personas);
        setArea(respuesta.data.area);
        setFecha(respuesta.data.fecha);
        setHora(respuesta.data.hora);
        setComida(respuesta.data.comida);
        setBebidas(respuesta.data.bebidas);
        setGrupoMusical(respuesta.data.grupo_musical);
        setAdicionales(respuesta.data.adicionales);

        if(comida==='Buffet'){
            setEstadoComida({buffet:true, servicio:false, bocadillos:false, cathering:false});
        }else if (comida==='Servicio Americano') {
            setEstadoComida({buffet:false, servicio:true, bocadillos:false, cathering:false});
        }else if (comida==='Bocadillos') {
            setEstadoComida({buffet:false, servicio:false, bocadillos:true, cathering:false});
        }else if (comida==='Cathering') {
            setEstadoComida({buffet:false, servicio:false, bocadillos:false, cathering:true});
        }else{
            setEstadoComida({buffet:false, servicio:false, bocadillos:false, cathering:false});
        }

        if(bebidas==='Vino Espumoso'){
            setEstadoBebidas({vino:true, wisky:false, tequila: false, agua:false});
        }else if (bebidas==='Wisky') {
            setEstadoBebidas({vino:false, wisky:true, tequila: false, agua:false});
        }else if (bebidas==='Tequila') {
            setEstadoBebidas({vino:false, wisky:false, tequila: true, agua:false});
        }else if (bebidas==='Agua') {
            setEstadoBebidas({vino:false, wisky:false, tequila: false, agua:true});
        }else{
            setEstadoBebidas({vino:false, wisky:false, tequila: false, agua:false});
        }

        if(grupoMusical==='DJ'){
            setEstadoMusica({dj:true, parranda:false, serenata: false});
        }else if (grupoMusical==='Parranda Vallenata' && !estadoMusica.parranda) {
            setEstadoMusica({dj:false, parranda:true, serenata: false});
        }else if (grupoMusical==='Serenata' && !estadoMusica.serenata) {
            setEstadoMusica({dj:false, parranda:false, serenata: true});
        }else{
            setEstadoMusica({dj:false, parranda:false, serenata: false});
        }
     
    }

    const actualizar= async(e)=>{
        e.preventDefault();
        const id=props.match.params.id
        const reserva={
                tipoEvento,
                numPersonas,
                area,
                fecha,
                hora,
                comida,
                bebidas,
                grupoMusical,
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

    return(
        <div className="container col-md-6 mt-4">
        {/* <!--=======content================================--> */}
            <div className="regwrapper fadeInDown">
                <div className="user-details2 ">
                <h3>Editar</h3>
                    <div className="">
                    <form onSubmit={actualizar}>
                        <Row xs="3" className="input-resev">
                            <Col><select name="tipoEvento" id="tipoEvento" className="fadeIn third" onChange={(e) =>setTipoEvento(e.target.value)} value={tipoEvento}>
                                    <option selected>Seleccione evento:</option>
                                    <option value="Matrimonio">Matrimonio</option>
                                    <option value="Grado">Grado</option>
                                    <option value="Cumpleaños">Cumpleaños</option>
                                    <option value="Reunión Empresarial">Reunión Empresarial</option>
                                </select></Col>
                            <Col><select name="tipoEspacio" id="tipoEspacio" className="fadeIn third " onChange={(e) =>setArea(e.target.value)} value={area}>
                                    <option selected>Seleccione Area:</option>
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
                            <Col><input type="date" className="fadeIn fourth" name="login" placeholder="Fecha" onChange={(e) =>setFecha(e.target.value)} value={fecha} required/></Col>
                            <Col><input type="time" className="fadeIn fourth" name="login" placeholder="Hora" onChange={(e) =>setHora(e.target.value)} value={hora} required/></Col>
                        </Row>
                        <Row xs="3" className="input-resev">
                        <Col>
                                <h2 className="fadeIn fourth">COMIDA</h2>
                                <label className="fadeIn fourth"><input type="checkbox" name="Comida" value="Buffet" onChange={(e) =>onChangeComida('buffet')} checked={estadoComida.buffet}/> Buffet</label><br />
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
                                <label className="fadeIn fourth"><input type="checkbox" id="DJ" name="DJ" onChange={(e) =>onChangeMusica('dj')} checked={estadoMusica.dj} value={grupoMusical}/> DJ</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="Parranda Vallenata" name="Parranda Vallenata" onChange={(e) =>onChangeMusica('parranda')} checked={estadoMusica.parranda}/> Parranda Vallenata</label><br />
                                <label className="fadeIn fourth"><input type="checkbox" id="Serenata" name="Serenata" onChange={(e) =>onChangeMusica('serenata')} checked={estadoMusica.serenata}/> Serenata</label><br />
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
