const searchForm = document.querySelector ('form'); //creamos constante y la inicializamos con el elemento que coincida con el selector 'Form'. Esto busca y guarda la referencia al formulario.
const searchResultDiv = document.querySelector ('.search-result'); //
const container = document.querySelector ('header');
let searchQuery = ''; //Para almacenar el valor del campo de búsqueda. Al inicializarla como una cadena vacía, se le asigna un valor predeterminado que indica que inicialmente no se ha realizado ninguna búsqueda.
// const APP_ID = '61af9b54';
// const APP_key = '667c4e23af7f1a1598366bba205d1219';

const fetchAPI = async (query) => {
    const data = await fetch (`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    // const data = await fetch (`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,{'Access-Control-Allow-Origin': 'https://www.themealdb.com',});

    const response = await data.json();

    response.meals.forEach (meal => { //iteramos cada objeto (meal) del array de comidas (response.meals) y ejecutamos la función para cada elemento
        const recipeDiv = document.createElement ('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <div class="card">

                <img src="${meal.strMealThumb}" alt="">
                <div class="card__info">
                    <a class="h4  card__tittle" href="">Vista de la receta</a>
                    <p class="card-data  font-size-16-xxs">Calorias: 100</p>
                </div>

            </div>
        `;
        searchResultDiv.appendChild(recipeDiv);
    });
}

searchForm.addEventListener('submit', (e) => { //queremos que "escuche" el evento en 'submit' cuando se haga click en Buscar. (e) = (event)
    //Creamos una función anónima que se pasa como argumento al addEevenListener
    e.preventDefault(); // evita el comportamiento predeterminado del formulario, que es recargar la página al enviar el formulario
    searchQuery = e.target.querySelector('input').value; //Aquí estamos diciéndole al programa que obtenga el valor que el usuario ingresó en el campo de búsqueda.
    // e.target es el elemento que desencadenó el evento (envío del formularo (submit)). "target" se refiere al elemento HTML que representa ese formulario.
    //querySelector('input') busca el campo de entrada dentro del formulario.
    //.value obtiene el texto que el usuario ha ingresado en ese campo y lo guarda en la variable searchQuery.
    //A medida que el usuario interactúa con el formulario y envía una consulta de búsqueda, el código JavaScript actualiza el valor de searchQuery con el contenido del campo de entrada del formulario
    fetchAPI(searchQuery); //se pasa searchQuery como argumento al llamar a fetchAPI(searchQuery).Así, el valor del campo de búsqueda se pasa a la función fetchAPI() y se utilizará en la URL de la API.
})

// async function fetchAPI (){
//     const baseURL = `https://api.edamam.com/api/recipes/v2?q=pizza&app_is=${APP_ID}&app_key=${APP_key}`; //usamos `` para poder manipular la cadena. Al utilizar los backticks, se puede incluir una expresión ${...} dentro de la cadena de texto para interpolación de variables.
//     const response = await fetch(baseURL); //await para pausar la ejecución del código hasta que se complete una operación asincrónica y se resuelva una promesa.
//     const data = await response.json();
//     console.log(data);
// }

