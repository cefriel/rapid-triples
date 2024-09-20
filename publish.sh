#!/bin/bash

docker build -f Dockerfile-build --no-cache -t cefriel/rdform .

CONTAINER_ID=$(docker run -d cefriel/rdform)
docker cp $CONTAINER_ID:/usr/share/nginx/html/rdform/. ./dist/

docker stop $CONTAINER_ID
