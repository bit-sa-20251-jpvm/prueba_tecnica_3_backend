const express = require('express');
const router = express.Router();
const {crearRuleta, getRuletas, abrirRuleta, apostarRuleta, cerrarRuleta} = require('../controllers/ruleta.controller');

router.post('/crear', crearRuleta);
router.get('/traer', getRuletas);
router.put('/abrir/:id', abrirRuleta);
router.put('/apostar/:id', apostarRuleta);
router.put('/cerrar/:id', cerrarRuleta);

module.exports = router;