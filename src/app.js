const express =require('express'); // Microframework de backend
const helmet=require('helmet'); // paquete de seguridad para ocultar información de la app
const morgan =require('morgan');//
const cors =require('cors');
const rateLimit = require("express-rate-limit");


const app =express(); //incializa el framework

// Configuraciones
const apiLimiter = rateLimit({ // Limite de peticiones a una ruta
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // Conexiones maximas
  });

app.set('trust proxy', 1); // trabaja en conjunto con el limite de peticiones a las ruta
app.use(apiLimiter); // Limita conexiones
app.set('port',process.env.PORT || 25109 ); // comunication port
app.use(helmet()); //ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP.

// Middleware
app.use(cors());
app.use(morgan('dev')); // transaction views in  'dev'  format
app.use(express.urlencoded({extended:false,limit: '2000kb'})); // Esto es para pode recibir datos enviados
app.use(express.json({limit: '1mb'})); // for read .JSON format

// Routes
app.use(require('./routes/account.route'));
app.use(require('./routes/autentication.route'));
app.use(require('./routes/admin.route'));
app.use(require('./routes/module.route'));
app.use(require('./routes/subModule.route'));
app.use(require('./routes/roles.route'));
app.use(require('./routes/panel.route'));
app.use(require('./routes/permission.route'));
app.use(require('./routes/grantRoles.route'));
app.use(require('./routes/departament.route'));
app.use(require('./routes/employeefile.route'));
app.use(require('./routes/membership.route'));
app.use(require('./routes/generals.route'));
app.use(require('./routes/appointmet.route'));
app.use(require('./routes/medicalReport.route'));

app.listen(app.get('port'),function(){
    console.log('cema is working in port:', app.get('port'));

})