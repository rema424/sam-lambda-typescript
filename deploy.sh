#!/bin/bash

# dev:   ./deploy.sh
# test:  ./deploy.sh test
# stg:   ./deploy.sh stg
# prod:  ./deploy.sh prod
STAGE=${1:-dev}
[ $? = 0 ] && \
PROJECT=sam-tutorial-$STAGE

# Change the suffix on the bucket to something unique!
[ $? = 0 ] && \
BUCKET=$PROJECT-317599-rema

# make a build directory to store artifacts
[ $? = 0 ] && \
rm -rf build
[ $? = 0 ] && \
mkdir build
[ $? = 0 ] && \
npm run build

# make the deployment bucket in case it doesn't exist
[ $? = 0 ] && \
aws s3 mb s3://$BUCKET 

# generate next stage yaml file
[ $? = 0 ] && \
aws cloudformation package                   \
    --template-file template.yml             \
    --output-template-file build/output.yml  \
    --s3-bucket $BUCKET                      

# the actual deployment step
[ $? = 0 ] && \
aws cloudformation deploy                     \
    --template-file build/output.yml          \
    --stack-name $PROJECT                     \
    --capabilities CAPABILITY_IAM