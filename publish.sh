#!/bin/bash

docker build -f Dockerfile-build --no-cache -t cefriel/rdform-demo .

CONTAINER_ID=$(docker run -d cefriel/rdform-demo)
docker cp $CONTAINER_ID:/usr/share/nginx/html/rdform-demo/. ./dist/

docker stop $CONTAINER_ID
