'use strict';

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const form = document.querySelector('#search-form');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const elementUl = document.querySelector('#series-list');
const favUl = document.querySelector('#fav-list');

let favourites = [];

//Conexión a localStorage 

if (localStorage.getItem('favs') !== null) {
  favourites = JSON.parse(localStorage.getItem('favs'));
  console.log(favourites)
  for (const item of favourites) {
    const elementLiLocal = document.createElement('li');
    const elementTitleLocal = document.createElement('h2');
    const elementImageLocal = document.createElement('img');
    const titleLocal = item.titleLocal;
    const imgLocal = item.imgLocal;
    const titleLocalText = document.createTextNode(titleLocal);
    elementTitleLocal.appendChild(titleLocalText);
    elementImageLocal.setAttribute('src', imgLocal);
    elementLiLocal.appendChild(elementTitleLocal);
    elementLiLocal.appendChild(elementImageLocal);
    favUl.appendChild(elementLiLocal);
  }
}

//Función para conectarnos y obtener la información que queremos de la api
function getInfo(){
  //console.log('holi');
  const name = input.value.toLowerCase();
  fetch(urlBase + name)
    .then(response => response.json())
    .then(data => displayShow(data));

  //Función para pintar los datos que nos llegan de la api
  const displayShow = (data) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log('estoy en función displayShow', item);
      const showItem = item.show;
      const showTitle = showItem.name;
      const showImages = showItem.image;
      
      //Creo los elementos del DOM que son necesarios para mostrar los elementos de la lista
      const elementImg = document.createElement('img');
      const elementName = document.createElement('h2');
      const elementLi = document.createElement('li');
      const nameText = document.createTextNode(showTitle);
      elementLi.classList.add('nofavourite');

      //Cada elemento que devuelve el buscador se mostrará en un "li" 
      //que, mediante js, incluiremos dentro del "ul" vacío que hay en el html.
      
      elementName.appendChild(nameText);
      elementLi.appendChild(elementName);
      elementLi.appendChild(elementImg);
      elementUl.appendChild(elementLi);

      //listener para ejecutar función de elementos favoritos
      elementLi.addEventListener('click', function(event) { //añado un listener al elemento li para que se ejecuten funciones posteriores
        const showImage = showImages.medium;
        favShow(event, showTitle, showImage);
      }); //estos parametros se los pasa a la funcion favshow

      //Cuando el resultado de la búsqueda no tiene imagen para mostrar, le asignamos una mediante el servicio placeholder.com
      if (showImages === null) {
        elementImg.setAttribute('src','https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
      }else if (showImages !== null) {
        const showImage = showImages.medium;
        elementImg.setAttribute('src', showImage);
      }
    }
  }
}

//Defino función para añadir series a la lista de favoritas

function favShow (event, name, image){
  console.log('llamando');
  const element = event.currentTarget;
  //añadiendo y borrando clases de css se definen los elementos que formarán parte de "favourites"
  if (element.classList.contains('nofavourite')){
    element.classList.remove('nofavourite');
    element.classList.add('favourite');
  } else {
    element.classList.remove('favourite');
    element.classList.add('nofavourite');
  }
  //determino que elementos formarán parte del array de favoritos
  if (element.classList.contains('favourite')) {
    const object = {
      title: name,
      pic: image
    };
    favourites.push(object);
    console.log(favourites);
  }
  //creo los elementos necesarios para pintar las series favoritas
  const imageFav = document.createElement('img');
  imageFav.setAttribute('src', image);
  const nameFav = document.createElement('h2');
  const liFav = document.createElement('li');
  const textFav = document.createTextNode(name);

  nameFav.appendChild(textFav);
  liFav.appendChild(nameFav);
  liFav.appendChild(imageFav);
  favUl.appendChild(liFav);

  localStorage.setItem('favs', JSON.stringify(favourites));
}

//Función para habilitar tecla enter

function submitHandler(event){
  event.preventDefault(); //para que no se recargue la página por defecto
  getInfo(); //la función que he definido al principio para obtener datos
}

form.addEventListener('submit', submitHandler);
button.addEventListener('click', getInfo);

//# sourceMappingURL=main.js.map
