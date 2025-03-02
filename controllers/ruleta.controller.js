const Ruleta = require('../models/ruleta.model.js');

const crearRuleta = async (req, res) => {
    try {
        const ruleta = new Ruleta();
        await ruleta.save();
        return res.status(200).json({id:ruleta._id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRuletas = async (req, res) => {
    try {
        const ruletas = await Ruleta.find();
        return res.status(200).json(ruletas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const abrirRuleta = async (req, res) => {
    try {
        const ruleta = await Ruleta.findById(req.params.id);
        if (!ruleta) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        ruleta.abierta = true;
        await ruleta.save();
        return res.status(200).json({ message: "Ruleta abierta", ruleta });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const apostarRuleta = async (req, res) => {
    const { usuario, monto, tipo, numero, color } = req.body;
    try {
        const ruleta = await Ruleta.findById(req.params.id);
        if (!ruleta) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        if (!ruleta.abierta) {
            return res.status(400).json({ message: 'La ruleta no está abierta' });
        }
        ruleta.apuestas.push({ usuario, monto, tipo, numero, color });
        await ruleta.save();
        return res.status(200).json(ruleta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const cerrarRuleta = async (req, res) => {
    try {
        const ruleta = await Ruleta.findById(req.params.id);
        if (!ruleta) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        if (!ruleta.abierta) {
            return res.status(400).json({ message: 'La ruleta no está abierta' });
        }
        const numeroGanador = Math.floor(Math.random() * 36);
        let colorGanador;
        if (numeroGanador % 2 === 0) {
            colorGanador = 'rojo';
        } else {
            colorGanador = 'negro';
        }
        ruleta.abierta = false;

        const Resultados = ruleta.apuestas.map(apuesta => {
            let ganancia = 0;
            if (apuesta.tipo === "numero" && apuesta.numero === numeroGanador) {
                ganancia = apuesta.monto * 5;
            } else if (apuesta.tipo === "color" && apuesta.color === colorGanador) {
                ganancia = apuesta.monto * 1.8;
            }

            if (apuesta.tipo === "numero") {
                return {
                    usuario: apuesta.usuario,
                    apuesta: apuesta.monto,
                    apostado: apuesta.numero,
                    ganancia: ganancia,
                };
            } else {
                return {
                    usuario: apuesta.usuario,
                    apuesta: apuesta.monto,
                    apostado: apuesta.color,
                    ganancia: ganancia,
                };
            }

        })

        await ruleta.save();
        return res.status(200).json({ message: "Ruleta cerrada", numeroGanador, colorGanador, Resultados });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const borrarRuleta = async (req, res) => {
    try {
        const ruleta = await Ruleta.findById(req.params.id);
        if (!ruleta) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        await ruleta.remove();
        return res.status(200).json({ message: "Ruleta eliminada" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    crearRuleta,
    getRuletas,
    abrirRuleta,
    apostarRuleta,
    cerrarRuleta,
    borrarRuleta
}
