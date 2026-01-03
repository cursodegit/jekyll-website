Nos encontramos ahora ante un dilema, así que es importante tener claro *qué queremos hacer con nuestra vida*: queremos 
terminar el trabajo que hemos empezado en `GHC-10-comando-pr-list` para desplegarlo. Podemos seguir dos caminos:
- Integrar el código que utiliza la variable de entorno `GHC_TOKEN` (y que está ya integrado en la rama `main`) en nuestra rama `GHC-10-comando-pr-list`,
  añadir la información adicional, y desplegar (integrarlo en `main`)
- Terminar la tarea añadiendo la información adicional en la rama `GHC-10-comando-pr-list` y una vez terminada, desplegarlo 
  (integrarlo en `main`) donde ya se está usando la variable `GHC_TOKEN`

En este caso, cualquiera de los dos caminos es válido. Podemos acabar discutiendo durante un buen rato sobre cuál es 
mejor, cuál nos gusta más, cuál pensamos que es el más *lógico* según nuestro sentido común. Con este contexto y 
para este código fuente, la verdad es que cualquiera de los dos caminos es válido. Daos cuenta de que he escrito 
*con este contexto y para este código fuente*, en otro contexto puede que uno de los dos caminos no sea el mejor 
o directamente no sea viable. Una vez más insisto en la importancia de *saber qué queremos hacer con nuestra vida* para 
decidir qué operaciones de `git` vamos a ejecutar.

Vamos a seguir el segundo camino.


