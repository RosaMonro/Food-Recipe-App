const searchForm = document.querySelector("form"); //creamos constante y la inicializamos con el elemento que coincida con el selector 'Form'. Esto busca y guarda la referencia al formulario.
const searchResultDiv = document.querySelector(".search-result"); //
const container = document.querySelector("header");
let searchQuery = ""; //Para almacenar el valor del campo de búsqueda. Al inicializarla como una cadena vacía, se le asigna un valor predeterminado que indica que inicialmente no se ha realizado ninguna búsqueda.

const fetchAPI = async (query) => {
  try {
    const data = await fetch(
      `http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json(); // para convertir los datos de la respuesta en formato JSON y almacenarlos en response
    //await para pausar la ejecución del código hasta que se complete una operación asincrónica y se resuelva una promesa.
    //await asegura que la siguiente línea de código no se ejecute hasta que se haya obtenido la respuesta de la API.

    console.log(response);

    searchResultDiv.innerHTML = ""; // Vacia el contenido actual del contenedor antes de agregar nuevos resultados

    //////////////////////////////////AÑADIR try - catch PARA GESTIONAR LOS ERRORES EN LA BÚSQUEDA./////////////////////////////////////////

    response.meals.forEach((meal) => {
      //iteramos cada objeto (meal) del array de comidas (response.meals) y ejecutamos la fx para cada elemento
      const recipeDiv = document.createElement("div"); //creamos un elemento div y y se asigna a la variable 'recipeDiv'
      recipeDiv.classList.add("recipe"); //se agrega la clase CSS 'recipe' al elemento recipeDiv
      recipeDiv.innerHTML = `
                    
                        <img src="${meal.strMealThumb}" alt="">
                        <h2 class="h3 recipe-tittle">${meal.strMeal}</h2>
                        <div class="recipe__info">
                            <a class="font-size-20-xs  recipe__link" href="${meal.strYoutube}">How To Make</a>
                            <p class="font-size-16-xxs recipe__category">Category: ${meal.strCategory}</p>
                        </div>
                   
                `;
      searchResultDiv.appendChild(recipeDiv); // se encarga de agregar el elemento recipeDiv como un hijo del elemento searchResultDiv en el HTML.
      //Esto significa que el elemento recipeDiv se insertará dentro del elemento searchResultDiv en el árbol de elementos HTML.
      //searchResultDiv es una referencia al elemento HTML en el que mostrar los resultados de búsqueda: contenedor <div> con la clase "search-result".
    });
  } catch (error) {
    console.error(error);
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("font-size-20-xs");
    recipeDiv.innerHTML = `
                    
                <p>"We're sorry, we couldn't find any recipes with "${searchQuery}" as an ingredient."</p>
                   
                `;
    searchResultDiv.appendChild(recipeDiv);
  }
};

searchForm.addEventListener("submit", (e) => {
  //addEventListener se utiliza para escuchar eventos en HTML y ejecutar una fx cuando ocurre el evento (el envío del formulario).
  //queremos que "escuche" el evento en 'submit' cuando se haga click en Buscar. (e) = (event)
  //Creamos una fx anónima que se pasa como argumento al addEevenListener
  e.preventDefault(); // evita el comportamiento predeterminado del formulario, que es recargar la página al enviar el formulario
  searchQuery = e.target.querySelector("input").value; //Aquí estamos diciéndole al programa que obtenga el valor que el usuario ingresó en el campo de búsqueda.
  // e.target es el elemento que desencadenó el evento (envío del formularo (submit)).
  //"target" se refiere al elemento HTML que representa ese formulario.
  //querySelector('input') busca el campo de entrada dentro del formulario.
  //.value obtiene el texto que el usuario ha ingresado en ese campo y lo guarda en la variable searchQuery.
  //A medida que el usuario interactúa con el formulario y envía una consulta de búsqueda, el código JavaScript actualiza el valor de searchQuery con el contenido del campo de entrada del formulario
  fetchAPI(searchQuery); //se pasa searchQuery como argumento al llamar a fetchAPI(searchQuery).Así, el valor del campo de búsqueda se pasa a la fx fetchAPI() y se utilizará en la URL de la API.
});
