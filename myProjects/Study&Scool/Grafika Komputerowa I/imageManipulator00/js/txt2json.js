const fs = require( 'fs' );

var myText = fs.readFileSync( 'pt1.txt', 'utf8' );
var myListText = myText.toString().split( '\r\n' );

for( var i = 0; i < myListText.length; i++ ) {
    myListText[ i ] = myListText[ i ].replace( /"/g, '\\"');
}

var myJSON = 'var myJSONdata = {\n';
myJSON += '     "myText": [\n';
for ( i = 0; i < myListText.length - 1; i++ ) {
    if ( myListText[ i ].trim().length > 0 ) {
        myJSON += '     { "line' + '" : "' + myListText[ i ] + '"},\n'
    }
}
i = myListText.length - 1;
myJSON += '     { "line' + '" : "' + myListText[ i ] + '"},\n'
myJSON += '     ]\n'
myJSON += '}'
fs.writeFile( 'pt1.js', myJSON, ( err ) => {
    if ( err ) throw err;
    console.log( 'File "pt1.js" saved!' );
} );