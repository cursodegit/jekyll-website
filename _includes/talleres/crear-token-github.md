
Para realizar los siguientes talleres es necesario craer un *token* en `GitHub`. Este token
nos permitirá realizar llamadas a su API REST.

Para crear el *token* accedemos a nuestra cuenta en [www.github.com](https://www.github.com) 
y vamos a la sección [_Settings_](https://github.com/settings/profile).

En el menú de la izquierda, abajo del todo, hacemos clic sobre 
*<> Developer Settings*. En la página que se abre, desplegamos el menú *Personal Access Tokens*:

![Github Developer Settings page]({% link assets/img/talleres/github-token-developer-settings.png %})
Hacemos clic sobre la opción *Fine-grained tokens*. En la pantalla que se abre, hacemos clic sobre el botón *Generate new token*:


![Github Developer Settings page boton generate new token]({% link assets/img/talleres/github-token-boton-generate-new-token.png %})

En la primera sección del formulario, rellenamos los campos *Token name*, *Expiration* y *Description*. 
Haremos que el *token* tenga una validez de 30 días. Superado este tiempo,
el *token* quedará invalidado:

![Nuevo token nombre y descripción]({% link assets/img/talleres/github-token-nuevo-token-nombre-y-descripcion.png %})

Si nos deplazamos hacia abajo en el formulario, veremos las secciones para 
activar diferentes permisos para el *token*. Dejamos las opciones por defecto 
y hacemos clic sobre *Generate token*:


![Nuevo token permisos]({% link assets/img/talleres/github-token-nuevo-token-permisos.png %})

Github nos mostrará un cuadro de diálogo para confirmar la creación del *token*. Confirmamos haciendo click
sobre *Generate token*:

![Nuevo token permisos]({% link assets/img/talleres/github-token-confirmar-nuevo-token.png %})

¡Listo! ya tenemos el *token* creado. Ahora debemos copiarlo y guardarlo
ya que una vez cerremos esta pantalla, 
**no podremos recuperarlo**. Si lo perdemos tendremos que generar uno nuevo.
Copia el *token* utilizando el icono que está junto a él y guardalo 
temporalmente en un fichero de texto.


![Nuevo token copiar token]({% link assets/img/talleres/github-token-nuevo-token-copiar-token.png %})

