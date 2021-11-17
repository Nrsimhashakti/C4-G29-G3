<<<<<<< HEAD
<<<<<<< HEAD
const Auth={}

const jwt = require('jsonwebtoken')

Auth.verificarToken = (req, res, netx)=>{

    if(!req.headers.autorizacion){
        return res.json({
            mensaje:'No estas autorizado'
        })
    }
    const token= req.headers.autorizacion
    if(token==='null'){
        return res.json({
            mensaje: 'No estas autorizado'
        })
    }
    jwt.verify(token, 'secreta',(error, resultado) =>{
        if(error) return res.json({
            mensaje: 'No estas autorizado '
        })
        netx()
    })
}

module.exports=Auth
=======
const Auth={}

const jwt = require('jsonwebtoken')

Auth.verificarToken = (req, res, netx)=>{

    if(!req.headers.autorizacion){
        return res.json({
            mensaje:'No estas autorizado'
        })
    }
    const token= req.headers.autorizacion
    if(token==='null'){
        return res.json({
            mensaje: 'No estas autorizado'
        })
    }
    jwt.verify(token, 'secreta',(error, resultado) =>{
        if(error) return res.json({
            mensaje: 'No estas autorizado '
        })
        netx()
    })
}

module.exports=Auth
>>>>>>> 533c1a2 (Actualizacion rep)
=======
const Auth={}

const jwt = require('jsonwebtoken')

Auth.verificarToken = (req, res, netx)=>{

    if(!req.headers.autorizacion){
        return res.json({
            mensaje:'No estas autorizado'
        })
    }
    const token= req.headers.autorizacion
    if(token==='null'){
        return res.json({
            mensaje: 'No estas autorizado'
        })
    }
    jwt.verify(token, 'secreta',(error, resultado) =>{
        if(error) return res.json({
            mensaje: 'No estas autorizado '
        })
        netx()
    })
}

module.exports=Auth
>>>>>>> 892eadf778f59cc5c00e62bdcbf08953885a3976
