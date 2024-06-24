# mobilitydcatap-ui

Generate [mobilityDCAT-AP](https://w3id.org/mobilitydcat-ap/) metadata in RDF using a form-based interface. Test and experiment with different metadata to learn how different information are described according to the moilityDCAT-AP specification.

The form is compliant with the minimum profile of mobilityDCAT-AP.

Visit the webpage at: https://cefriel.github.io/mobilitydcat-ap

### Run it locally

Build the image
```sh
docker build -f Dockerfile-build --no-cache -t cefriel/mobilitydcatap-ui .
```

Run the image
```sh
docker run -p 8080:80 cefriel/mobilitydcatap-ui
```

Visit http://localhost:8080.