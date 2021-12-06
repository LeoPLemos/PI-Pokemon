<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Características del proyecto

Es una aplicación en la cual se puedan ver los distintos Pokemon utilizando para ello la api externa [pokeapi](https://pokeapi.co/) y a partir de ella se puede, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

#### Tecnologías utilizadas:

- [ ] JavaScript
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se desarrolló una aplicación de React/Redux que contiene las siguientes pantallas/rutas.

__Pagina inicial__: es una landing page con
- [ ] Una imagen de fondo representativa del proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene:
- [ ] Input de búsqueda para encontrar pokemons por nombre.
- [ ] Área donde se ve el listado de pokemons, detallando:
  - Imagen
  - Nombre
  - Tipos (Electric, Fire, Water, etc)
- [ ] Filtro por tipo de pokemon y por pokemon existente o creado por el usuario.
- [ ] Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por otras características (HP, Attack, Defense, etc)
- [ ] Paginado mostrando 9 pokemons por pagina.

__Ruta de detalle de Pokemon__: contiene:
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (HP, attack, defense, speed)
- [ ] Altura y peso

__Ruta de creación__: contiene:
- [ ] Un formulario __controlado__ con los campos mencionados en el detalle del pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de pokemon
- [ ] Botón/Opción para crear un nuevo pokemon

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) * : diferenciando la ID de un pokemon creado o ya existente en la API pokeapi
  - Nombre
  - HP
  - Attack
  - Defense
  - Speed
  - Height
  - Weight
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

#### Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Obtiene un listado de los pokemons existentes en la base de datos y en la pokeapi.
  
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtiene el detalle de un pokemon en particular
  
- [ ] __GET /pokemons?name="..."__:
  - Obtiene el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por el usuario)
  - Si no existe ningún pokemon muestra un mensaje indicando esa situación
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons
  - Crea un pokemon en la base de datos
- [ ] __GET /types__:
  - Obtiene todos los tipos de pokemons posibles
  

#### Testing
- [ ] Tiene un componente del frontend con sus tests respectivos
- [ ] Tiene una ruta del backend con sus tests respectivos
- [ ] Tiene un modelo de la base de datos con sus tests respectivos
