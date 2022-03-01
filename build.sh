#!/bin/bash

case $1 in 
    "deploy") echo "Target: deploy";;
    "run") echo "Target: run";;
    *) echo "Expected one of ['deploy', 'run']"; exit 1;;
esac

echo "  npm install";
if ! npm install ; then 
    echo "ERROR: 'npm install' failed"
    exit 1
fi

case $1 in 
    "deploy") 
        echo "Target: deploy";

        echo "  npm run build";
        if ! npm run build ; then 
            echo "ERROR: 'npm run build' failed"
            exit 1
        fi;

        echo "  npm run deploy";
        if ! npm run deploy ; then 
            echo "ERROR: 'npm run deploy' failed"
            exit 1
        fi;;

    "run") 
        echo "Target: run";

        echo "  npm run prebuild";
        if ! npm run prebuild ; then 
            echo "ERROR: 'npm run prebuild' failed"
            exit 1
        fi 

        echo "  npm run dev";
        if ! npm run dev ; then 
            echo "ERROR: 'npm run dev' failed"
            exit 1
        fi;;
esac