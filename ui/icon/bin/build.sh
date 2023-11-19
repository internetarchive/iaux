#!/bin/zsh -e

# (re)generates all `src/*.js` and `test/` files (from `svg/*.svg` source images).

MYDIR=${0:a:h}

cd $MYDIR/..

# start of the main test/display page
cat >| test/index.html << EOF
<style>
  div {
    display: inline-block;
    width: 100px;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    vertical-align: top;
    margin: 10px 5px;
    background-color: #e9e9e9;
  }
</style>
<body>
EOF

cp  test/index.html  test/all.html

# Make a 2nd test page that imports all icon definitions at once
echo -n >| src/index.js
echo '<script type="module" src="../src/index.js"></script>' >> test/all.html


for SVG in svg/*.svg; do
  BASENAME=$(basename $SVG .svg)
  BASENAME_CAMEL=$(echo "$BASENAME" |perl -pe 's/-([a-z])/uc($1)/ge')
  OUT=src/${BASENAME}.js
  echo "generating $SVG => $OUT"

  # create icon's `src/...js` JS file
  cat >| $OUT << EOF
import IAIconBase from './base.js';

class IAIcon extends IAIconBase {
  constructor() {
    super(\`
$(cat $SVG)
\`);
  }
}

customElements.define('ia-icon-$BASENAME', IAIcon);

export default IAIcon;
EOF


  # add the icon to the default export of all icons, if someone does:
  #   import 'https://esm.archive.org/@iaux/icon'
  #   import { share, twitter } from 'https://esm.archive.org/@iaux/icon'
  echo "export { default as ${BASENAME_CAMEL} } from './${BASENAME}.js';" >> src/index.js


  # add the icon to the test pages
  echo "

<div>
  &lt;ia-icon-$BASENAME/&gt;
  <hr>
  <ia-icon-$BASENAME></ia-icon-$BASENAME>
</div>" \
    >| .basehtm

  cat .basehtm >> test/all.html
  cat .basehtm >> test/index.html
  rm  .basehtm
  echo '<script type="module" src="../src/'$BASENAME'.js"></script>' >> test/index.html

done
