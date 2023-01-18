#!/bin/sh

cp -r zendesk/assets/* dist/assets
cp -r zendesk/translations dist
cp zendesk/manifest.json dist
sed -i 's/http\:\/\/localhost\:[0-9]\+/assets\/index.html/g' dist/manifest.json
sed -i 's/url.\//url(/g' dist/assets/*.css

cd  dist
zat package