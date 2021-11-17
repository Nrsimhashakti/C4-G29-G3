<<<<<<< HEAD
<<<<<<< HEAD
const {Router}=require('express');
const router=Router()
const ReservaCtrl= require('../controllers/Reserva.controller')


router.post('/nueva-reserva', ReservaCtrl.crearReserva)
router.get('/listar-reservas', ReservaCtrl.listar)
router.get('/listar-reserva/:id', ReservaCtrl.listarId)
router.delete('/eliminar-reserva/:id', ReservaCtrl.eliminarReserva)
router.put('/actualizar-reserva/:id',  ReservaCtrl.actualizarReserva)
router.get('/buscar-reserva/:documento', ReservaCtrl.buscarReserva)
router.get('/listar-reservas-socio/:id', ReservaCtrl.listarEmpleados_Jefe)
=======
const {Router}=require('express');
const router=Router()
const ReservaCtrl= require('../controllers/Reserva.controller')


router.post('/nueva-reserva', ReservaCtrl.crearReserva)
router.get('/listar-reservas', ReservaCtrl.listar)
router.get('/listar-reserva/:id', ReservaCtrl.listarId)
router.delete('/eliminar-reserva/:id', ReservaCtrl.eliminarReserva)
router.put('/actualizar-reserva/:id',  ReservaCtrl.actualizarReserva)
router.get('/buscar-reserva/:documento', ReservaCtrl.buscarReserva)
router.get('/listar-reservas-socio/:id', ReservaCtrl.listarEmpleados_Jefe)
>>>>>>> 533c1a2 (Actualizacion rep)
=======
const {Router}=require('express');
const router=Router()
const ReservaCtrl= require('../controllers/Reserva.controller')


router.post('/nueva-reserva', ReservaCtrl.crearReserva)
router.get('/listar-reservas', ReservaCtrl.listar)
router.get('/listar-reserva/:id', ReservaCtrl.listarId)
router.delete('/eliminar-reserva/:id', ReservaCtrl.eliminarReserva)
router.put('/actualizar-reserva/:id',  ReservaCtrl.actualizarReserva)
router.get('/buscar-reserva/:documento', ReservaCtrl.buscarReserva)
router.get('/listar-reservas-socio/:id', ReservaCtrl.listarEmpleados_Jefe)
>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=router;