#!bin/bash

CONTAINER_NAME="medicalhub-backend"
IMAGE_NAME="medicalhub-backend"
PORT=6000

pwd

# stop the docker container
echo "=================removing existing container================="
sudo docker container stop $CONTAINER_NAME
sudo docker container rm $CONTAINER_NAME
sudo docker rmi $IMAGE_NAME

# run docker container
# sudo docker compose up -d
# echo "=================starting new container================="
sudo docker build -t $IMAGE_NAME .
sudo docker run -d --restart unless-stopped -p $PORT:$PORT --env-file .env --name $CONTAINER_NAME $IMAGE_NAME
# sudo docker compose up -d