const socket = io();

const $addProducto = document.querySelector('#add-productos');
const $nombreProducto = document.querySelector('#nombre-producto');
const $PrecioProducto = document.querySelector('#precio-producto');
const $imagenProducto = document.querySelector('#imagen-producto');
const $tablaProductos = document.querySelector('#tabla-productos');


//Cargo los productos que estan en la pagina form.hbs en la constante "nuevoProducto"

$addProducto.addEventListener('submit', e => {
	e.preventDefault();

	const nuevoProducto = {
		nombre: $nombreProducto.value,
		precio: $PrecioProducto.value,
		url: $imagenProducto.value
	};
	socket.emit('nuevoProducto', nuevoProducto);
	e.target.reset();
	location.href = '/';
});

//renderizo la pagina de productos al ingresar al sitio /

const renderProductos = productos => {
	if (productos.length > 0) $tablaProductos.innerHTML = '';

	productos.forEach(producto => {
		$tablaProductos.innerHTML += `
		<tr class="text-left">
			<td class="align-middle">${producto.nombre}</td>
			<td class="align-middle">${producto.precio}</td>
			<td class="align-middle">
				<img src="${producto.url}" alt="${producto.nombre}" width="100px">
			</td>
		</tr>`;
	});
};

//SECCION DEL CHAT  ----------------------------------------------------

const $formularioChat = document.querySelector('#formulario-chat');
const $emailUsuario = document.querySelector('#email-usuario');
const $mensajeChat = document.querySelector('#mensaje-chat');
const $tablaChat = document.querySelector('#tabla-chat');

//Cargo en mensajeEntrante los campos del chat, si el mail esta vacio da un error

$formularioChat.addEventListener('submit', e => {
	e.preventDefault();
	if ($emailUsuario.value == '') 
		
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Por favor ingresa tu email',
		  })
	const mensajeEntrante = {
		emailUsuario: $emailUsuario.value,
		message: $mensajeChat.value,
		date: new Date().toLocaleString()
	};
	socket.emit('mensajeEntrante', mensajeEntrante);
	e.target.reset();
});


//cargo los mensajes en el chat

const renderChat = mensajes => {
	if (mensajes.length > 0) $tablaChat.innerHTML = '';
	
	mensajes.forEach(message => {

		$tablaChat.innerHTML += `
		<div>
			<b class="text-primary">${message.emailUsuario}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.message}</i>
		</div > `;
	});
	$mensajeChat.focus();
};


//llamado para renderizar los productos
socket.on('productos', productos => {
	
	renderProductos(productos);
});

//llamado para renderizar los mensajes

socket.on('mensajes', mensajes => {
	renderChat(mensajes);
});
