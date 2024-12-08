const express = require('express');
const connectDB = require('./config/databaseConnection.js');
const cors = require('cors');
const path = require('path');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/autenticacao', require('./routes/autenticacaoRoute'));
app.use('/api/usuario', require('./routes/usuarioRoute'));
app.use('/api/descoberta', require('./routes/descobertaRoute.js'));

app.get("/", (req, res) => {
    res.send("App is Working");
});

app.listen(5000, () => {
    console.log('App listening at port 5000');
});

