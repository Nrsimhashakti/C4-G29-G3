import React from 'react'
import {Link} from "react-router-dom";
import logo from '../assets/images/logo.png';



export const NavBarSocio = () => {
    const salir=()=>{
        sessionStorage.clear();
        window.location.href='/'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={menu}>
                <Link className="navbar-brand" to=" /#">
                    <img src={logo} width="250" height="120" style={imagen} alt=""></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/cotizacion" className="nav-link"><i className="fas fa-book"></i>COTIZAR</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reserva" className="nav-link"><i className="fas fa-wine-glass"></i>RESERVAR</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/historial" className="nav-link"><i className="fas fa-clipboard"></i>HISTORIAL</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/micuenta" className="nav-link"><i className="fas fa-id-card"></i>MI CUENTA</Link>
                        </li>
                       
                        
                      
                      
                    
                        <li className="nav-item">
                            <Link to="/inicio" onClick={()=>salir()} className="nav-link"><i className="fas fa-sign-out-alt"></i>SALIR</Link>
                        </li>
                        <li className="nav-item" style={{marginLeft: "100px"}}>
                            <Link className="nav-link" to="#"> <i className='fas fa-user'></i> Bienvenid@ {sessionStorage.getItem('nombre')} </Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const menu = {
    backgroundColor: '#263555'
  };

const imagen ={
    borderRadius : "20px",
    marginLeft : "5px"
}