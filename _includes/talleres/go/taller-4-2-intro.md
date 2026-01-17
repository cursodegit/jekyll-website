Vamos a borrar todas las referencias, excepto una: la rama `master`. Como vimos en las diapositivas, `git` no puede 
borrar la rama activa, por lo que hacemos *checkout* de  `master` (la rama que no queremos borrar) y siguiendo 
los mismos pasos que vimos en el [taller 3.4]({% link docs/talleres/taller-3-4-go-vscode.md %}) 
borramos el resto de las ramas y todas las etiquetas. 
*Será necesario forzar el borrado de todas las ramas excepto de `primer-commit`.*

Tal y como vimos en las diapositivas, a medida que vayamos borrando ramas, iremos dejando de ver 
una parte del grafo. Voy a borrar las tres primeras ramas por este orden: `main`, `GHC-13-usaColorEnListadoDeTickets` y 
`GHC-12-refactoring`.

Empezamos borrando la rama `main`. Tras hacerlo, dejaremos de ver el último *merge commit* del respositorio. El resto 
de confirmaciones se seguirán viendo ya que existen referencias que nos llevan a ellas:


