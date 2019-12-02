'use strict';

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';

function getInfo(){
  //console.log('holi');
  const name = input.value.toLowerCase();
  fetch(urlBase + name)
    .then(response => response.json())
    .then(data => displaySerie(data));

}
button.addEventListener('click', getInfo);
//# sourceMappingURL=main.js.map
