'use strict';

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const elementUl = document.querySelector('#series-list');

//Función para conectarnos a la api y obtener la información que queremos de la api
function getInfo(){
  //console.log('holi');
  const name = input.value.toLowerCase();
  fetch(urlBase + name)
    .then(response => response.json())
    .then(data => displaySeries(data));

    //Función para pintar los datos que nos llegan de la api
  const displaySeries = (data) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item);
      const showItem = item.show;
      const showTitle = showItem.name;
      const showImages = showItem.image;
      
      //Creo los elementos del DOM que son necesarios para mostrar los elementos de la lista
      const elementImg = document.createElement('img');
      const elementName = document.createElement('h2');
      const elementLi = document.createElement('li');
      const nameText = document.createTextNode(showTitle);

      //Cada elemento que devuelve el buscador se mostrará en un "li" 
      //que, mediante js, incluiremos dentro del "ul" vacío que hay en el html.
      
      elementName.appendChild(nameText);
      elementLi.appendChild(elementName);
      elementLi.appendChild(elementImg);
      elementUl.appendChild(elementLi);

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

button.addEventListener('click', getInfo);

//# sourceMappingURL=main.js.map
