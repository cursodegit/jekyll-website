---
layout: documentation-page
title: Instalación de Go Lang en Windows
description: >- 
    Preparación para el curso - Instrucciones para la instalación de Go Lang en Windows 
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
        "item": "https://www.cursodegit.com/"
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
        "name": "Go Lang en Windows"
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
          <h1 class="heading heading-h1">Instalación de Go Lang en Windows </h1>
          <h2 class="heading heading-h2">Curso de Git</h2>
          <div class="breadcrumb-insite">
            <ul class="core-breadcrumb">
              <li><a href="index.html">Home</a></li>
              <li>Documentación</li>
              <li>Instalación</li>
              <li class="current">Go Lang en Windows</li>
            </ul>
          </div>

          <div class="post-meta mt-20 justify-content-center">
            <div class="post-date">
	      <span class="ti-calendar"></span> 14 Diciembre, 2025
	    </div>
	    <div class="post-category"><a href="javascript:;">Documentatión</a></div>
	  </div>
        </div>
      </div>
    </div>
  </div>
</div>
{% endcontentfor %}

No se require ningún paso especial para la instalación del lenguaje `go` en Windows.

- Puedes descargar el fichero `.msi` de la página [https://go.dev/doc/install](https://go.dev/doc/install) y seguir
  las instrucciones que se indican allí
- Si utilizas un gestor de software como `choco` puedes instalarlo ejecutando

```shell
> choco install go
```

Si lo instalas siguiendo cualquiera de estos dos pasos, recuerda cerrar la terminal de PowerShell y volver a abirla
para que el comando `go` esté en tu `PATH`.

Para verificar que lo tienes instalado, ejecuta el siguiente comando:

```shell
> go version
```
