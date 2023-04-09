---
layout: documentation-page
title: Instalación de Sourcetree en Mac OS
description: >- 
    Preparación para el curso - Instrucciones para la instalación de Sourcetree en Mac OS
image: /assets/img/cards/cursos_avanzados.jpeg  
---

{% contentfor breadcrumb_trail %}
<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://wwww.cursodegit.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Documentación"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "Instalación"
      },{
        "@type": "ListItem",
        "position": 4,
        "name": "Instalación de Sourcetree en MacOS"
      }]
    }
</script>
{% endcontentfor %}

{% contentfor before_page_content %}

<div class="breadcrumb-area ptb-80 ptb-md-60 ptb-sm-40 mb-80 breadcrumb-title-bar" style="background-color: rgb(230, 230, 230);">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="breadcrumb-inner text-center">
          <h1 class="heading heading-h1">Instalación de Sourcetree en Mac OS</h1>
          <h2 class="heading heading-h2">Curso de Git</h2>
          <div class="breadcrumb-insite">
            <ul class="core-breadcrumb">
              <li><a href="index.html">Home</a></li>
              <li>Documentación</li>
              <li>Instalación</li>
              <li class="current">Sourcetree en Mac OS</li>
            </ul>
          </div>

          <div class="post-meta mt-20 justify-content-center">
            <div class="post-date">
	      <span class="ti-calendar"></span> 9 Abril, 2023
	    </div>
	    <div class="post-category"><a href="javascript:;">Documentatión</a></div>
	  </div>
        </div>
      </div>
    </div>
  </div>
</div>
{% endcontentfor %}

Desde la [página de Sourcetree](https://www.sourcetreeapp.com), utilizamos el botón de descarga para bajarnos 
el fichero de instalación:

![descarga de Sourcetree](/assets/img/posts/instalacion-sourcetree/macos/download.png){: class="mx-auto d-block"}

Una vez descargado el fichero `.zip`, lo descomprimimos. Aparecerá junto al fichero descargado, una applicación para
Mac OS con el nombre `Sourcetree` que es el instalador. La ejecutamos, y nos aparecerá un aviso pidiéndonos
confirmación para ejecutar la aplicación que nos hemos descargado de internet. Este aviso es habitual
en Mac OS y, tras asegurarnos de que el fichero `.zip` lo hemos descargado de una fuente fiable, hacemos click
sobre el botón `Open`:

![Confirmación](/assets/img/posts/instalacion-sourcetree/macos/confirmation.png){: class="mx-auto d-block"}



En la siguiente pantalla, Mac OS nos pregunta que queremos mover la aplicación a la carpeta de aplicaciones del
sistema operativo. Hacemos click sobre el botón `Move to Applications Folder`:

![Mover a la carpeta de aplicaciones](/assets/img/posts/instalacion-sourcetree/macos/move-to-applications-folder.png){: class="mx-auto d-block"}

El siguiente paso se nos da la opción de conectar Sourcetree con una cuenta de Bitbucket. Nos saltaremos este
paso haciendo click sobre el botón `Continue`:

![Registro](/assets/img/posts/instalacion-sourcetree/macos/registration.png){: class="mx-auto d-block"}

En el siguiente paso, el instalador nos preguntará por los valores por defecto para el autor de los commits. 
Marcamos el check `Set global author details for Git and Mercurial`.
Debemos introducir un nombre y una dirección de correo electrónico. Estos valores no se utilizan para nada
más, no están relacionados con nuestro usuario de Bitbucket, GitHub o Gitlab ni se utilizan para autenticarnos
en ningún servidor de git. Es un valor que puedes cambiar posteriormente en la configuración de Sourcetree.

Para el curso, es cómodo que pongas tu nombre. De esta forma, podremos identificar los commits con más facilidad cuando
hagamos los ejercicios. En el campo email, puedes poner cualquier valor, incluso uno falso.

![Autor de los commits](/assets/img/posts/instalacion-sourcetree/macos/author.png){: class="mx-auto d-block"}

{% include alert_box.html content='Aunque un valor falso para el correo electrónico es totalmente válido para los laboratorios
	de un curso, en un entorno de trabajo siempre es recomendable utilizar tu nombre y un correo electrónico que te
	identifique' %}

Una vez terminada la instalación, el instalador lanzará la aplicación, lo que sigfica que ya está todo
listo para empezar el curso:

![Sourcetree](/assets/img/posts/instalacion-sourcetree/macos/sourcetree.png){: class="mx-auto d-block"}
