const searchForm = document.querySelector("form"); //creamos constante y la inicializamos con el elemento que coincida con el selector 'Form'. Esto busca y guarda la referencia al formulario.
const searchResultDiv = document.querySelector(".search-result"); //
const container = document.querySelector("header");
const cardPopupInfo = document.querySelector(".card__popup-info");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
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

    response.meals.forEach((meal) => {
      //iteramos cada objeto (meal) del array de comidas (response.meals) y ejecutamos la fx para cada elemento
      const recipeDiv = document.createElement("div"); //creamos un elemento div y y se asigna a la variable 'recipeDiv'
      recipeDiv.classList.add("recipe"); //se agrega la clase CSS 'recipe' al elemento recipeDiv
      recipeDiv.innerHTML = `
                    
                    <img class="recipe-img"  src="${meal.strMealThumb}" alt="">
                    <h2 class="h3 recipe-tittle">${meal.strMeal}</h2>
                    <div class="recipe__info">
                        <a class="font-size-20-xs  recipe__link" href="${meal.strYoutube}">How To Make</a>
                        <p class="font-size-16-xxs recipe__category">Category: ${meal.strCategory}</p>
                
                `;

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "View Recipe";
      recipeButton.classList.add("btn");
      recipeButton.classList.add("btn--recipe-button");
      recipeDiv.appendChild(recipeButton);

      recipeButton.addEventListener("click", () => {
        openRecipePopup(meal);
      });

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

const fetchIngredients = (meal) => {
  //definimos la fx con el parámetro "meal"
  //fx para hacer fetch de los ingredientes
  let ingredientsList = ""; //Inicializamos la variable "ingredientsList" con cadena vacía para almacenar la lista en formato HTML
  for (let i = 1; 1 <= 20; i++) {
    //el bucle se ejecutará 20 veces
    //inicializamos la variable i con valor 1. Esta variable llevará el control de la iteración del bucle
    //i <= 20; es la condición de continuación del bucle. Mientras sea true, seguirá ejecutándose
    //i++ es la expresión de incremento. Después de cada iteración del bucle, el valor de i se incrementará en 1.
    // El propósito de este bucle es recorrer las propiedades strIngredient1, strIngredient2, ..., strIngredient20, y strMeasure1, strMeasure2, ..., strMeasure20 del objeto meal
    const ingredient = meal[`strIngredient${i}`]; // la cadena "strIngredient" concatenada con el valor actual de i permite acceder a las propiedades strIngredient1, strIngredient2, etc., del objeto meal.
    if (ingredient) {
      //no aseguramos de que no es nulo ni undefind. SI hay valor, entonces ejecutamos la siguiente línea para asignarle una medida.
      const measure = meal[`strMeasure${i}`]; //idem que línea 86
      ingredientsList += `<li class="font-size-16-xxs color-white">${measure} ${ingredient}</li>`; //construimos el bloque de html de los li
    } else {
      break; //Si la variable ingredient es falsa (es decir, no hay un ingrediente en esa posición), se sale del bucle utilizando la instrucción break.
    }
  }
  return ingredientsList;
};
const openRecipePopup = (meal) => {
  cardPopupInfo.innerHTML = `

                <h2 class="h3 color-white card__popup-title">${
                  meal.strMeal
                }</h2>
                <p class="font-size-24-s color-white">Ingredients</p>
                <ul  class="card__popup-ingredients">${fetchIngredients(
                  meal
                )}</ul> 
                <div class="card__popup-instructions">
                  <p class="font-size-24-s color-white">Instructions:</p>
                  <p class="font-size-16-xxs color-white">${
                    meal.strInstructions
                  }</p>
                </div>

  `;
  cardPopupInfo.parentElement.style.display = "block"; //con esto "llamamos" al elemento padre. En este caso al <div class="card__popup">
};

recipeCloseBtn.addEventListener("click", (e) => {
  cardPopupInfo.parentElement.style.display = "none";
  //cuando haga click, el padre del popup, desaparecerá
});
