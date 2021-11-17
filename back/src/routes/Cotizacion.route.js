<<<<<<< HEAD
<<<<<<< HEAD
const {Router}=require('express');
const router=Router()
const CotizacionCtrl= require('../controllers/Cotizacion.controller')


router.post('/nueva-cotizacion', CotizacionCtrl.crearCotizacion)
router.get('/listar-cotizaciones', CotizacionCtrl.listar)
router.get('/listar-cotizacion/:id', CotizacionCtrl.listarId)
router.delete('/eliminar-cotizacion/:id', CotizacionCtrl.eliminarCotizacion)
router.put('/actualizar-cotizacion/:id',  CotizacionCtrl.actualizarCotizacion)
router.get('/buscar-cotizacion/:documento', CotizacionCtrl.buscarCotizacion)

=======
const {Router}=require('express');
const router=Router()
const CotizacionCtrl= require('../controllers/Cotizacion.controller')


router.post('/nueva-cotizacion', CotizacionCtrl.crearCotizacion)
router.get('/listar-cotizaciones', CotizacionCtrl.listar)
router.get('/listar-cotizacion/:id', CotizacionCtrl.listarId)
router.delete('/eliminar-cotizacion/:id', CotizacionCtrl.eliminarCotizacion)
router.put('/actualizar-cotizacion/:id',  CotizacionCtrl.actualizarCotizacion)
router.get('/buscar-cotizacion/:documento', CotizacionCtrl.buscarCotizacion)

>>>>>>> 533c1a2 (Actualizacion rep)
=======
const {Router}=require('express');
const router=Router()
const CotizacionCtrl= require('../controllers/Cotizacion.controller')


router.post('/nueva-cotizacion', CotizacionCtrl.crearCotizacion)
router.get('/listar-cotizaciones', CotizacionCtrl.listar)
router.get('/listar-cotizacion/:id', CotizacionCtrl.listarId)
router.delete('/eliminar-cotizacion/:id', CotizacionCtrl.eliminarCotizacion)
router.put('/actualizar-cotizacion/:id',  CotizacionCtrl.actualizarCotizacion)
router.get('/buscar-cotizacion/:documento', CotizacionCtrl.buscarCotizacion)

>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=router;