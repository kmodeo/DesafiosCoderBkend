const express = require('express');
const { engine } = require('express-handlebars');
const router = require('./routes/productos');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine());
app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/', router);

const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);
server.on('error', () => console.log(`Error: ${err}`));
