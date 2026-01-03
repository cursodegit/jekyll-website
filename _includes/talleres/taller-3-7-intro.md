
La siguiente tarea que vamos a hacer es implementar el comando `pr list`, que nos muestra 
la lista de *pull requests* para un repositorio. Imaginemos que esta tarea tiene asignado el ticket de Jira número `GHC-10`.

Haremos la tarea en tres pasos:
1. Una primera implementación sencilla, que muestra el ID y el título de los *pull requests*, sin gestión de errores. Sólo 
   queremos ver que todo funciona
1. Añadimos gestión de errores 
1. Pulimos la salida del comando y mostramos más información

Dado que el tamaño del fichero `main.go` está creciendo mucho, en este taller te facilitaré sólo el código que hay que añadir a sustituir
en el fichero. En siguientes talleres refactorizaremos este código de andar por casa que estamos escribiendo.
