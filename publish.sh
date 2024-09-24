#!/bin/bash

docker build -f Dockerfile-build --no-cache -t cefriel/rapid-triples .

CONTAINER_ID=$(docker run -d cefriel/rapid-triples)
docker cp $CONTAINER_ID:/usr/share/nginx/html/rapid-triples/. ./dist/

docker stop $CONTAINER_ID
