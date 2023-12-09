DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for mp3File in "$@"
do
    ffmpeg -i "$mp3File" -filter_complex "showwavespic=s=1920x720:scale=lin:colors=white|white,format=rgba" -vframes 1 "$mp3File.extra.png"

    convert "$mp3File.extra.png" -trim "$mp3File.png"

    rm "$mp3File.extra.png"

    FILENAME=$(basename "$mp3File").png

    "$DIR/uploadImage.sh" "$mp3File.png"
done
