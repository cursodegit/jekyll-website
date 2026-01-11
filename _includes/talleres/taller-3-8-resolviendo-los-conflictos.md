Como mostramos en las diapositivas, necesitamos mezclar el código de aquellas partes del fichero que `git` no pudo 
mezclar. Abrimos el fichero `main.go` en `Visual Studio Code` y vemos 
cómo `git` nos ha marcado los conflictos usando los marcadores `<<<<<<<`, `=======` y `>>>>>>>`:


![Merge GHC-14 paso 3 ver conflictosd  en fichero]({% link assets/img/talleres/go/taller-3-8-vscode-merge-ghc-14-paso-3-ver-conflictos.png %})

Junto a los marcadores que utiliza `git`, verás también un menú contextual con varias opciones: *Accept Current Change*, 
*Accept Incoming Change*, *Accept Both Changes* y *Compare Changes*. Este menú es una funcionalidad de `Visual Studio Code` por
lo que si estás utilizando otro editor de texto, no dispondrás de él.

Lo que `git` nos está diciendo es que hay dos secciones del fichero que no ha podido mezclar. Una de ellas alrededor de la línea 
7, en el bloque `import`, y otra que va desde después de esa línea hasta casi el final del fichero.

