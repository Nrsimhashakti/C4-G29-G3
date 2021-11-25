import React from "react";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { RouterApp } from './routers/RouterApp';
// import { RouterSocio } from './routers/RouterSocio';
// import { RouterAdmin } from './routers/RouterAdmin';
import { Footer } from './Components/Footer';





import { Login } from "./views/Login";

import { Inicio } from "./views/Inicio";
import { Nosotros } from "./views/Nosotros";
import { Eventos } from "./views/Eventos";
import { Galeria } from "./views/Galeria";
import { LoginAdmin } from "./views/LoginAdmin";

import { NavBarSocio } from "./Components/NavBarSocio";
import FormularioCotizacion from "./views/FormularioCotizacion";
import FormularioReserva from "./views/FormularioReserva";
import Historial from "./views/Historial";
import Micuenta from "./views/Micuenta";
import NavBarApp from "./Components/NavBarApp";
import NavBarAdmin from "./Components/NavBarAdmin";
import HistorialReservas from "./views/HistorialReservas";
import HistorialSocio from "./views/HistorialSocio";
import HistorialCotizacion from "./views/HistorialCotizacion";

import EditarHistorialSocio from "./views/EditarHistorialSocio";
import RegistroSocio from "./views/RegistroSocio";
import RegistroCotizacion from "./views/RegistroCotizacion";






function App() {
  return (
    <Router>

      {/* USUARIO SIN REGISTRO */}
      <Route path='/' exact component={NavBarApp}/>
      <Route path='/nosotros' exact component={NavBarApp}/>
      <Route path='/eventos' exact component={NavBarApp}/>
      <Route path='/galeria' exact component={NavBarApp}/>
      <Route path='/login' exact component={NavBarApp}/>
      <Route path='/loginadmin' exact component={NavBarApp}/>


      <Route path='/' exact component={Inicio}/>
      <Route path='/nosotros' exact component={Nosotros}/>
      <Route path='/eventos' exact component={Eventos}/>
      <Route path='/galeria' exact component={Galeria}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/loginadmin' exact component={LoginAdmin}/>


      {/* USUARIO REGISTRADO */}

      <Route path='/menusocio' exact component={NavBarSocio}/>
      <Route path='/cotizacion' exact component={NavBarSocio}/>
      <Route path='/reserva' exact component={NavBarSocio}/>
      <Route path='/historial' exact component={NavBarSocio}/>
      <Route path='/micuenta' exact component={NavBarSocio}/>


      <Route path='/cotizacion' exact component={FormularioCotizacion}/>
      <Route path='/reserva' exact component={FormularioReserva}/>
      <Route path='/historial' exact component={Historial}/>
      <Route path='/micuenta' exact component={Micuenta}/>

      <Route path='/editar/:id' exact component={EditarHistorialSocio}/>

      {/* ADMINISTRADOR */}
      <Route path='/menuadmin' exact component={NavBarAdmin}/>
      <Route path='/historialreservas' exact component={NavBarAdmin}/>
      <Route path='/historialsocio' exact component={NavBarAdmin}/>
      <Route path='/historialcotizacion' exact component={NavBarAdmin}/>

      
      
      <Route path='/historialreservas' exact component={HistorialReservas}/>
      <Route path='/historialsocio' exact component={HistorialSocio}/>
      <Route path='/historialcotizacion' exact component={HistorialCotizacion}/>
      <Route path='/registrosocio' exact component={RegistroSocio}/>
      <Route path='/registrocotizacion' exact component={RegistroCotizacion}/>






      <Footer/>
    </Router>
  );
}

export default App;
