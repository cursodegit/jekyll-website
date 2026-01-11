Eso significa que debemos editar los ficheros `commands/auth.go` y `commands/pr.go` y añadir la línea 

```text
  "github.com/fatih/color"
```

al bloque `import` de cada uno de ellos. Hagámoslo. Abrimos `Visual Studio Code`, abrimos los ficheros
`commands/auth.go` y `commands/pr.go` y dentro del bloque `import` de cada uno de ellos, añadimos la línea
anterior. Con esto daremos por resueltos los conflictos a nivel del código de esta sección del fichero.
Continuemos con la siguiente sección.
