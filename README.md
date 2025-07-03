# rapid-triples

Generate RDF using a form-based interface.
Fork the template and configure it with your own form.

### Run it locally

Build the image
```sh
docker build -f Dockerfile-build --no-cache -t cefriel/rapid-triples .
```

Run the image
```sh
docker run -p 8080:80 cefriel/rapid-triples
```

Visit http://localhost:8080.

### Update online

Build the image locally and push the updated files in the `dist` folder using the `publish.sh` script.

The scripts builds the interface using the Docker container, and copies the required files in the `dist` folder running an instance of the container.

### Contributing

Before contributing, please read carefully, complete and sign our [Contributor Licence Agreement](https://github.com/cefriel/contributing/blob/main/contributor-license-agreement.pdf). 

When contributing to this repository, please first discuss the change you wish to make via issue or any other available method with the repository's owners.

### License

_Copyright (c) Cefriel._

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
