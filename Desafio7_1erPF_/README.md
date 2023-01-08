
# Primera Entrega Proyecto Final
# Alumno: Cristian Amodeo

Descripcion


## API Reference

#### Configuracion del Token en POSTMAN, para los administradores
En la opcion HEADERS de Postman pasar como valor KEY Authorization 
y como VALUE el token que se ubica en el archivo .env
**31zgocjhwvuh6errefse5jd**


#### Get all items

```http
  Router base '/api/productos'
```

| Metodo | Endpoint     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `GET` | `/:id?` | listar todos los productos disponibles ó un producto / por su id (disponible para usuarios y administradores) |
| `POST` | `/` | Incorpora productos al listado (solo administradores) |
| `PUT` | `/:id` | Actualiza producto por Id. (solo administradores) |
| `DELETE` | `/:id` | Borra un producto por su Id. (solo administradores) |

#### Ejemplos POST para agregar productos con POSTMAN (agregar el Token)
![POSTMAN](./src/docs/imagen1.png?raw=true "Metodo Post")

#### Ejemplos PUT para modificar productos con POSTMAN (agregar el Token)
![POSTMAN](./src/docs/imagenPut.png?raw=true "Metodo Put")

#### Ejemplos DELETE para borrar un producto con POSTMAN (agregar el Token)
![POSTMAN](./src/docs/imagenDelete.png?raw=true "Metodo Delete")


#### Get item

```http
  Router base '/api/carrito'
```
| Metodo | Endpoint     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `GET` | `/:id/productos' ` | http://localhost:8080/api/carrito/1/productos lista los productos del carrito1 |
| `POST` | `/:id/productos' ` | Incorporo productos al carrito (http://localhost:8080/api/carrito/1/productos/) |
| `DELETE` | `/:id/productos/:id_prod' ` | Elimna producto de carrito por Id carrito y de producto (http://localhost:8080/api/carrito/1/productos/4) |

#### Ejemplos POST para incorporar productos al carrito con POSTMAN
![POSTMAN](./src/docs/carritoPost.png?raw=true "Metodo Post de carrito")

#### Ejemplos DELETE para eliminar productos del carrito con POSTMAN
![POSTMAN](./src/docs/carritoDelete.png?raw=true "Metodo Post de carrito")
