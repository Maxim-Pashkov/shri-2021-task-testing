docker build -t 89mvksim91/shri-2021-task-testing:${LATEST_TAG} .

if [ $? != 0 ]
then exit 1   
fi

DOCKER_IMAGE_ID=$(docker images | grep shri-2021-task-testing | awk '{ print $3 }')

if [ -z $DOCKER_IMAGE_ID ]
then exit 1
fi

docker push 89mvksim91/shri-2021-task-testing:${LATEST_TAG}

if [ $? != 0 ]
then exit 1   
fi

docker image rm ${DOCKER_IMAGE_ID}

exit 0