#!/bin/bash

OPT=$1
MSG=$2

echo $PWD

gulp run

case $OPT in
    dev)
        ./node_modules/webpack/bin/webpack.js
        ;;
    pro)
        ./node_modules/webpack/bin/webpack.js -p

        git add .

        git commit -m "$MSG"

        git push origin master

        git push evennode master
        ;;
    *)
        echo "build finished"
        exit 1
esac
