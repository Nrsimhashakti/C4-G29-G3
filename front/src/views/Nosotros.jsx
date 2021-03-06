import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import fuente from '../assets/images/fuente.jpg';
import restaurante from '../assets/images/restaurante.jpg';
import sendero from '../assets/images/sendero.jpg';
import piscina from '../assets/images/piscina.jpg';
import '../assets/css/grid.css';
import '../assets/css/style.css';
import '../assets/css/main.css';


export const Nosotros = () => {
    return (
        <div className="nosotros">
            <div className="main">
                {/* <div className="content"> */}
                {/* <div className="container_12"> */}
                    <figure id="banner_nosotros">
                        <img className="img-responsive" style={{"width": "100%"}} src="https://www.clubcampestre.co/wp-content/uploads/2019/03/el-club-banner-club-campestre-1366x450_c.jpg" alt="El Club" title="El Club"/>
                    </figure>
                    <Container>
                    <Row xs="2" style={{"margin-top": "30px"}}>
                        <Col style={{"width":"60%"}}>
                        <h3>Historia</h3>
                        <p className="text1">Siendo la misión del Club netamente deportiva en sus inicios y dado el gusto de sus fundadores por este deporte, se conformó un sólido equipo de fútbol que hizo respetar el campo hasta tal punto que llegó a conocerse como la “cancha sagrada”. <br />
                                                    Era tal el nivel futbolístico de la selección del Club que, en repetidas ocasiones, equipos profesionales como Millonarios y Santafé eran invitados a compartir este terreno de juego. Con la llegada de las grandes glorias taurinas durante las temporadas de toros, la afición al fútbol propició que la cancha sagrada acogiera equipos cuyos integrantes eran los maestros Luis Miguel Dominguín “Chicuelo” segundo, Antonio Ordóñez, Dámaso Gómez, César Girón, Pepe Cáceres y Joselillo de Colombia, entre otros, quienes año tras año visitaban nuestra cancha para compartir momentos de alegría y diversión.
                                                    Cuando el Club Campestre Santafé cambió su nombre por el de Club Campestre la Colina, el fútbol sufrió una época de transición donde florecieron otros deportes. Más tarde, gracias al empuje y deseo de continua mejora de sus socios, el Club Campestre la Colina, en sus pequeñas pero acogedoras instalaciones, sería el origen de lo que hoy en día conocemos como el CLUB CAMPESTRE LOS ARRAYANES.</p>
                        </Col>
                        <Col style={{"width":"40%"}}>
                            {/* <img classname="img-responsive" style={{"width":"800px", "height": "400px"}} src='../assets/images/fuente.jpg' src={fuente} alt=""/> */}
                            <img className="img-responsive" style={{"width":"100%", "height": "auto", "margin-top":"70px"}} src={fuente} alt=""/>
                        </Col>
                    </Row>
                    <Row xs="2">
                        <Col>
                            <img className="img-responsive" style={{"width":"600px", "height": "300px"}} src={restaurante} alt=""/>
                        </Col>
                        <Col style={{"padding-top":"5%"}}>
                            <h3 className="h3">Misión</h3>
                            <p className="text1 tx2">Somos un Club privado que brinda satisfacción a los socios sus familias, amigos y colaboradores en ambientes de esparcimiento deportivo, social, cultural y recreativo. Comprometidos con el servicio, la responsabilidad social y ambiental.</p>
                        </Col>
                    </Row>

                    <Row xs="2">
                        <Col>
                        <img className="img-responsive" style={{"width":"600px", "height": "300px"}} src={sendero} alt="" />
                        </Col>
                        <Col style={{"padding-top":"5%"}}>
                        <h3 className="h3">Visión</h3>
                        <p className="text1 tx2">Arrayanes será un Club Campestre vigente, como la mejor opción de esparcimiento e interacción social para los socios y sus familias. Reconocido por generar experiencias memorables.</p>
                        </Col>
                    </Row>

                    <Row xs="2">
                        <Col>
                            <img className="img-responsive" style={{"width":"600px", "height": "300px"}} src={piscina} alt="El Club" title="El Club"/>
                        </Col>
                        <Col>
                            <h3 className="h3">Nuestros Valores</h3>
                            <p className="text1 tx3">En el Club Campestre los Arrayanes promovemos y nos comprometemos con los siguientes valores como base fundamental:</p>
                        
                            <ul className="list2">
                                <li>Integridad y Honestidaad</li>
                                <li>Equidad y Justicia</li>
                                <li>Excelencia en el servicio</li>
                                <li>Administracion con sentido humano</li>
                                <li>Union familiar</li>
                                <li>Compromiso Social y Ambiental</li>
                            </ul>
                        </Col>
                    </Row>

                    </Container>

                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}
