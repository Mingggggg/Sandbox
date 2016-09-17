#!/bin/bash

OPT=$1
MSG=$2

cd ..

# ./node_modules/webpack/bin/webpack.js -p
#
# gulp sass

case $OPT in
    deploy)
        git add .

        git commit -m "{$MSG}"

        # git push origin master
        #
        # git push evennode master
        ;;
    *)
        echo "build finished"
        exit 1
esac
