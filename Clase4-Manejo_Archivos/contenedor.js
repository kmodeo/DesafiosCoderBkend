const fs = require("fs");
obj
class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(objeto) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length <= 0) {
        objeto.id = 1;
        array.push(objeto);
        const data = JSON.stringify(array);
        fs.writeFileSync(this.file, data, "utf-8");
        return objeto.id;
      }
      objeto.id = array.length + 1;
      array.push(objeto);
      const data = JSON.stringify(array);
      fs.writeFileSync(this.file, data, "utf-8");
      return objeto.id;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.file, "utf-8");
      if (!contenido) {
        const productos = [];
        fs.writeFileSync(this.file, JSON.stringify(productos));
        return productos;
      }
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  

  async deleteAll() {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(this.file, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        array = array.filter((objeto) => {
          return objeto.id !== id;
        });
        for (let i = 0; i < array.length; i++) {
          if (array[i].id > id) {
            array[i].id -= 1;
          }
        }
        fs.writeFileSync(this.file, JSON.stringify(array), "utf-8");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor;