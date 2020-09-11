function drawTextColor( context, text, x0, y0, color )
{
    context.fillStyle = color;
    context.fillText ( text, x0, y0 );
}

function drawLineColor ( context, x0, y0, x1, y1, color )
{
    context.beginPath();
    context.strokeStyle = color;
    context.setLineDash ( [ 1, 0 ] );
    context.lineWidth = 1;
    context.moveTo( x0, y0 );
    context.lineTo( x1, y1) ;
    context.stroke();
}


function doCalculateHistogram() {
    doClear();
    doNTSCGray( myContext1, myContext2 );
    doDrawHistogram( myContext2, myContext3, 0);
    doDrawHistogram( myContext1, myContext4, 1);
    doDrawHistogram( myContext1, myContext5, 2);
    doDrawHistogram( myContext1, myContext6, 3);
}

function doDrawHistogram( contextIN, contextOUT, channel ) {
    var histogram = [];
    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }
    var myColor;
    switch( channel ) {
        case 0 :
            myColor = 'gray';
            break;
        case 1 :
            myColor = 'red';
            break;
        case 2 :
            myColor = 'green';
            break;
        case 3 :
            myColor = 'blue';
            break;
    }

    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) {
        switch ( channel ) {
            case 0 :
                var gray = Math.floor( ( 77 * myDataIN[ i ] + 150 * myDataIN[ i + 1] + 29 * myDataIN[ i + 2] ) >> 8);
                histogram[ gray ] += 1;
                break;
            case 1 :
                histogram [ myDataIN[ i ] ] += 1;
                break;
            case 2 :
                histogram [ myDataIN[ i + 1 ] ] += 1;
                break;
            case 3 :
                histogram [ myDataIN[ i + 2 ] ] += 1;
                break;
        }
    }
    console.log ( histogram );
    var histogram1Max = 0;
    var index1Max = 0;
    var histogram2Max = 0;
    var index2Max = 0;
    var howManyNotZero = 0;
    var firstNotZero = 0;
    var lastNotZero = 255;
    var baseLineY = 236;

    for( let i = 0; i < 256; i++ ) {
        if ( histogram[ i ] > histogram1Max ) {
            histogram1Max = histogram[ i ];
            index1Max = i;
        }
        if( histogram[ i ] > 0 ) howManyNotZero++;
    }
    while( histogram[ firstNotZero ] == 0 ) firstNotZero++;
    while( histogram[ lastNotZero ] == 0 ) lastNotZero--;

    for( let i = 0; i < 256; i++ ) {
        if( histogram[ i ] > histogram2Max ) {
            if ( i != index1Max ) {
                histogram2Max = histogram[ i ];
                index2Max = i;
            }
        }
    }

    drawLineColor( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColor( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColor( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColor( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColor( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColor( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    for ( let i = 0; i < 256; i++ ) drawLineColor( contextOUT, i, baseLineY, i, baseLineY - Math.floor( histogram[ i ] * 128 / histogram1Max ), myColor);
    drawTextColor( contextOUT, '1 value max: ' + histogram1Max, 2, 12, 'black' );
    drawTextColor( contextOUT, '1 index max: ' + index1Max, 172, 12, 'black' );
    drawTextColor( contextOUT, '2 value max: ' + histogram2Max, 2, 24, 'black' );
    drawTextColor( contextOUT, '2 index max: ' + index2Max, 172, 24, 'black' );
    drawTextColor( contextOUT, 'Number of nonZero Levels: ' + howManyNotZero, 2, 36, 'black' );
    drawTextColor( contextOUT, 'First nonZero Levels: ' + firstNotZero, 2, 48, 'black' );
    drawTextColor( contextOUT, 'First nonZero Levels: ' + lastNotZero, 2, 60, 'black' );
}


//// =============OK==================


function drawLineColorOK ( context, x0, y0, x1, y1, color )
{
    context.beginPath();
    context.strokeStyle = color;
    context.setLineDash ( [ 1, 0 ] );
    context.lineWidth = 1;
    context.moveTo( x0 + 0.5, y0 + 0.5);
    context.lineTo( x1 + 0.5, y1 + 0.5 );
    context.stroke();
}

function doCalculateHistogramOK() {
    doClear();
    doNTSCGray( myContext1, myContext2 );
    doDrawHistogramOK( myContext2, myContext3, 0);
    doDrawHistogramOK( myContext1, myContext4, 1);
    doDrawHistogramOK( myContext1, myContext5, 2);
    doDrawHistogramOK( myContext1, myContext6, 3);
}

function doDrawHistogramOK( contextIN, contextOUT, channel ) {
    var histogram = [];
    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }
    var myColor;
    switch( channel ) {
        case 0 :
            myColor = 'gray';
            break;
        case 1 :
            myColor = 'red';
            break;
        case 2 :
            myColor = 'green';
            break;
        case 3 :
            myColor = 'blue';
            break;
    }

    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) {
        switch ( channel ) {
            case 0 :
                var gray = Math.floor( ( 77 * myDataIN[ i ] + 150 * myDataIN[ i + 1] + 29 * myDataIN[ i + 2] ) >> 8);
                histogram[ gray ] += 1;
                break;
            case 1 :
                histogram [ myDataIN[ i ] ] += 1;
                break;
            case 2 :
                histogram [ myDataIN[ i + 1 ] ] += 1;
                break;
            case 3 :
                histogram [ myDataIN[ i + 2 ] ] += 1;
                break;
        }
    }
    console.log ( histogram );
    var histogram1Max = 0;
    var index1Max = 0;
    var histogram2Max = 0;
    var index2Max = 0;
    var howManyNotZero = 0;
    var firstNotZero = 0;
    var lastNotZero = 255;
    var baseLineY = 236;

    for( let i = 0; i < 256; i++ ) {
        if ( histogram[ i ] > histogram1Max ) {
            histogram1Max = histogram[ i ];
            index1Max = i;
        }
        if( histogram[ i ] > 0 ) howManyNotZero++;
    }
    while( histogram[ firstNotZero ] == 0 ) firstNotZero++;
    while( histogram[ lastNotZero ] == 0 ) lastNotZero--;

    for( let i = 0; i < 256; i++ ) {
        if( histogram[ i ] > histogram2Max ) {
            if ( i != index1Max ) {
                histogram2Max = histogram[ i ];
                index2Max = i;
            }
        }
    }

    drawLineColorOK( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColorOK( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    for ( let i = 0; i < 256; i++ ) drawLineColorOK( contextOUT, i, baseLineY, i, baseLineY - Math.floor( histogram[ i ] * 128 / histogram1Max ), myColor);
    drawTextColor( contextOUT, '1 value max: ' + histogram1Max, 2, 12, 'black' );
    drawTextColor( contextOUT, '1 index max: ' + index1Max, 172, 12, 'black' );
    drawTextColor( contextOUT, '2 value max: ' + histogram2Max, 2, 24, 'black' );
    drawTextColor( contextOUT, '2 index max: ' + index2Max, 172, 24, 'black' );
    drawTextColor( contextOUT, 'Number of nonZero Levels: ' + howManyNotZero, 2, 36, 'black' );
    drawTextColor( contextOUT, 'First nonZero Levels: ' + firstNotZero, 2, 48, 'black' );
    drawTextColor( contextOUT, 'First nonZero Levels: ' + lastNotZero, 2, 60, 'black' );
}


// --- Cumulative algorithm


function doCalculateCumulativeHistogram() {
    doClear();
    doNTSCGray( myContext1, myContext2 );
    doDrawCumulativeHistogram( myContext2, myContext3, 0);
    doDrawCumulativeHistogram( myContext1, myContext4, 1);
    doDrawCumulativeHistogram( myContext1, myContext5, 2);
    doDrawCumulativeHistogram( myContext1, myContext6, 3);
}

function doDrawCumulativeHistogram( contextIN, contextOUT, channel ) {
    var histogram = [];
    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }
    var myColor;
    switch( channel ) {
        case 0 :
            myColor = 'gray';
            break;
        case 1 :
            myColor = 'red';
            break;
        case 2 :
            myColor = 'green';
            break;
        case 3 :
            myColor = 'blue';
            break;
    }

    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) {
        switch ( channel ) {
            case 0 :
                var gray = Math.floor( ( 77 * myDataIN[ i ] + 150 * myDataIN[ i + 1] + 29 * myDataIN[ i + 2] ) >> 8);
                histogram[ gray ] += 1;
                break;
            case 1 :
                histogram [ myDataIN[ i ] ] += 1;
                break;
            case 2 :
                histogram [ myDataIN[ i + 1 ] ] += 1;
                break;
            case 3 :
                histogram [ myDataIN[ i + 2 ] ] += 1;
                break;
        }
    }
    console.log ( histogram );
    var histogram1Max = 0;
    var baseLineY = 236;

    for( let i = 0; i < 256; i++ ) histogram1Max += histogram[ i ];

    drawLineColorOK( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColorOK( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    var value = 0;
    for ( let i = 0; i < 256; i++ ) { 
        value += histogram[ i ];
        drawLineColorOK( contextOUT, i, baseLineY, i, baseLineY - Math.floor( value * 192 / histogram1Max ), myColor);
    }
}


// --- Correction

function doCorrection() {
    doClear();
    doDrawHistogramAll( myContext1, myContext2 );
    correction( myContext1, myContext3);
    doDrawHistogramOK( myContext3, myContext4, 1);
    doDrawHistogramOK( myContext3, myContext5, 2);
    doDrawHistogramOK( myContext3, myContext6, 3);
}

function doDrawHistogramAll( contextIN, contextOUT ) {
    var histogram = [];

    // ---red---

    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }

    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) histogram [ myDataIN[ i ] ] += 1;
    console.log ( histogram );
    var histogram1Max = 0;
    var baseLineY = 78;

    for( let i = 0; i < 256; i++ ) {
        if ( histogram[ i ] > histogram1Max ) histogram1Max = histogram[ i ];
    }

    drawLineColorOK( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColorOK( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    for ( let i = 0; i < 256; i++ ) drawLineColorOK( contextOUT, i, baseLineY, i, baseLineY - Math.floor( histogram[ i ] * 64 / histogram1Max ), 'red');

    // ---green---

    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }

    myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) histogram [ myDataIN[ i + 1 ] ] += 1;
    console.log ( histogram );
    histogram1Max = 0;
    baseLineY = 157;

    for( let i = 0; i < 256; i++ ) {
        if ( histogram[ i ] > histogram1Max ) histogram1Max = histogram[ i ];
    }

    drawLineColorOK( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColorOK( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    for ( let i = 0; i < 256; i++ ) drawLineColorOK( contextOUT, i, baseLineY, i, baseLineY - Math.floor( histogram[ i ] * 64 / histogram1Max ), 'green');

    // ---blue---

    for ( let h = 0; h < 256; h++ ) {
        histogram[ h ] = 0;
    }

    myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    myDataIN = myImageDataIN.data;
    for( let i = 0; i < myDataIN.length; i +=4 ) histogram [ myDataIN[ i + 2 ] ] += 1;
    console.log ( histogram );
    histogram1Max = 0;
    baseLineY = 236;

    for( let i = 0; i < 256; i++ ) {
        if ( histogram[ i ] > histogram1Max ) histogram1Max = histogram[ i ];
    }

    drawLineColorOK( contextOUT, 0, baseLineY, 255, baseLineY, 'black' );
    drawLineColorOK( contextOUT, 0, baseLineY, 0, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '0', 2, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 64, baseLineY, 64, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '64', 66, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 128, baseLineY, 128, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '128', 130, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 192, baseLineY, 192, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '192', 194, baseLineY + 14, 'black' );
    drawLineColorOK( contextOUT, 255, baseLineY, 255, baseLineY + 5, 'black' );
    drawTextColor( contextOUT, '255', 238, baseLineY + 14, 'black' );
    for ( let i = 0; i < 256; i++ ) drawLineColorOK( contextOUT, i, baseLineY, i, baseLineY - Math.floor( histogram[ i ] * 64 / histogram1Max ), 'blue');
}

function correction (contextIN, contextOUT) {
    var myImageDataIN = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    var myImageDataOUT = contextIN.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT = myImageDataOUT.data;
    
    var histogramRed = [], histogramGreen = [], histogramBlue = [];
    var firstNotZero = [0, 0, 0];
    var lastNotZero = [255, 255, 255];

    for ( let h = 0; h < 256; h++ ) {
        histogramRed[ h ] = 0;
        histogramGreen[ h ] = 0;
        histogramBlue[ h ] = 0;
    }

    for( let i = 0; i < myDataIN.length; i +=4 ) {
        histogramRed [ myDataIN[ i ] ] += 1;
        histogramGreen [ myDataIN[ i + 1 ] ] += 1;
        histogramBlue [ myDataIN[ i + 2 ] ] += 1;
    }

    while( histogramRed[ firstNotZero[ 0 ] ] == 0 ) firstNotZero[0]++;
    while( histogramRed[ lastNotZero[ 0 ] ] == 0 ) lastNotZero[0]--;

    while( histogramGreen[ firstNotZero[ 1 ] ] == 0 ) firstNotZero[1]++;
    while( histogramGreen[ lastNotZero[ 1 ] ] == 0 ) lastNotZero[1]--;

    while( histogramBlue[ firstNotZero[ 2 ] ] == 0 ) firstNotZero[2]++;
    while( histogramBlue[ lastNotZero[ 2 ] ] == 0 ) lastNotZero[2]--;

    for ( var i = 0; i < myDataOUT.length; i += 4 ) {
        myDataOUT [ i ] = Math.floor((255 * (myDataIN[ i ] - firstNotZero[ 0 ])) / (lastNotZero[ 0 ] - firstNotZero[ 0 ]));
        myDataOUT [ i + 1 ] = Math.floor((255 * (myDataIN[ i + 1 ] - firstNotZero[ 1 ])) / (lastNotZero[ 1 ] - firstNotZero[ 1 ]));
        myDataOUT [ i + 2 ] = Math.floor((255 * (myDataIN[ i + 2 ] - firstNotZero[ 2 ])) / (lastNotZero[ 2 ] - firstNotZero[ 2 ]));
    }
    contextOUT.putImageData( myImageDataOUT, 0, 0 );
}