
Antes de dar por terminada la tarea, vamos a refactorizar el código:
- Extraemos una clase `Client` que contendrá el código relacionado con la petición HTTP y el parseo de la respuesta
- Utilizaremos la nueva clase `Client` dentro de `MainClass` para obtener el array con la respuesta en JSON

Añadimos una nueva clase al proyecto. En `Eclipse`, desplegamos el menú *File* -> *New* -> *Class*:

![Crear clase Client paso 1](./img/taller-3-6-eclipse-crear-clase-client-paso-1.png)

Seleccionamos `Client` como nombre de la clase y hacemos clic sobre el botón *Finish*:

![Crear clase Client paso 2](./img/taller-3-6-eclipse-crear-clase-client-paso-2.png)

A continuación, modificamos el código de los ficheros `MainClass.java` y `Client.java`:

```java 
// src/com/alfonsoalba/Client.java
package com.alfonsoalba;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONArray;
import org.json.JSONException;

public class Client {
	private HttpClient client;
	private String token;

	public Client(String token) {
		this.client = HttpClient.newHttpClient();
		this.token = token;
	}

	public JSONArray getIssues(String repo) throws Exception {
		String url = "https://api.github.com/repos/" + repo + "/issues";
		HttpRequest request = HttpRequest.newBuilder(URI.create(url))
				.header("Accept", "application/vnd.github+json")
				.header("Content-Type", "application/vnd.github.raw+json")
				.header("Authorization", "Bearer " + token)
				.header("X-GitHub-Api-Version", "2022-11-28")
				.build();

		HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

		return getJSONFromResponse(response);
	}

	private JSONArray getJSONFromResponse(HttpResponse<String> response) throws JSONException {
		try {
			return new JSONArray(response.body());
		} catch (JSONException e) {
			e.printStackTrace();
			throw e;
		}
	}
}
```

```java
// src/com/alfonsoalba/MainClass.java
package com.alfonsoalba;

import org.json.JSONArray;
import org.json.JSONObject;

public class MainClass {

  public static void main(String[] args) throws Exception {
    try {
      String token = System.getenv().get("GITHUB_PERSONAL_ACCESS_TOKEN");
      Client client = new Client(token);
	        JSONArray json = client.getIssues("gradle/gradle");
	        printIssues(json);
    } catch(Exception e) {
      System.out.println(e.getMessage());
      throw e;
    }
  }

  private static void printIssues(JSONArray json) {
    for (int i = 0; i < json.length(); i++) {
      JSONObject jsonObject = json.getJSONObject(i);
      String title = jsonObject.getString("title");
      System.out.println("Title: " + title);
    }
  }
}
```

Ejecutamos la solución en eclipse y comprobamos que funciona correctamente, mostrando el listado de *Pull Requests*
por la consola:

![Ejecutar refactoring en eclipse](./img/taller-3-6-eclipse-ejecutar-despues-de-refactoring.png)

