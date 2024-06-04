Titulo: Eccomerce Casa de comidas

Descripcion: App para casa de comidas donde tiene tres tipos de usuarios: Administrador, Premium y Usuario.
Depende de quien lo use, son las rutas que pueda manejar.
En esta app vas a poder crear, no solo usuarios con sus carrits respectivos, sino tambien productos, eliminarlos y guardarlos en su base de datos.

Acontinuación se mencionan sus rutas con una breve descripcion: 

app.use("/api/products", prodRoute)
/allProducts : ruta get para traer todos los productos de la base de datos.
/product/:productId : ruta get para traer un producto por su id.
/products : ruta post para crear un producto.
/productsPremium : ruta post para que un usuario premium cree un producto.
/:pid : ruta delete para que un Administrador elimine un producto por su id.
/premium/:pid : ruta delete para que un usuario premuim elimine un producto por su id.

app.use("/api/cart", cartRoute)
/allCart : ruta get para traer todos los carritos de la base de datos.
/carts/:cartId : ruta get para traer un carrito por su id.
/Cart1 : ruta post para crear un carrito.
/agregarAlCarrito/:cartId/:productId : ruta put para añadir un producto al carrito.
/eliminarProducto/:cartId/:productId : ruta delete para que un Administrador elimine un producto del carrito.
/:cid/purchase : ruta post para generar un ticket de la compra.
/eliminarCarrito/:cid : ruta put para vaciar el carrito.

app.use("/api/view", viewRoute)
/register : ruta get para crear un usuario.
/login : ruta get para ingresar con un usuario ya registrado.
/profile : ruta get para ver perfil de un usuario ya registrado.
/change-role : ruta para cambiar el rol del usuario.

app.use("/api/session", usersRoute)


app.use("/api/mock", mockRoute)

app.use("/api/reset", restablecerRoute)
/forgot-password : ruta post para restablecer contraseña.
/reset-password/:token : ruta get para comprobar token del cambio de contraseña.
/reset-password/:token : ruta post para comprobar token del cambio de contraseña.
