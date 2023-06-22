const express = require('express')
const app = express();

const path = require('path');
const PORT = process.env.PORT || 4000;

//settings
app.use(express.static(__dirname+'/views'))
app.use(express.static(__dirname+'/views/estilos'));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use(require("./routes/index"));

const host = '0.0.0.0'


app.listen(PORT, host);
console.log(`Server running on port ${PORT}`);