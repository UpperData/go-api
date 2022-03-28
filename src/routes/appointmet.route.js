const express =require ('express');
const router= express.Router();
const appoint=require('../controllers/appointment.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');
router.post('/APpOINtMeNt/NEW/',forceBrute.notBruteSecure,auth.autorizedRole(['5']), appoint.appointmentNew); // Regsitra cita
router.put('/APPOIntMent/edit/',forceBrute.notBruteSecure,auth.autorizedRole(['5']), appoint.updateAppointment); // Modifica cita
router.get('/APPOINtMent/get/:id',forceBrute.notBruteSecure,auth.autorizedRole(['5']), appoint.getAppointment); // consulta cita
module.exports=router;