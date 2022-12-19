const { Router } = require('express');
const router = Router();

let productos = [];

router.get('/', (req, res) => res.render('formularioProducto'));

router.get('/productos', (req, res) => res.render('productos', { productos }));

router.post('/productos', (req, res) => {
	const { nombre, precio, url } = req.body;
	productos.push({ nombre, precio, url });
	res.render('formularioProducto');
});

module.exports = router;
