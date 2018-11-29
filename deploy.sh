#!/bin/bash

# dev:   ./deploy.sh
# test:  ./deploy.sh test
# stg:   ./deploy.sh stg
# prod:  ./deploy.sh prod
STAGE=${1:-dev}
PROJECT=sam-tutorial-$STAGE

# Change the suffix on the bucket to something unique!
BUCKET=$PROJECT-rema

# make a build directory to store artifacts
rm -rf build
mkdir build
npx tsc

# make the deployment bucket in case it doesn't exist
aws s3 mb s3://$BUCKET 

# generate next stage yaml file
aws cloudformation package                   \
    --template-file template.yml             \
    --output-template-file build/output.yml  \
    --s3-bucket $BUCKET                      

# the actual deployment step
aws cloudformation deploy                     \
    --template-file build/output.yml          \
    --stack-name $PROJECT                     \
    --capabilities CAPABILITY_IAM