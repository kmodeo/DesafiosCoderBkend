const { Router } = require('express');
const router = Router();

let productos = [];

//Renderizo pagina principal con los productos cargados en el array

router.get('/', (req, res) => res.render('form', { productos }));

module.exports = {
	router,
	productos
};

