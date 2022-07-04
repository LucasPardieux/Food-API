![Logo](./client/src/image/logo.png)

# Individual Project - L´assiette Restaurant

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

Versiones:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

- Buscar recetas
- Filtrarlos / Ordenarlos
- Crear nuevas recetas propias

### Únicos Endpoints/Flags utilizados

- GET <https://api.spoonacular.com/recipes/complexSearch>
- GET <https://api.spoonacular.com/recipes/{id}/information>

__IMPORTANTE__: No se utilizaron librerías externas para aplicar estilos a la aplicación. Todo fue creado con CSS (CSS puro, CSS Modules o Styled Components)

#### Tecnologías utilizadas

- [✓] React
- [✓] Redux
- [✓] Express
- [✓] Sequelize - Postgres

## Frontend

Contiene una aplicación de React/Redux con las siguientes pantallas/rutas.

__Pagina inicial__: landing page con

- [✓] una imagen de fondo representativa al proyecto
- [✓] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: El home cuenta con

- [✓] Input de búsqueda para encontrar recetas por nombre
- [✓] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.
- [✓] Área donde se verá el listado de recetas. Muestra su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
  - Porciones
  ![Cards](./client/src/image/Gifs/GIF_search.gif)
- [✓] Botones/Opciones para filtrar por por tipo de dieta
![Cards](./client/src/image/Gifs/GIF_filter.gif)
- [✓] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
![Cards](./client/src/image/Gifs/GIF_order.gif)


__Ruta de detalle de receta__: Contiene

- [✓] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta) ademas del tiempo de coccion.
- [✓] Resumen del plato
- [✓] Nivel de "comida saludable" (health score)
- [✓] Receta paso a paso
![Cards](./client/src/image/Gifs/GIF_detail.gif)

__Ruta de creación de recetas__: Contiene

- [✓] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- [✓] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [✓] Botón/Opción para crear una nueva receta
![Cards](./client/src/image/Gifs/GIF_create1.gif)

__Ruta acerca del desarrollador__: Contiene

- [✓] Un pequeño resumen del nombre y tecnologias utilizadas.
- [✓] Una imagen del desarrollador.
- [✓] Botón/Opción para volver a la pagina principal.

## Base de datos

El modelo de la base de datos contiene las siguientes entidades (Aquellas propiedades marcadas con asterisco son obligatorias):

- [✓] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- [✓] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades debe ser de muchos a muchos ya que una receta puede ser parte de varios tipos de dieta en simultaneo y, a su vez, un tipo de dieta puede contener múltiples recetas distintas. Un ejemplo tomado de la API sería el `Strawberry Mango Green Tea Limeade` que es vegetariano, vegano y apto para celíacos, todo al mismo tiempo. Pero a su vez existen otras recetas para vegetarianos.

## Backend

Se desarrolla un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /recipes?name="..."__:
  - Obtiene un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta muestra un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtiene el detalle de una receta en particular
  - Trae solo los datos pedidos en la ruta de detalle de receta
  - Incluye los tipos de dieta asociados
- [ ] __POST /recipes__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos relacionada con sus tipos de dietas.
- [ ] __GET /diets__:
  - Obtiene todos los tipos de dieta posibles
  - En una primera instancia, cuando no exista ninguno, precarga la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)
