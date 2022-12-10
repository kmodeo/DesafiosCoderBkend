const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async read() {
        try {
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

        } catch (err) {
            throw Error(`Error al leer el archivo ${err}`);
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (err) {
            throw Error(`Error al escribir en el archivo ${err}`);
        }
    }

    async save(product) {
        let nuevoId = 1;
        let nuevoProducto = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if (!data) {
            product.id = nuevoId;
            nuevoProducto = [product];
        } else {
            product.id = datos[datos.length - 1].id + 1;
            nuevoProducto = product;
        }
        datos.push(nuevoProducto);

        await this.write(datos, `Elemento agregado con exito`);

        return product.id;
    }

    async getById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let result = datos.filter(product => product.id == myId);
        return result;
    }

    async getAll() {
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    async deleteById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let product = datos.find(product => product.id == myId);
        if (product) {
            let index = datos.indexOf(product);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${myId} eliminado`)
            return true;
        } else {
            console.log(`Producto con ID: ${myId} no existe`);
            return null;
          
        }
    }

}
module.exports = Contenedor;