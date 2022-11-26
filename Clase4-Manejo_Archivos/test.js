const Contenedor = require("./contenedor");

let test = new Contenedor("./productos.txt");
(async () => {

  //prueba de getAll

  await test.getAll().then((res) => console.log(res));
  
  //fin getAll

  //prueba de save
  
        await test.save({
        title: "Plasticola",
        price: 250,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/correction-fluid-512.png",
    })

    .then((res) => console.log(res, "\nProducto agregado con exito"));
  
    //fin  save

  //prueba getById
  
    await test.getById(3).then((res) => console.log(res));
  
  //fin getById

  //prueba deleteById

    //await test.deleteById(3).then((res) => console.log(res, "deletebyId"));
    //console.log("Producto eliminado con exito");

  //fin deleteById

  //prueba deleteAll
   
    //await test.deleteAll().then((res) => console.log(res));
    //console.log("Todos los productos han sido eliminados");
  
  //fin deleteAll

})();