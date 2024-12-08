const mongoose = require('mongoose');

const mongoDBConnectionString = 'COLE_AQUI_SUA_KEY';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;