const {Router}=require('express');
const router=Router()
const ReservaCtrl= require('../controllers/Reserva.controller')


router.post('/nueva-reserva', ReservaCtrl.crearReserva)
router.get('/listar-reservas', ReservaCtrl.listar)
router.get('/listar-reserva/:id', ReservaCtrl.listarId)
router.get('/listar-reservas-socio/:id', ReservaCtrl.listarReservas_Socio)
router.delete('/eliminar-reserva/:id', ReservaCtrl.eliminarReserva)
router.put('/actualizar-reserva/:id',  ReservaCtrl.actualizarReserva)
router.get('/buscar-reserva/:documento', ReservaCtrl.buscarReserva)


module.exports=router;