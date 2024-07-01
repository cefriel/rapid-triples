# rdform

Generate RDF using a form-based interface.
Fork the template and configure it with your own form.

### Run it locally

Build the image
```sh
docker build -f Dockerfile-build --no-cache -t cefriel/rdform-demo .
```

Run the image
```sh
docker run -p 8080:80 cefriel/rdform-demo
```

Visit http://localhost:8080.
test
