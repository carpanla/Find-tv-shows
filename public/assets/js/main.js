'use strict';


const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const form = document.querySelector('#search-form');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const elementUl = document.querySelector('#series-list');
const favUl = document.querySelector('#fav-list');
const resetButton = document.querySelector('#reset-button');

let favourites;


//*****************FUNCIÓN GET INFO para hacer fetch**********************************

//Función para conectarnos y obtener la información que queremos de la api

function getInfo(){
  //console.log('holi');
  const name = input.value.toLowerCase();
  fetch(urlBase + name)
    .then(response => response.json())
    .then(data => displayShow(data));
  //Función para pintar los datos que nos llegan de la api
  const displayShow = (data) => {
    elementUl.innerHTML = '';
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
      elementLi.addEventListener('click', function(event) { //añado un listener al elemento li para que se ejecuten funciones posteriores        const showImage = showImages.medium;
        const showImage = showImages ? showImages.medium : 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        favShow(elementLi, showTitle, showImage);
      }); //estos parámetros se los pasa a la funcion favshow

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
//**************************FUNCIÓN FAVSHOW para crear lista de favoritos******************** 

//Defino función para añadir series a la lista de favoritas

function favShow (element, name, image){
  console.log('holi');
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
    console.log(object);
    favourites.push(object);
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

  //Añado elementos a LOCALSTORAGE
  localStorage.setItem('favs', JSON.stringify(favourites));
}

//**************LOCAL STORAGE*******FUNCIÓN SHOWLOCAL******************************************

//Defino una función para pintar los datos guardados en LocalStorage y la ejecuto cuando se carga la página

function showLocal(){
  if (localStorage.getItem('favs') !== null) {
    favourites = JSON.parse(localStorage.getItem('favs'));
    console.log(favourites)
    for (const item of favourites){
      let elementLiLocal = document.createElement('li');
      let elementNameLocal = document.createElement('h2');
      let elementImageLocal = document.createElement('img');
      elementImageLocal.src = item.pic;
      let elementTextName = document.createTextNode(item.title);
      elementNameLocal.appendChild(elementTextName);
      elementLiLocal.appendChild(elementNameLocal);
      elementLiLocal.appendChild(elementImageLocal);
      favUl.appendChild(elementLiLocal);
    }
  } else {
    favourites = [];
  }
}

//**********************RESET BUTTON********************************************************** 

//Habilitar botón reset que vacía la lista de favoritas

function reset(){
  console.log('función reset');
  elementUl.innerHTML = '';
  favUl.innerHTML = '';
  localStorage.clear();
  //localStorage.removeItem('favs');
}

resetButton.addEventListener('click', reset);

//**********************TECLA INTRO***********************************************************
//Función para habilitar tecla enter

function submitHandler(event){
  event.preventDefault(); //para que no se recargue la página por defecto
  getInfo(); //la función que he definido al principio para obtener datos
}


//**********************LISTENERS**************************************************************
form.addEventListener('submit', submitHandler);
button.addEventListener('click', getInfo);
window.addEventListener('load', showLocal);
//# sourceMappingURL=main.js.map
