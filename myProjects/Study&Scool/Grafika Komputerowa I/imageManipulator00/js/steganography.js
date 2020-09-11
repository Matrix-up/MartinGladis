function doStep01() {
    doClear();
    for( let i = 0; i < myJSONdata.myText.length; i++ ) {
        var textLine = myJSONdata.myText[ i ].line;
        for( let j = 0; j < textLine.length; j++ ){
            let number = textLine.charCodeAt( j );
            console.log( ' ->', textLine[ j ], number );
        }
    }
}

function doStep02() {
    doClear();
    for( let i = 0; i < myJSONdata.myText.length; i++ ) {
        var textLine = myJSONdata.myText[ i ].line;
        for( let j = 0; j < textLine.length; j++ ){
            let number = textLine.charCodeAt( j );
            console.log( ' ->', textLine[ j ], number, number.toString( 2 ) );
        }
    }
}

function doStep03() {
    doClear();
    for( let i = 0; i < myJSONdata.myText.length; i++ ) {
        var textLine = myJSONdata.myText[ i ].line;
        for( let j = 0; j < textLine.length; j++ ){
            let number = textLine.charCodeAt( j );
            console.log( ' ->', textLine[ j ], number, number.toString( 2 ).padStart( 8, '0' ) );
        }
    }
}

function doStep04() {
    doClear();
    for( let i = 0; i < myJSONdata.myText.length; i++ ) {
        var textLine = myJSONdata.myText[ i ].line;
        for( let j = 0; j < textLine.length; j++ ){
            let number = textLine.charCodeAt( j );
            if ( number > 255 ) {
                console.log( ' ->', textLine[ j ], number,
                number.toString( 2 ).padStart( 16, '0' ),
                number.toString( 2 ).padStart( 16, '0' ).substring(7, 8),
                number.toString( 2 ).padStart( 16, '0' ).substring(8, 11),
                number.toString( 2 ).padStart( 16, '0' ).substring(11, 13),
                number.toString( 2 ).padStart( 16, '0' ).substring(13, 16), );
            } else {
                console.log( ' ->', textLine[ j ], number,
                number.toString( 2 ).padStart( 8, '0' ).substring(0, 3),
                number.toString( 2 ).padStart( 8, '0' ).substring(3, 5),
                number.toString( 2 ).padStart( 8, '0' ).substring(5, 8), );
            }
        }
    }
}

function doStep05Preparation() {
    doClear();
    for( let i = 0; i < myJSONdata.myText.length; i++ ) {
        var textLine = myJSONdata.myText[ i ].line;
        for( let j = 0; j < textLine.length; j++ ){
            let number = textLine.charCodeAt( j );
            if ( number > 255 ) {
                console.log( ' =>', textLine[ j ], number,
                Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ),
                Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(0, 3),
                Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(3, 5),
                Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(5, 8), '-->',
                parseInt( Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(0, 3), 2 ),
                parseInt( Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(3, 5), 2 ),
                parseInt( Math.trunc(number / 256).toString( 2 ).padStart( 8, '0' ).substring(5, 8), 2 ) );
                console.log( '==>', textLine[ j ], number, number % 256,
                ( number % 256 ).toString( 2 ).padStart( 8, '0' ),
                ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(0, 3),
                ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(3, 5),
                ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(5, 8), '-->',
                parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(0, 3), 2 ),
                parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(3, 5), 2 ),
                parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(5, 8), 2 ) );
            }
            else {
                console.log( ' ->', textLine[ j ], number,
                number.toString( 2 ).padStart( 8, '0' ).substring(0, 3),
                number.toString( 2 ).padStart( 8, '0' ).substring(3, 5),
                number.toString( 2 ).padStart( 8, '0' ).substring(5, 8), '-->',
                parseInt( number.toString( 2 ).padStart( 8, '0' ).substring(0, 3), 2 ),
                parseInt( number.toString( 2 ).padStart( 8, '0' ).substring(3, 5), 2 ),
                parseInt( number.toString( 2 ).padStart( 8, '0' ).substring(5, 8), 2 ) );
            }
        }
        number = 13;
        console.log( ' *>', number, number.toString( 2 ).padStart( 8, '0' ),
        number.toString( 2 ).padStart( 8, '0' ).substring(0, 3),
        number.toString( 2 ).padStart( 8, '0' ).substring(3, 5),
        number.toString( 2 ).padStart( 8, '0' ).substring(5, 8), '-->',
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(0, 3), 2 ),
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(3, 5), 2 ),
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(5, 8), 2 ) );
        number = 10;
        console.log( ' *>', number, number.toString( 2 ).padStart( 8, '0' ),
        number.toString( 2 ).padStart( 8, '0' ).substring(0, 3),
        number.toString( 2 ).padStart( 8, '0' ).substring(3, 5),
        number.toString( 2 ).padStart( 8, '0' ).substring(5, 8), '-->',
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(0, 3), 2 ),
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(3, 5), 2 ),
        parseInt( ( number % 256 ).toString( 2 ).padStart( 8, '0' ).substring(5, 8), 2 ) );
    }
}