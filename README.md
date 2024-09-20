# rdform

Generate RDF using a form-based interface.
Fork the template and configure it with your own form.

### Run it locally

Build the image
```sh
docker build -f Dockerfile-build --no-cache -t cefriel/rdform .
```

Run the image
```sh
docker run -p 8080:80 cefriel/rdform
```

Visit http://localhost:8080.

### Update online

Build the image locally and push the updated files in the `dist` folder.

If you built the interface using the Docker container, you can get the required files by obtaining the CONTAINER_ID via `docker ps` and running the following command:
```sh
docker cp <CONTAINER_ID>:/usr/share/nginx/html/rdform/. ./dist/
```