/* Importo las librerias que necesito para el proyecto*/
const express = require(`express`);
const { Router } = express;

const Contenedor = require(`./contenedor.js`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

const productosRouter = Router();
app.use(`/api/productos`, productosRouter);

app.use(express.static(`public`));

let vContenedor = new Contenedor(`productos.json`);

// get de productos - GET /api/productos
productosRouter.get(``, (req, res) => {
    
    (async () => {
        try {
            let todosProductos = await vContenedor.getAll();
            return res.json(todosProductos);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    })();
});

// GET productos byId - /api/productos/:id

productosRouter.get(`/:id`, (req, res) => {
   
    (async () => {
        try {
            let productbyId = await vContenedor.getById(req.params.id);
            if (productbyId.length == 0) {
                return res.status(404).json({
                    error: `Error producto no encontrado`
                });
            } else {
                return res.json(productbyId);
            }
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    })();
});

// adiciono producto - POST /api/productos
productosRouter.post(``, (req, res) => {
    
    (async () => {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.url;

        const nuevoProducto = {
            nombre: `${name}`,
            precio: price,
            url: `${url}`
        };

        const id = await vContenedor.save(nuevoProducto);

        return res.json(`El id asignado es el ${id}`);
    })();
});

// modificar producto byId - PUT /api/productos/:id
productosRouter.put(`/:id`, (req, res) => {
    
     (async () => {
        const id = Number(req.params.id);
        let todosProductos = await vContenedor.getAll();
        const indiceProducto = todosProductos.findIndex(product => product.id === id);

        if (indiceProducto < 0) {
            return res.status(401).json({
                error: "producto no encontrado"
            });
        }

        todosProductos[indiceProducto].nombre = req.body.nombre;
        todosProductos[indiceProducto].precio = req.body.precio;
        todosProductos[indiceProducto].url = req.body.url;

        await vContenedor.write(todosProductos, `Mensaje modificado con exito`);
        return res.json(`Se actualizó el registro con el id ${id}`);
    })();
});

// DELETE producto byId - /api/productos/:id

productosRouter.delete(`/:id`, (req, res) => {
     (async () => {
        try {
              const id = Number(req.params.id);
              const fueBorrado = await vContenedor.deleteById(id);
              fueBorrado 
              ? res.status(200).json(`El producto de ID: ${id} fue borrado`)
              : res.status(404).json(`El producto no fue borrado porque no se encontró el ID: ${id}`);

            } catch (err) {
            return res.status(404).json({
                error: `Se detecto un error grave --> ${err}`
            });
        }
    })();
});

/* Setup del server */
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HHTP escuchando en el puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor ${err}`);
});
