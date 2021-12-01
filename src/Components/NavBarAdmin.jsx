import React from 'react'
import {Link} from "react-router-dom";
import logo from '../assets/images/logo.png';


export default function NavBarAdmin () {
    const salir=()=>{
        sessionStorage.clear();
        window.location.href='/'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={menu}>
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="250" height="120" style={imagen} alt=""></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/historialsocio" className="nav-link"><i className="fas fa-clipboard-list"></i>HISTORIAL SOCIO</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/historialreservas" className="nav-link"><i className="fas fa-clipboard"></i>HISTORIAL RESERVAS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/historialcotizacion" className="nav-link"><i className="fas fa-clipboard-check"></i>HISTORIAL COTIZACIÓN</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/" onClick={()=>salir()} className="nav-link"><i className="fas fa-sign-out-alt"></i>SALIR</Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const menu = {
    backgroundColor: '#263555',
    fontSize: '16px'
    
  };

const imagen ={
    borderRadius : "20px",
    marginLeft : "50px"
}
