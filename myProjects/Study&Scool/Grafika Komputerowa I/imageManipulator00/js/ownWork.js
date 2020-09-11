function sepia( contextIN, contextOUT, value ) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;

    for (var i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT[ i ] = myDataIN[ i ] + ( 2 * value );
        if ( myDataOUT[ i ] > 255 ) myDataOUT[ i ] = 255;
        myDataOUT[ i + 1 ] = myDataIN[ i + 1 ] + value;
        if ( myDataOUT[ i + 1 ] > 255 ) myDataOUT[ i + 1 ] = 255;
    }

    contextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doSepia() {
    doClear();
    doNTSCGray(myContext1, myContext4);
    doNTSCGray(myContext1, myContext5);
    doNTSCGray(myContext1, myContext6);
    sepia(myContext4, myContext4, 20);
    sepia(myContext5, myContext5, 30);
    sepia(myContext6, myContext6, 40);
}

// --- negative ---

function doNegative() {
    doClear();
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;

    for (var i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT[ i ] = 255 - myDataIN[ i ];
        myDataOUT[ i + 1 ] = 255 - myDataIN[ i + 1 ];
        myDataOUT[ i + 2 ] = 255 - myDataIN[ i + 2 ];
    }

    myContext2.putImageData( myImageDataOUT, 0, 0 );
}

// --- rainbow ---

function doRainbow() {
    doClear();
    rainbow(myContext4, 0.3);
    rainbow(myContext5, 0.5);
    rainbow(myContext6, 0.7);
}

function rainbow( contextOUT, alpha ) {
    contextOUT.putImageData( myContext1.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    paint( contextOUT, 0, 'red', alpha);
    paint( contextOUT, myHeight / 7, 'orange', alpha);
    paint( contextOUT, 2 * myHeight / 7, 'yellow', alpha);
    paint( contextOUT, 3 * myHeight / 7, 'green', alpha);
    paint( contextOUT, 4 * myHeight / 7, 'cyan', alpha);
    paint( contextOUT, 5 * myHeight / 7, 'blue', alpha);
    paint( contextOUT, 6 * myHeight / 7, 'purple', alpha);
}

function paint( context, position, color, alpha ) {
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.fillRect(0, position, myWidth, myHeight / 7);
}

function doMiddleBrightness() {
    doClear();
    middleBrightness( myContext1, myContext2);
    middleBrightness( myContext2, myContext3);
    middleBrightness( myContext3, myContext4);
    middleBrightness( myContext4, myContext5);
    middleBrightness( myContext5, myContext6);
}

function middleBrightness(contextIN, contextOUT) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;
    var average = 0;
    for (var i = 0; i < myDataIN.length; i += 4 ) {
        var avr = ( myDataIN[ i ] + myDataIN[ i + 1 ] + myDataIN[ i + 2 ] ) / 3;
        average += avr;
    }
    average /= myDataIN.length / 4;

    for (var i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT[ i ] = Math.floor( ( myDataIN[ i ] + average ) / 2  );
        myDataOUT[ i + 1 ] = Math.floor( ( myDataIN[ i + 1 ] + average ) / 2 );
        myDataOUT[ i + 2 ] = Math.floor( ( myDataIN[ i + 2 ] + average ) / 2 );
    }

    contextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doMiddleColor() {
    doClear();
    middleColor( myContext1, myContext2);
    middleColor( myContext2, myContext3);
    middleColor( myContext3, myContext4);
    middleColor( myContext4, myContext5);
    middleColor( myContext5, myContext6);
}

function middleColor(contextIN, contextOUT) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;
    var averageRed = 0;
    var averageGreen = 0;
    var averageBlue = 0;
    for (var i = 0; i < myDataIN.length; i += 4 ) {
        averageRed += myDataIN[ i ];
        averageGreen += myDataIN[ i + 1 ];
        averageBlue += myDataIN[ i + 2 ];
    }

    averageRed /= myDataIN.length / 4;
    averageGreen /= myDataIN.length / 4;
    averageBlue /= myDataIN.length / 4;

    for (var i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT[ i ] = Math.floor( ( myDataIN[ i ] + averageRed ) / 2  );
        myDataOUT[ i + 1 ] = Math.floor( ( myDataIN[ i + 1 ] + averageGreen ) / 2 );
        myDataOUT[ i + 2 ] = Math.floor( ( myDataIN[ i + 2 ] + averageBlue ) / 2 );
    }

    contextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doHueSaturationValue() {
    doClear();
    hueSaturationValue(myContext1, myContext2, 180, 0, 0);
    hueSaturationValue(myContext1, myContext3, 0, 1, 0);
    hueSaturationValue(myContext1, myContext4, 0, 0, 1);
    hueSaturationValue(myContext1, myContext5, 60, 0, 1);
    hueSaturationValue(myContext1, myContext6, 180, 1, 1);
}

function hueSaturationValue( contextIN, contextOUT, h = 0, s = 0, v = 0) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;

    for (var i = 0; i < myDataIN.length; i += 4 ) {
        var hsv = rgb2hsv( myDataIN[ i ], myDataIN[ i + 1 ], myDataIN[ i + 2 ] )
        hsv[ 0 ] += h;
        hsv[ 1 ] += s;
        hsv[ 2 ] += v;
        if ( hsv[ 0 ] >= 360 ) hsv[ 0 ] %= 360;
        if ( hsv[ 0 ] < 0 ) hsv[ 0 ] += 360;

        if ( hsv[ 1 ] > 100 ) hsv[ 1 ] = 100;
        if ( hsv[ 1 ] < 0 ) hsv[ 1 ] = 0;

        if ( hsv[ 2 ] > 100 ) hsv[ 2 ] = 100;
        if ( hsv[ 2 ] < 0 ) hsv[ 2 ] = 0;

        var rgb = hsv2rgb( hsv[ 0 ], hsv[ 1 ], hsv[ 2 ]);
        myDataOUT[ i ] = rgb[ 0 ];
        myDataOUT[ i + 1 ] = rgb[ 1 ];
        myDataOUT[ i + 2 ] = rgb[ 2 ];
    }
    contextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function rgb2hsv ( r, g, b ) {
    r /= 255; 
    g /= 255;
    b /= 255;
    var hsv = []
    cmax = Math.max( r, g, b )
    cmin = Math.min( r, g, b )
    delta = cmax - cmin;

    //h
    if( delta == 0 ) hsv[ 0 ] = h = 0;
    else {
        if ( cmax == r ) hsv[ 0 ] = 60 * ( ( ( g - b ) / delta ) % 6 );
        else if ( cmax == g ) hsv[ 0 ] = 60 * ( ( ( b - r ) / delta ) + 2 );
        else hsv[ 0 ] = 60 * ( ( ( r - g ) / delta ) + 4 );
    }

    //s
    if ( cmax == 0 ) hsv[ 1 ] = 0
    else hsv[ 1 ] = delta / cmax;

    //v
    hsv[ 2 ] = cmax;

    return hsv;
}

function hsv2rgb( h, s, v ){
    var rgb = [];
    if ( v == 0 ) rgb = [0, 0, 0];
    else {
        var c = v * s;
        var x = c * ( 1 - Math.abs( ( h / 60 ) % 2 - 1 ) );
        var m = v - c;
        if ( h >= 0 && h < 60) rgb = [c, x, 0];
        else if ( h >= 60 && h < 120) rgb = [x, c, 0];
        else if ( h >= 120 && h < 180) rgb = [0, c, x];
        else if ( h >= 180 && h < 240) rgb = [0, x, c];
        else if ( h >= 240 && h < 300) rgb = [x, 0, c];
        else rgb = [c, 0, x];
        rgb = [(rgb[ 0 ] + m) * 255, (rgb[ 1 ] + m) * 255, (rgb[ 2 ] + m) * 255,]
    }
    return rgb
}
