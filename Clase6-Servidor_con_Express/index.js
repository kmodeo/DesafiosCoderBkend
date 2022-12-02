const Contenedor = require('./contenedor');
const express = require('express');

const PORT = 8080;
const app = express();

const productos = new Contenedor('productos.txt');

const server = app.listen(process.env.PORT || PORT, () =>
	console.log(`Server escuchando en PORT ${PORT}`)
);
server.on('error', err => console.log(`Error: ${err}`));


app.get('/productos', async (req, res) => {
	const mostrarProductos = await productos.getAll();
	res.send(mostrarProductos);
});

app.get('/productoRandom', async (req, res) => {
	const products = await productos.getAll();
	const numeroRandom = Math.floor(products.length * Math.random());
	res.send(products[numeroRandom]);
});
