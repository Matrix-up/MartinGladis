//Channels

function doChannelsColors() {
    doClear();
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 1 ] = 0;
        myDataOUT[ i + 2 ] = 0;
    }
    myContext4.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = 0;
        myDataOUT[ i + 2 ] = 0;
    }
    myContext5.putImageData ( myImageDataOUT, 0, 0 );
    
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = 0;
        myDataOUT[ i + 1 ] = 0;
    }
    myContext6.putImageData ( myImageDataOUT, 0, 0 );
}

function doChannelsGray() {
    doClear();
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 1 ] = myDataOUT[ i ];
        myDataOUT[ i + 2 ] = myDataOUT[ i ];
    }
    myContext4.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = myDataOUT[ i + 1 ];
        myDataOUT[ i + 2 ] = myDataOUT[ i + 1 ];
    }
    myContext5.putImageData ( myImageDataOUT, 0, 0 );
    
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = myDataOUT[ i + 2 ];
        myDataOUT[ i + 1 ] = myDataOUT[ i + 2 ];
    }
    myContext6.putImageData ( myImageDataOUT, 0, 0 );
}

function doTwoChannels() {
    doClear();
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = 0;
    }
    myContext4.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 1 ] = 0;

    }
    myContext5.putImageData ( myImageDataOUT, 0, 0 );
    
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 2 ] = 0;
    }
    myContext6.putImageData ( myImageDataOUT, 0, 0 );
}

function doChannelCombinations() {
    doClear();
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 1 ] = myDataIN[ i + 2 ];
        myDataOUT[ i + 2 ] = myDataIN[ i + 1 ];
    }
    myContext2.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = myDataIN[ i + 2 ];
        myDataOUT[ i + 1 ] = myDataIN[ i ];
        myDataOUT[ i + 2 ] = myDataIN[ i + 1 ];
    }
    myContext3.putImageData ( myImageDataOUT, 0, 0 );
    
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i + 2 ] = myDataIN[ i ];
        myDataOUT[ i ] = myDataIN[ i + 2 ];
    }
    myContext4.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = myDataIN[ i + 1 ];
        myDataOUT[ i + 1 ] = myDataIN[ i + 2 ];
        myDataOUT[ i + 2 ] = myDataIN[ i ];
    }
    myContext5.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT[ i ] = myDataIN[ i + 1 ];
        myDataOUT[ i + 1 ] = myDataIN[ i ];
    }
    myContext6.putImageData ( myImageDataOUT, 0, 0 );
}

//Gray/Binary

function doGray() {
    doClear();
    doAverageGray( myContext1, myContext4 );
    doNTSCGray(myContext1, myContext5);
    doNTSCGrayInteger(myContext1, myContext6);
}

function doAverageGray( contextIN, contextOUT ) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    var myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;

    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = ( myDataIN[ i ] + myDataIN[ i + 1] + myDataIN[ i + 2] ) / 3
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    contextOUT.putImageData ( myImageDataOUT, 0, 0 );
}

function doNTSCGray( contextIN, contextOUT ) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;

    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1] + 0.114 * myDataIN[ i + 2] 
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    contextOUT.putImageData ( myImageDataOUT, 0, 0 );
}

function doNTSCGrayInteger( contextIN, contextOUT ) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;

    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = ( 77 * myDataIN[ i ] + 150 * myDataIN[ i + 1] + 29 * myDataIN[ i + 2] ) >> 8;
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    contextOUT.putImageData ( myImageDataOUT, 0, 0 );
}

function doBinary() {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;

    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1] + 0.114 * myDataIN[ i + 2] 
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    myContext2.putImageData ( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    var myLevel = Math.floor(Math.random() * 200 + 50);
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1 ] + 0.114 * myDataIN[ i + 2 ];
        ( myGray > myLevel ) ? myGray = 255 : myGray = 0;
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    myContext3.putImageData( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    myLevel = Math.floor(Math.random() * 200 + 50);
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1 ] + 0.114 * myDataIN[ i + 2 ];
        ( myGray > myLevel ) ? myGray = 255 : myGray = 0;
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    myContext4.putImageData( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    myLevel = Math.floor(Math.random() * 200 + 50);
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1 ] + 0.114 * myDataIN[ i + 2 ];
        ( myGray > myLevel ) ? myGray = 255 : myGray = 0;
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    myContext5.putImageData( myImageDataOUT, 0, 0 );

    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myDataOUT = myImageDataOUT.data;
    myLevel = Math.floor(Math.random() * 200 + 50);
    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        var myGray = 0.299 * myDataIN[ i ] + 0.587 * myDataIN[ i + 1 ] + 0.114 * myDataIN[ i + 2 ];
        ( myGray > myLevel ) ? myGray = 255 : myGray = 0;
        myDataOUT[ i ] = myGray;
        myDataOUT[ i + 1 ] = myGray;
        myDataOUT[ i + 2 ] = myGray;
    }
    myContext6.putImageData( myImageDataOUT, 0, 0 );
}

//Quantization

function doQuantization() {
    makeQuantization( myContext2, 128 );
    makeQuantization( myContext3, 32 );
    makeQuantization( myContext4, 8 );
    makeQuantization( myContext5, 4 );
    makeQuantization( myContext6, 2 );
}

function makeQuantization(context, value) {
    var myCoefficient = 256 / value;
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;
    for ( var i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT[ i ] = myCoefficient * ( Math.floor( myDataIN[ i ] / myCoefficient ) ) + myCoefficient / 2;
        myDataOUT[ i + 1 ] = myCoefficient * ( Math.floor( myDataIN[ i + 1 ] / myCoefficient ) ) + myCoefficient / 2;
        myDataOUT[ i + 2 ] = myCoefficient * ( Math.floor( myDataIN[ i + 2 ] / myCoefficient ) ) + myCoefficient / 2;
    }
    context.putImageData( myImageDataOUT, 0, 0 );
}

//Dark/Bright

function doBrighter() {
    makeBrighter( myContext2, 15 );
    makeBrighter( myContext3, 30 );
    makeBrighter( myContext4, 60 );
    makeBrighter( myContext5, 90 );
    makeBrighter( myContext6, 120 );
}

function makeBrighter( context, value) {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;
    for (var i = 0; i < myDataIN.length; i += 4) {
        if ( ( myDataIN[ i ] + value ) > 255 ? myDataOUT[ i ] = 255 : myDataOUT[ i ] = myDataIN[ i ] + value );
        if ( ( myDataIN[ i + 1 ] + value ) > 255 ? myDataOUT[ i + 1 ] = 255 : myDataOUT[ i + 1 ] = myDataIN[ i + 1 ] + value );
        if ( ( myDataIN[ i + 2 ] + value ) > 255 ? myDataOUT[ i + 2 ] = 255 : myDataOUT[ i + 2 ] = myDataIN[ i + 2 ] + value );
        myDataOUT[ i + 3 ] = myDataIN[ i + 3 ];
    }
    context.putImageData( myImageDataOUT, 0, 0 );
}

function doDarker() {
    makeDarker( myContext2, 15 );
    makeDarker( myContext3, 30 );
    makeDarker( myContext4, 60 );
    makeDarker( myContext5, 90 );
    makeDarker( myContext6, 120 );
}

function makeDarker( context, value) {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;
    for (var i = 0; i < myDataIN.length; i += 4) {
        if ( ( myDataIN[ i ] - value ) < 0 ? myDataOUT[ i ] = 0 : myDataOUT[ i ] = myDataIN[ i ] - value );
        if ( ( myDataIN[ i + 1 ] - value ) < 0 ? myDataOUT[ i + 1 ] = 0 : myDataOUT[ i + 1 ] = myDataIN[ i + 1 ] - value );
        if ( ( myDataIN[ i + 2 ] - value ) < 0 ? myDataOUT[ i + 2 ] = 0 : myDataOUT[ i + 2 ] = myDataIN[ i + 2 ] - value );
        myDataOUT[ i + 3 ] = myDataIN[ i + 3 ];
    }
    context.putImageData( myImageDataOUT, 0, 0 );
}