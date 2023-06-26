## Extra: _conventional commits_

Proyecto que busca estandarizar los mensajes de los _commits_

[https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

^^^^^^

#### _Conventional commits_: estructura de un mensaje 

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Notes:
Un mensaje que sigue este convenio tiene la siguiente estructura:

-  Título del commit: debe incluir
  - `<type>` tipo de cambios, por ejemplo `fix`
  - `[optional scope]` añade contexto adicional al tipo de cambios, por ejemplo
    indicando a qué parte del código afecta, por ejemplo `parser`, `ci`.
  - título del mesaje 
- Descripción: incluye
  - Cuerpo del mensaje 
  - Uno o más footers


^^^^^^

#### _Conventional commits_: `type`


```text 
feat: WEB-1827 convierte el proyecto a Maven
```

- Tipos presentes en la especificación:
  - `fix` corrige errores (tipo `PATCH` de _Semantic Versioning_)
  - `feat` introduce nueva funcionalidad (tipo `MINOR` de _Semantic Versioning_)
- Se pueden añadir otros tipos. Es habitual utilizar los que se declaran en el 
  [proyecto de angular.](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)
  Por ejemplo `build`, `ci`, `docs` o `refactor`

Notes:

Aparte de los tipos `fix` y `feat` que requiere la especificación, no se 
impone el uso de ningún otro tipo. Es decir, podríais añadir a estos dos 
vuestros propios tipos de cambios. Como indico en la diapositiva, es bastante 
habitual utilizar los tipos que el equipo de Angular ha definido para su 
proyecto.

^^^^^^

#### _Conventional commits_: `scope`

```text 
feat(config): añade dependencias a Maven
```
- Es opcional
- Encerrado entre paréntesis
- Debe ser un sustantivo que referencie la sección del código que se ha 
  modificado
- Ejemplo de 
  [`scopes` que utiliza Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#scope):
  `forms`, `animations`, `router`
- Cada proyecto utilizará los `scopes` que tengan sentido en su contexto

Notes:

El `scope` del mensaje es opcional y sirve para añadir contexto al tipo.
Según se puede leer 
[en la especificación](https://www.conventionalcommits.org/en/v1.0.0/#specification), 
debe ser un sustantivo que
indique qué parte del código se está viendo afectada por los 
cambios, por ejemplo: `parser`, `api`, `forms`, `controllers`, `services`.

Debemos definir los valores aceptados para el `scope`, que dependerán del tipo 
de proyecto. No es lo mismo confirmar cambios en el repositorio de una 
librería de node que una página web generada con hugo.

De nuevo, el sentido común y el ser prácticos nos ayudará a definir unos 
valores para el `scope` que nos resulten útiles.

^^^^^^

#### _Conventional commits_: cuerpo del mensaje 

Descripción del mensaje de la confirmación de cambios.

(ver diapositivas anteriores)

Notes:

Esta es la parte en la que describimos qué hemos cambiado y porqué lo hemos
cambiado. Hemos hablado en detalle de este tema en diapositivas anteriores.

^^^^^^

#### _Conventional commits_: pies del mensaje (_footers_)

El pie del mensaje puede contener:

- `BREAKING CHANGES:` (tipo `MAJOR` de _Semantic Versioning_)
- `git trailers`

También se puede indicar que un _commit_ rompe compatilidad hace atrás 

usando `!` después del tipo 

Notes:

El pie del mensaje pude incluir los siguientes tipos de pies:

- `BREAKING CHANGES: ` + texto. Indica que los cambios confirmados rompen 
  compatibilidad hacia atrás de la aplicación.
- `git trailers`: cabeceras similares a las de los correos electrónicos que 
  permiten incluir información parseable en los mensajes. Por ejemplo 
  `Signed-Of-By: Alfonso <dummy@ejemplo.com>`

Para más información sobre `git trailers` puedes ver la 
[documentación del comando](https://git-scm.com/docs/git-interpret-trailers).

^^^^^^

#### _Conventional commits_: pies del mensaje (_footers_)

```text
chore!: acaba con el soporte para Node 16

Modifica la configuración del proyecto y de Github actions para utilizar 
la versión 18 de Node.

BREAKING CHANGE: utiliza caraterísticas de Node 18
```

Notes:

Se puede usar la exclamación, el pie `BREAKING CHANGE` o ambos. 


^^^^^^

#### _Conventional commits_: pies del mensaje (_footers_)

```text
feat(api)!: envía correo electrónico a cliente al enviar pedido

Reviewed-by: Mengano <mengano@ejemplo.com>
Refs: WEB-1838
```

Notes:

Un mensaje que rompe compatilibidad hacia atrás y que incluye dos trailers.

