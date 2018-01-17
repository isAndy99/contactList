#!/bin/bash

set -e

npm run lint
npm run test:jenkins
npm run build:site

IMAGE_NAME="nebula-site"
VERSION=$(node -e "console.log(require('./package.json').version)")

docker build -t $IMAGE_NAME:latest -t $IMAGE_NAME:$VERSION .
