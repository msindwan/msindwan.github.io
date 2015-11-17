#! /bin/bash

TEMP_PORTFOLIO_DIR=tmp
EXTS="\(css\|js\|html\|otf\|woff\|ttf\|gif\|jpg\|png\|ico\)"
VERSION=$( date +%s )

if [ -d $TEMP_PORTFOLIO_DIR ]; then
  rm -r $TEMP_PORTFOLIO_DIR
fi

mkdir $TEMP_PORTFOLIO_DIR

cp -r css                $TEMP_PORTFOLIO_DIR/css
cp -r errors             $TEMP_PORTFOLIO_DIR/errors
cp -r fonts              $TEMP_PORTFOLIO_DIR/fonts
cp -r images             $TEMP_PORTFOLIO_DIR/images
cp index.html            $TEMP_PORTFOLIO_DIR/index.html
cp -r js                 $TEMP_PORTFOLIO_DIR/js

cd $TEMP_PORTFOLIO_DIR

uglifyjs js/app.js -o js/app.min.js
rm js/app.js

cleancss -o css/design.min.css css/design.css
rm css/design.css

cleancss -o css/error.min.css css/error.css
rm css/error.css

HTML_FILES=(index.html errors/404_page.html)

sed -i "s/js\/app.js\/js/app.compact.min.jsg/g" index.html

for i in ${HTML_FILES[@]}; do
	sed -i "s/css\/design.css/css\/design.min.css/g" $i
	sed -i "s/css\/error.css/css\/error.min.css/g"   $i
	sed -i "s/js\/app.js/js\/app.min.js/g"   $i

	sed -i "s/.\.$EXTS/&?v=$VERSION/g" $i
done

cd ..
tar -cvf Portfolio.tar -C $TEMP_PORTFOLIO_DIR .
rm -r $TEMP_PORTFOLIO_DIR