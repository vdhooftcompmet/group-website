#!/bin/bash

read -p "GitHub Pages repository name: " url

regexp_url='^[A-Za-z_-]+\.github\.io$'
if [[ "$url" =~ $regexp_url ]]; then 
    IFS='.' read -r -a array <<< "$url"
    username=${array[0]}
    echo "Valid url '$url' for '$username'"

    # echo "Configuring 'package.json' with GitHub Pages repository..."
    # filename="package.json"
    # full_url="https:\/\/"$url"\/"
    # regexp_json='("website"\: )"https\:\/\/[A-Za-z_-]+\.github\.io\/"'
    # sed -E -i.bak "" "s/$regexp_json/\1\"$full_url\"/" package.json

    echo "Renaming remote 'origin' to 'dev'..."
    git remote rename origin dev
    
    echo "Adding new origin directed at $url..."
    git remote add origin "git@github.com:$username/$url.git"

    echo "Done"

else 
    echo "Invalid url";
    exit 1;
fi