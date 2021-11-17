<<<<<<< HEAD
<<<<<<< HEAD
const {Router}=require('express');
const router=Router()
const SocioCtrl= require('../controllers/Socio.controller');

router.post('/nuevo-socio',SocioCtrl.crearSocio)
router.post('/login', SocioCtrl.login)
router.get('/listar-socios', SocioCtrl.listar)
router.get('/listar-socio/:documento', SocioCtrl.listarDoc)
router.delete('/eliminar-socio/:id', SocioCtrl.eliminarSocio)
router.put('/actualizar-socio/:id',  SocioCtrl.actualizarSocio)
router.get('/buscar-socio/:documento', SocioCtrl.buscarSocio)



=======
const {Router}=require('express');
const router=Router()
const SocioCtrl= require('../controllers/Socio.controller');

router.post('/nuevo-socio',SocioCtrl.crearSocio)
router.post('/login', SocioCtrl.login)
router.get('/listar-socios', SocioCtrl.listar)
router.get('/listar-socio/:documento', SocioCtrl.listarDoc)
router.delete('/eliminar-socio/:id', SocioCtrl.eliminarSocio)
router.put('/actualizar-socio/:id',  SocioCtrl.actualizarSocio)
router.get('/buscar-socio/:documento', SocioCtrl.buscarSocio)



>>>>>>> 533c1a2 (Actualizacion rep)
=======
const {Router}=require('express');
const router=Router()
const SocioCtrl= require('../controllers/Socio.controller');

router.post('/nuevo-socio',SocioCtrl.crearSocio)
router.post('/login', SocioCtrl.login)
router.get('/listar-socios', SocioCtrl.listar)
router.get('/listar-socio/:documento', SocioCtrl.listarDoc)
router.delete('/eliminar-socio/:id', SocioCtrl.eliminarSocio)
router.put('/actualizar-socio/:id',  SocioCtrl.actualizarSocio)
router.get('/buscar-socio/:documento', SocioCtrl.buscarSocio)



>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
module.exports=router;