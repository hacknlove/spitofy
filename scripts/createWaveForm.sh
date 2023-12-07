ffmpeg -i $1 -filter_complex "showwavespic=s=1920x360:colors=white|white,format=rgba" -vframes 1 $1.png
