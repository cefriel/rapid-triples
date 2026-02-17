# rapid-triples

Generate RDF using a form-based interface.
Fork the template and configure it with your own form.

### Customize

The form can be customised by simply modifying the JSON Schema (`form.json`) and the lifting template (`form-lifting.jinja`) in the `src/assets` folder. The tool accepts all valid JSON Schemas but can be further configured following the documentation of the underlying `vuetify-jsonschema-form` library available [here](https://koumoul-dev.github.io/vuetify-jsonschema-form/2.x/). The template follows the Jinja notation as supported by the `nunjucks` library ([documentation](https://mozilla.github.io/nunjucks/)).

### Run it locally

Build the image
```sh
docker build -f Dockerfile-build --no-cache -t cefriel/rapid-triples .
```

Run the image
```sh
docker run -p 8080:80 cefriel/rapid-triples
```

Visit http://localhost:8080/rapid-triples/.

### Update online

Build the image locally and push the updated files in the `dist` folder using the `publish.sh` script.

The scripts builds the interface using the Docker container, and copies the required files in the `dist` folder running an instance of the container.

### Cite as

If you use `rapid-triples` for publications, cite the following article: 

> Scrocca M., Carenini A., Carriero V. & Celino I. (2025). `rapid-triples: Adaptive Forms for Semi-automatic Knowledge Collection in RDF`. In: 1st Workshop on Bridging Hybrid Intelligence and the Semantic Web (HAIBRIDGE 2025) co-located with the 24th International Semantic Web Conference (ISWC 2025). CEUR-WS. [https://ceur-ws.org/Vol-3718/paper3.pdf](https://ceur-ws.org/Vol-4093/Paper4hai.pdf)

### Contributing

Before contributing, please read carefully, complete and sign our [Contributor Licence Agreement](https://github.com/cefriel/contributing/blob/main/contributor-license-agreement.pdf). 

When contributing to this repository, please first discuss the change you wish to make via issue or any other available method with the repository's owners.

### License

_Copyright (c) Cefriel._

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
