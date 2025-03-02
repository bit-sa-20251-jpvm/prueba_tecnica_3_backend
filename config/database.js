const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const dbURL = process.env.DB_MONGO
        if (!dbURL) {
            throw new Error('No existe la variable de entorno');
        }
        await mongoose.connect(dbURL, {})
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log('Error al conectarse a la base de datos');
        process.exit(1);
    }
}
module.exports = connectDB;