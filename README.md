
# Buscador de series
El proyecto consiste en diseñar un buscador de series conectándonos a un api:  http://api.tvmaze.com/search/shows?q=

Una vez obtenido el resultado de la búsqueda se podrán marcar las series como favoritas y guardarlas en local storage, apareciendo también en un listado de favoritas. 

Para realizar el ejercicio se han establecido diferentes hitos:
** En primer lugar hay que realizar una estructura básica de la web. La página consta de dos partes:
1. Un campo de texto y un botón para buscar series por su título.
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

Cuando se hace click en "buscar" o se pulsar la tecla "enter", la aplicación se conecta a la API de TVMaze para
buscar series y se obtienen los resultados.

**En segundo lugar, una vez se obtienen los resultados, el usuari@ podrá marcar las series que quiera como favoritas, de forma que cambiará su apariencia y se incluirán en una lista de favoritos.

**Por último, las series marcadas como favoritas deben almacenarse en localStorage. Cuando se refresque la página, el listado de favoritos debe permanecer visible.

Como extra se ha añadido un botón "reset", de forma que se pueda vaciar el listado y los datos de localStorage.


