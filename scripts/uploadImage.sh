#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR/../.env"

for image in "$@"
do
    FILENAME=$(basename "$image")

    curl --request POST \
         --url https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/images/v1 \
         --header "X-Auth-Key: $CF_API_KEY" \
         --header "X-Auth-Email: $CF_EMAIL" \
         --header 'Content-Type: multipart/form-data' \
         --form "file=@$image" \
         --form "id=$FILENAME" \
         --form 'requireSignedURLs=false'
done
