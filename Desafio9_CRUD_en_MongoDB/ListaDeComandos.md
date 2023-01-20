# Lista de comandos utilizados

- Para crear la base de datos

```console
use ecommerce;
```

- Para crear las colecciones

```console
db.createCollection('productos');
db.createCollection('mensajes');
```

- Para insertar los datos en productos

```console
db.productos.insertMany([
    {
        "timestamp": ISODate(),
        "title": "Notebook 1",
        "price": 100,
        "description":"Lenovo",
        "code": "NB-1",
        "image": "producto1.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Notebook 2",
        "price": 320,
        "description":"HP",
        "code": "NB-2",
        "image": "producto2.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Teclado 3",
        "price": 930,
        "description":"teclado 3",
        "code": "TC-3",
        "image": "producto3.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Mouse 4",
        "price": 1140,
        "description":"mouse 4",
        "code": "MS-4",
        "image": "producto4.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Microfono 5",
        "price": 2250,
        "description":"microfono 5",
        "code": "MIC-5",
        "image": "producto5.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Router 6",
        "price": 3360,
        "description":"router 6",
        "code": "XP-6",
        "image": "producto6.com"
    },
    {
        "timestamp": ISODate(),
        "title": "FuenteATX 7",
        "price": 4470,
        "description":"FuenteATX 7",
        "code": "FATX-7",
        "image": "producto7.com"
    },
    {
        "timestamp": ISODate(),
        "title": "PC 8",
        "price": 5000,
        "description":"PC DELL 8",
        "code": "PC-8",
        "image": "producto8.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Impresora 9",
        "price": 3450,
        "description":"Impresora HP 9",
        "code": "IMP-9",
        "image": "producto9.com"
    },
    {
        "timestamp": ISODate(),
        "title": "Scanner 10",
        "price": 2860,
        "description":"Scanner 10",
        "code": "SC-10",
        "image": "producto10.com"
    }
]);
```

- Para insertar algunos mensajes

```console
db.mensajes.insertMany([{timestamp: ISODate()}, {timestamp: ISODate()}])
```

- Para listar todos los productos

```console
db.productos.find();
```

- Para contar la cantidad de documentos en productos

```console
db.productos.countDocuments();
```

- Agregar otro producto más a *productos*

```console
db.productos.insertOne({
        "timestamp": ISODate(),
        "title": "Wifi-USB 11",
        "price": 3860,
        "description":"Wifi-USB 11",
        "code": "WF-11",
        "image": "Producto11.com"
    });
```

- Listar productos con precio menor a 1000 pesos:

```console
db.productos.find({price: {$lt: 1000}});
```

- Listar los productos con precio entre los 1000 a 3000 pesos.

```console
db.productos.find({price: {$gt: 1000, $lt: 3000 }});
```

- Listar los productos con precio mayor a 3000 pesos.

```console
db.productos.find({price: {$gt: 3000}});
```


- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```console
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```


- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```console
db.productos.updateMany({}, {$inc: {stock: 100}});
```


- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```console
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```


- Borrar los productos con precio menor a 1000 pesos

```console
db.productos.deleteMany({price: {$lt: 1000}});
```


- Creación del usuario **pepe**, con contraseña: **asd456**. Permiso solo de lectura
  
```console
use admin

db.createUser(
  {
    user: "pepe",
    pwd: "asd456",
    roles: [
       { role: "read", db: "ecommerce" }
    ]
  }
)

- Login del usuario creado anteriormente

```console
mongosh -u pepe -p --authenticationDatabase ecommerce 
```

