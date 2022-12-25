const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const fs = require('fs');
const { router, productos } = require('./routes/router.js');

const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);

const io = new IOServer(httpserver);

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/', router);

io.on('connection', socket => {
	io.sockets.emit('productos', productos);
	console.log('Nuevo usuario conectado. Soquet ID : ', socket.id);

	fs.promises.readFile('db/chat.txt', 'utf-8').then(datos => {
		io.sockets.emit('mensajes', JSON.parse(datos));
	});

	
	//Cargo en el array los productos que se agregan
	socket.on('nuevoProducto', nuevoProducto => {
		productos.push(nuevoProducto);
		io.sockets.emit('productos', productos);
	});

	//Leo el archivo de chat.txt, parseo los datos y los guardo
	socket.on('mensajeEntrante', async mensajeEntrante => {
		let datos = await fs.promises.readFile('db/chat.txt', 'utf-8');
		let mensajes = JSON.parse(datos);
		mensajes.push(mensajeEntrante);
		fs.writeFileSync('db/chat.txt', JSON.stringify(mensajes));
		io.sockets.emit('mensajes', mensajes);
			
	});


});

// Datos de conexion del server

const server = httpserver.listen(PORT, () =>
	console.log(`Servidor corriendo en port ${PORT}`)
);

server.on('error', () => console.log(`Error: ${err}`));
