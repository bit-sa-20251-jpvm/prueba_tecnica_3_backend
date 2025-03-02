const {Schema, model} = require('mongoose');

const ruletaSchema = Schema({
    abierta: {
        type: Boolean,
        default: false
    },
    apuestas: [{
        usuario: {
            type: String,
            required: true
        },
        monto: {
            type: Number,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
        },
        color: {
            type: String,
        }
    }],
    resultado: {
        numero: {
            type: Number
        },
        color: {
            type: String
        }
    }
})

module.exports = model('Ruletas', ruletaSchema);