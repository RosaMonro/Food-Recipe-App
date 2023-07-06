const searchForm = document.querySelector ('form'); //creamos constante y la inicializamos con el elemento que coincida con el selector 'Form'. Esto busca y guarda la referencia al formulario.
const searchResultDiv = document.querySelector ('.search-result'); //
const container = document.querySelector ('header');
let searchQuery = ''; //Para almacenar el valor del campo de búsqueda. Al inicializarla como una cadena vacía, se le asigna un valor predeterminado que indica que inicialmente no se ha realizado ninguna búsqueda.
const APP_ID = '61af9b54';
const APP_key = '667c4e23af7f1a1598366bba205d1219';
const baseURL = `https://api.edamam.com/api/recipes/v2?q=pizza&app_is=${APP_ID}&app_key=${APP_key}`; //usamos `` para poder manipular la cadena. Al utilizar los backticks, se puede incluir una expresión ${...} dentro de la cadena de texto para interpolación de variables.

searchForm.addEventListener('submit', (e) => { //queremos que "escuche" el evento en 'submit' cuando se haga click en Buscar. (e) = (event)
    //Creamos una función anónima que se pasa como argumento al addEevenListener
    e.preventDefault(); // evita el comportamiento predeterminado del formulario, que es recargar la página al enviar el formulario
    searchQuery = e.target.querySelector('input').value; //Aquí estamos diciéndole al programa que obtenga el valor que el usuario ingresó en el campo de búsqueda.
    // e.target se refiere al formulario en sí mismo. El elemento en el que se originó el evento. 
    //querySelector('input') busca el campo de entrada dentro del formulario.
    //.value obtiene el texto que el usuario ha ingresado en ese campo y lo guarda en la variable searchQuery.
    //A medida que el usuario interactúa con el formulario y envía una consulta de búsqueda, el código JavaScript actualiza el valor de searchQuery con el contenido del campo de entrada del formulario
    fetchAPI()
})
