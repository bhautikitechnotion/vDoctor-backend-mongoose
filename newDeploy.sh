#!bin/bash

sudo docker build -t vdoctor-backend .
sudo docker tag vdoctor-backend itechnotion/vdoctor-backend
sudo docker push itechnotion/vdoctor-backend

sudo docker pull itechnotion/vdoctor-backend
sudo sh deploy.sh