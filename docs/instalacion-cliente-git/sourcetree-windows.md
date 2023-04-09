---
layout: documentation-page
title: Instalación de Sourcetree en Windows
description: >- 
    Preparación para el curso - Instrucciones para la instalación de Sourcetree en 
    Windows 11
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
        "name": "Instalación de Sourcetree en Windows"
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
         <h1 class="heading heading-h1">Instalación de Sourcetree en Windows 11</h1>
         <h2 class="heading heading-h2">Curso de Git</h2>
         <div class="breadcrumb-insite">
           <ul class="core-breadcrumb">
             <li><a href="index.html">Home</a></li>
             <li>Documentación</li>
             <li>Instalación</li>
             <li class="current">Sourcetree en Windows 11</li>
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

![descarga de Sourcetree](/assets/img/posts/instalacion-sourcetree/download.png){: class="mx-auto d-block"}


{% include alert_box.html content='Dependiendo de la versión de Sourcetree y de windows que se esté instalando, puede que se requiera el Framework .NET versión 4.7.1 (o alguno de versión superior dentro de la rama 4.7.XXX) En caso de que no esté instalado, el propio instalador lo descargará e instalará. En el momento de escribir este documento, utilizando la última versión de Sourcetree y de Windows 11, no se instaló ninguna versión adicional del Framework .NET' %} 


Una vez descargado el fichero, ejecutamos el instalador. En el primer paso, se nos pedirá que nos registremos en BitBucket o en Bitbucket Server. Este paso no es necesario y nos lo saltaremos. Para ello, haremos click sobre el botón `Skip` situado en la parte inferior derecha de la pantalla:


![Registro en Bitbucket](/assets/img/posts/instalacion-sourcetree/registration.png){: class="mx-auto d-block"}

En la siguiente pantalla, Sourcetree nos pregunta qué sistemas de control de versiones queremos instalar. Sourcetree soporta `git` 
y `mercurial`. Seleccionaremos sólo git y haremos click sobre el botón `Next`:


![Selección de sistema de control de versiones a instalar](/assets/img/posts/instalacion-sourcetree/pick_tools.png){: class="mx-auto d-block"}

Una vez hagamos click sobre el botón `Next` se procederá a instalar `git`. Cuando la instalación termine, haremos click sobre el botón `Next`:


![Instalando git](/assets/img/posts/instalacion-sourcetree/installing_git.png){: class="mx-auto d-block"}
![Instalación completada](/assets/img/posts/instalacion-sourcetree/tool_installation_completed.png){: class="mx-auto d-block"}

En el siguiente paso, el instalador nos preguntará por los valores por defecto para el autor de los commits. 
Debemos introducir un nombre y una dirección de correo electrónico. Estos valores no se utilizan para nada
más, no están relacionados con nuestro usuario de Bitbucket, GitHub o Gitlab ni se utilizan para autenticarnos
en ningún servidor de git. Es un valor que puedes cambiar posteriormente en la configuración de Sourcetree.

Para el curso, es cómodo que pongas tu nombre. De esta forma, podremos identificar los commits con más facilidad cuando
hagamos los ejercicios. En el campo email, puedes poner cualquier valor, incluso uno falso.


![Autor de los commits](/assets/img/posts/instalacion-sourcetree/author.png){: class="mx-auto d-block"}

{% include alert_box.html content='Aunque un valor falso para el correo electrónico es totalmente válido para los laboratorios
	de un curso, en un entorno de trabajo siempre es recomendable utilizar tu nombre y un correo electrónico que te
	identifique' %}

Por último, el instalador nos preguntará si queremos cargar en Sourcetree alguna clave SSH que ya tengamos en nuestra máquina.
Le diremos que `No` para terminar la instalación.


![Claves SSH](/assets/img/posts/instalacion-sourcetree/load_ssh_key.png){: class="mx-auto d-block"}

Una vez terminada la instalación, el instalador lanzará la aplicación, lo que signinifica que ya está todo
listo para empezar el curso:

![Sourcetree](/assets/img/posts/instalacion-sourcetree/sourcetree.png){: class="mx-auto d-block"}
