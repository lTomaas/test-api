const express = require('express')
const app = express();

const path = require('path');

//settings
app.use(express.static(__dirname+'/views'))
app.use(express.static(__dirname+'/views/estilos'));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.use(require("./routes/index"));


app.listen(3000);
console.log('Server on port 3000');