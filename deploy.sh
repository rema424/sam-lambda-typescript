#!/bin/bash

# dev:   ./deploy.sh
# prod:  ./deploy.sh prod
STAGE=${1:-dev}
PROJECT=SAM-tutorial-$STAGE

echo $STAGE