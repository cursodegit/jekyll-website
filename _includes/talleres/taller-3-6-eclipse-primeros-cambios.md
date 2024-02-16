
Los primeros cambios mostrarán la lista de *Issues* de un repositorio por consola.

Para ello, haremos lo siguiente:
- Añadir `org.json` como una dependencia de Maven
- Añadir el código que obtiene la lista de *Issues* del repositorio de `gradle`

```html
<!-- pom.xml -->
<dependency>
  <groupId>org.json</groupId>
  <artifactId>json</artifactId>
  <version>20210307</version>
</dependency>
```
```java
// src/com/alfonsoalba/MainClass.java
package com.alfonsoalba;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainClass {

	public static void main(String[] args) throws Exception {
		try {

			HttpClient client = HttpClient.newHttpClient();
			HttpRequest request = BuildHttpRequest();

      HttpResponse<String> response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

      JSONArray json = getJSONFromResponse(response);
      for (int i = 0; i < json.length(); i++) {
        JSONObject jsonObject = json.getJSONObject(i);
        String title = jsonObject.getString("title");
        System.out.println("Title: " + title);
      }
		} catch(Exception e) {
			System.out.println(e.getMessage());
			throw e;
		}
	}
	
	private static JSONArray getJSONFromResponse(HttpResponse<String> response) throws JSONException {
        try {
            return new JSONArray(response.body());
        } catch (JSONException e) {
            e.printStackTrace();
            throw e;
        }
	}

	private static HttpRequest BuildHttpRequest() {
		String token = System.getenv().get("GITHUB_PERSONAL_ACCESS_TOKEN");
        String from = "gradle/gradle";
		String url = "https://api.github.com/repos/" + from;
		String endpoint = url + "/issues";

		return HttpRequest.newBuilder(URI.create(endpoint))
			.header("Accept", "application/vnd.github+json")
			.header("Content-Type", "application/vnd.github.raw+json")
		    .header("Authorization", "Bearer " +  token)
		    .header("X-GitHub-Api-Version", "2022-11-28")
		    .build();
	}
}
```

Ejecutamos la solución en `Eclipse` para ver que funciona correctamente:

![Ejecutamos la aplicación](./img/taller-3-6-eclipse-primeros-cambios.png)

