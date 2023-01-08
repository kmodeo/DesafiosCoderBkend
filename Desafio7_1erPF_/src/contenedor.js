const fs = require("fs");

class Contenedor {
  constructor(fileName, keys) {
    this._filename = fileName;
    this._keys = [...keys, "id"];
    this._readFileOrCreateNewOne();
  }
  
  _validateKeysExist(newData) {
    
    const objectKeys = Object.keys(newData);
    
    console.log(objectKeys)
    
    let exists = true;
    
    objectKeys.forEach((key) => {
      if(!this._keys.includes(key)) {
        exists = false;
      }
    })
    return exists;
  }

  async _readFileOrCreateNewOne() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      //error.code === "ENOENT"
      error.code === "ERROR_ENTRADA"
        ? this._createEmptyFile()
        : console.log(
            `Error Code: ${error.code} | Hubo un error inesperado al intentar leer ${this._filename}`
          );
    }
  }

  async _createEmptyFile() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`Archivo ${this._filename} fue creado ya que no existía en el sistema`);
    });
  }

  async getById(id) {
    id = Number(id);
    
    console.log("id")
    console.log(id)
    
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);

      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error al intentar obtener un elemento por su ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      );

      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error al intentar eliminar un elemento por su ID (${id})`
      );
    }
  }

  
  //actualizacion: busco el id a actualizar, ubico su lugar en el array y le paso los datos nuevos
  //escribo el archivo con las modificaciones
  async updateById(id, newData) {

    if(this._validateKeysExist(newData)){
      try {
        id = Number(id);
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const objectIdToBeUpdated = parsedData.find(
          (producto) => producto.id === id
        );
        if (objectIdToBeUpdated) {
          const index = parsedData.indexOf(objectIdToBeUpdated);
          const {title, price, description, code, image, stock} = newData;

          parsedData[index]['title'] = title;
          parsedData[index]['price'] = price;
          parsedData[index]['description'] = description;
          parsedData[index]['code'] = code;
          parsedData[index]['image'] = image;
          parsedData[index]['stock'] = stock;
          
          await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
          return true;
                      
          }      
         
           else {
            console.log(`ID ${id} no existe en el archivo`);
            return null;
        }
  
      } catch (error) {
        `Error Code: ${error.code} | Hubo un error al intentar actualizar un elemento por su ID (${id})`
      }
    } else {
      return false;
    }
  
    
  }

  //Adiciono al array:busco el id a actualizar, ubico su lugar en el array 
  // pusheo el nuevo objeto
  //escribo el archivo con las modificaciones

  async addToArrayById(id, objectToAdd) {
    if(this._validateKeysExist(objectToAdd)) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      if (objectIdToBeUpdated) {      
        const index = parsedData.indexOf(objectIdToBeUpdated);
        const valorActual = parsedData[index];
        const currentProducts = valorActual['products']
        currentProducts.push(objectToAdd.products)
        
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | Hubo un error al intentar actualizar un elemento por su ID (${id})`
    }
    } else {
      return false;
    }
  }


   //elimino registro del array:busco el registro a eliminar por su id, recorro el array hasta encontrar registro
   //con splice lo elimino.
  async removeFromArrayById(id, objectToRemoveId, keyName) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      
      if (objectIdToBeUpdated) {
        const index = parsedData.indexOf(objectIdToBeUpdated);
        
        const valorActual = parsedData[index][keyName];
        let indexToBeRemoved = -1;
        valorActual.forEach((element, indexE) => {
          if(element.id == objectToRemoveId) {
            indexToBeRemoved = indexE
          }
        })
        //en newArray guardo una copia (...) del valorActual
        const newArray = [...valorActual];
        
        if (indexToBeRemoved>-1) {
          console.log(indexToBeRemoved)

          //con splice borro el item seleccionado
          newArray.splice(indexToBeRemoved,1)
        }
    
        parsedData[index][keyName] = newArray;
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} no existe en el archivo`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | Hubo un error al intentar actualizar un elemento por su ID (${id})`
    }
  
  }

  async save(object) {    
    if(this._validateKeysExist(object)) {
      try {
        const allData = await this.getData();
        const parsedData = JSON.parse(allData);
  
        object.id = parsedData.length + 1;
        parsedData.push(object);
  
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return object.id;
      } catch (error) {
        console.log(
          `Error Code: ${error.code} | Hubo un error al intentar guardar un elemento`
        );
      }
    } else {
      return false;
    }
    
  }

  async deleteAll() {
    try {
      await this._createEmptyFile();
    } catch (error) {
      console.log(
        `Hubo un error (${error.code}) al intentar borrar todos los objetos`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}

module.exports = Contenedor;

