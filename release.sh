#!/bin/bash

GIT_VERSION=$(git --version)

if [ $? = 0 ]
then echo $GIT_VERSION
else 
    echo "Git не установлен"
    exit 1
fi

LATESTS_TAGS_LIST=$(git tag --sort=taggerdate | grep -E "^v[0-9]" | tail -2)

export LATEST_TAG=$(echo $LATESTS_TAGS_LIST | awk '{print $2}')
#LATEST_TAG=""


PREVIOUS_TAG=$(echo $LATESTS_TAGS_LIST | awk '{print $1}')
# PREVIOUS_TAG=""


if [ -z "$LATEST_TAG" ]
then 
    LATEST_TAG=$PREVIOUS_TAG 
    PREVIOUS_TAG="" 
fi

if [ -z "$LATEST_TAG" ]
then 
    echo "Тэги с необходимым форматом 'v*' не найдены"
    exit 1
fi

echo "Последний тэг: ${LATEST_TAG}"
echo "Предыдущий тэг: ${PREVIOUS_TAG}"

if [ -z "$PREVIOUS_TAG" ]
then PREVIOUS_TAG=$(git rev-list --max-parents=0 HEAD)
fi

CHANGELOG=$(git log --pretty=format:"%h %s" ${PREVIOUS_TAG}..${LATEST_TAG})

echo "Changelog:"
echo "$CHANGELOG"

TAG_AUTHOR_NAME=$(git for-each-ref --format '%(taggername)' refs/tags/${LATEST_TAG})
TAG_DATE=$(git for-each-ref --format '%(taggerdate:short)' refs/tags/${LATEST_TAG})

echo "Автор: ${TAG_AUTHOR_NAME}"
echo "Дата: ${TAG_DATE}"

CHANGELOG_N=$(echo "$CHANGELOG" | awk '{printf "%s\\n", $0}' | sed 's/"/\\"/g')

CURL_DATA_CREATE_DESCRIPTION="\
Release version: $LATEST_TAG\n\
Author: $TAG_AUTHOR_NAME\n\
Date: $TAG_DATE\n\
Changelog:\n\
$CHANGELOG_N"

CURL_OAUTH="Authorization: OAuth ${YANDEX_AUTH_TOKEN}"
CURL_ORG="X-Org-Id: ${YANDEX_ORG_ID}"
CURL_HOST='https://api.tracker.yandex.net'

CURL_DATA_CREATE="{\
    \"summary\":\"Release $LATEST_TAG (Maxim Pashkov)\", \
    \"queue\": \"TMP\", \
    \"unique\": \"$LATEST_TAG\", \
    \"description\": \"$CURL_DATA_CREATE_DESCRIPTION\" \
}"

RESPONSE_CREATE=$(curl \
   -s -o /dev/null -w "%{http_code}" \
   -X 'POST' \
   -H "$CURL_OAUTH"  \
   -H "$CURL_ORG"  \
   -H 'Content-Type: application/json' \
   --data "${CURL_DATA_CREATE}" \
   ${CURL_HOST}/v2/issues/)

RESPONSE_FIND=$(curl \
    -sS \
    -X 'POST' \
    -H "$CURL_OAUTH"  \
    -H "$CURL_ORG"  \
    -H 'Content-Type: application/json' \
    --data "{\"filter\": {\"queue\": \"TMP\", \"unique\": \"$LATEST_TAG\"}}" \
    ${CURL_HOST}/v2/issues/_search)

RECORD_ID_PART=$(echo $RESPONSE_FIND | grep -o '"id":"[0-9a-z]*"' | head -1)

echo "RECORD_ID_PART: $RECORD_ID_PART" 

RECORD_ID=${RECORD_ID_PART/\"id\":/}
RECORD_ID=${RECORD_ID//\"/}

if [ "$RESPONSE_CREATE" != "200" ]
then 
    if [ "$RESPONSE_CREATE" = "409" ]
    then 
        echo "Задача уже была создана, пытаемся обновить"

        echo "Обновление записи: $RECORD_ID" 

        RESPONSE_UPDATE=$(curl \
            -s -o /dev/null -w "%{http_code}" \
            -X 'PATCH' \
            -H "$CURL_OAUTH"  \
            -H "$CURL_ORG"  \
            -H 'Content-Type: application/json' \
            --data "${CURL_DATA_CREATE}" \
            ${CURL_HOST}/v2/issues/${RECORD_ID})

        if [ "$RESPONSE_UPDATE" != "200" ]
        then 
            echo "Обновление записи закончилось с ошибкой: ${RESPONSE_UPDATE}"
            exit 1
        else echo "Запись обновлена успешно"
        fi
    else 
        echo "Создание записи закончилось с ошибкой: ${RESPONSE_CREATE}"
        exit 1
    fi
fi

if [ -z "$RECORD_ID" ]
then 
    echo "Не удалось найти запись"
    exit 1
fi

echo "Начинаем сборку релизного артефакта"

sh ./release-docker.sh

if [ $? = 0 ]
then RELEASE_DOCKER_RESPONSE="Build and publish the artifact was successful"
else RELEASE_DOCKER_RESPONSE="Build and publish artifact failed"
fi

echo "$RELEASE_DOCKER_RESPONSE"

echo "Добавляем комментарий об аретфакте в запись"

$(curl \
    -sS \
    -X 'POST' \
    -H "$CURL_OAUTH"  \
    -H "$CURL_ORG"  \
    -H 'Content-Type: application/json' \
    --data "{\"text\": \"$RELEASE_DOCKER_RESPONSE\"}" \
    ${CURL_HOST}/v2/issues/${RECORD_ID}/comments)

echo "Начинаем тестирование"

sh ./release-tests.sh

if [ $? = 0 ]
then RELEASE_TESTS_RESPONSE="Tests was successful"
else RELEASE_TESTS_RESPONSE="Tests failed"
fi

echo "$RELEASE_TESTS_RESPONSE"

echo "Добавляем комментарий о тестированиях в запись"

$(curl \
    -sS \
    -X 'POST' \
    -H "$CURL_OAUTH"  \
    -H "$CURL_ORG"  \
    -H 'Content-Type: application/json' \
    --data "{\"text\": \"$RELEASE_TESTS_RESPONSE\"}" \
    ${CURL_HOST}/v2/issues/${RECORD_ID}/comments)

echo "Завершение"