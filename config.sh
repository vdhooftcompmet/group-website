#!/bin/bash

read -p "GitHub Pages repository name: " url

regexp_url='^[A-Za-z_-]+\.github\.io$'
if [[ "$url" =~ $regexp_url ]]; then 
    IFS='.' read -r -a array <<< "$url"
    username=${array[0]}
    echo "Valid url '$url' for '$username'"

    echo "configuring 'package.json' with GitHub Pages repository..."
    filename="package.json"
    full_url="https:\/\/"$url"\/"
    regexp_json='("website"\: )"https\:\/\/[A-Za-z_-]+\.github\.io\/"'
    sed -E -i "" "s/$regexp_json/\1\"$full_url\"/" package.json

    echo "changing git remote 'origin' to direct to GitHub Pages repository..."
    git remote add website "git@github.com:$username/$url.git"

    echo "create and checkout  'dev' branch..."
    git checkout -b dev

else 
    echo "Invalid url";
    exit 1;
fi