// Rotation

function doRotation90Axy() {
    doClear();

    for ( let xe = 0; xe < myWidth; xe++ ) {
        for (let ye = 0; ye < myHeight; ye++ ){
            var pixel = myContext1.getImageData( xe, ye, 1, 1 );
            var DataIN = pixel.data;
            var r = DataIN[ 0 ];
            var g = DataIN[ 1 ];
            var b = DataIN[ 2 ];
            myContext2.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext2.fillRect( 255 - ye, xe, 1, 1 );
        }
    }
}

function doRotation90AImageData() {
    doClear();

    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * xe + 255 - ye;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext2.putImageData( myImageDataOUT, 0, 0 );
}

function doRotation90BImageData() {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = 255 - ( Math.floor( Math.floor( i / 4 ) / myWidth ) );
        var ye = Math.floor( i / 4 ) % myWidth;
        var desc = myWidth * ye + xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext3.putImageData( myImageDataOUT, 0, 0 );
}

function doRotation180AImageData() {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - ye) + 255 - xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext4.putImageData( myImageDataOUT, 0, 0 );
}

function doRotation180AImageData() {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - ye) + 255 - xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext4.putImageData( myImageDataOUT, 0, 0 );
}

function doRotation270AImageData() {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - xe) + ye;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext5.putImageData( myImageDataOUT, 0, 0 );
}

function doRotation270BImageData() {
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( Math.floor( i / 4 ) / myWidth);
        var ye = 255 - ( Math.floor( i / 4 ) % myWidth );
        var desc = myWidth * ye + xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContext6.putImageData( myImageDataOUT, 0, 0 );
}

function doAllRotation() {
    doRotation90AImageData();
    doRotation90BImageData();
    doRotation180AImageData();
    doRotation270AImageData();
    doRotation270BImageData();
}

//Rotation Theta

function RotationsThetaVer1 (myCanvasIN, myCanvasOUT, Theta, xs = myWidth / 2, ys = myHeight / 2 ) {
    var myContextIN = myCanvasIN.getContext( '2d' );
    var myContextOUT = myCanvasOUT.getContext( '2d' );
    var myImageDataIN = myContextIN.getImageData( 0, 0, myWidth, myCanvasOUT.height );
    var myImageDataOUT = myContextOUT.getImageData( 0, 0, myWidth, myCanvasOUT.height );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;
    var x1, y1;
    var cost = Math.cos( Theta * Math.PI / 180.0 );
    var sint = Math.sin( Theta * Math.PI / 180.0 );
    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth );
        x1 = xs + Math.floor( ( xe - xs ) * cost + ( ye - ys ) * sint + 0.5 );
        y1 = ys + Math.floor( -( xe - xs ) * sint + ( ye - ys ) * cost + 0.5 );
        if ( ( x1 >= 0 ) && ( x1 < myWidth ) && (y1 >= 0 ) && ( y1 < myHeight ) ) {
            var j = ( myWidth * y1 + x1 ) * 4;
            myDataOUT[ i ] = myDataIN[ j ];
            myDataOUT[ i + 1 ] = myDataIN[ j + 1 ];
            myDataOUT[ i + 2 ] = myDataIN[ j + 2 ];
            myDataOUT[ i + 3 ] = myDataIN[ j + 3 ];
        } else {
            myDataOUT[ i ] = 0xCC;
            myDataOUT[ i + 1 ] = 0xCC;
            myDataOUT[ i + 2 ] = 0xCC;
            myDataOUT[ i + 3 ] = 255;
        }
    }
    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doRotationsThetaVer1() {
    doClear();
    RotationsThetaVer1(myCanvas1, myCanvas2, 15 );
    RotationsThetaVer1(myCanvas1, myCanvas3, 30 );
    RotationsThetaVer1(myCanvas1, myCanvas4, 45 );
    RotationsThetaVer1(myCanvas1, myCanvas5, 60 );
    RotationsThetaVer1(myCanvas1, myCanvas6, 75 );
}

function doRotationsThetaVer2() {
    doClear();
    RotationsThetaVer1(myCanvas1, myCanvas2, 15 );
    RotationsThetaVer1(myCanvas2, myCanvas3, 15 );
    RotationsThetaVer1(myCanvas3, myCanvas4, 15 );
    RotationsThetaVer1(myCanvas4, myCanvas5, 15 );
    RotationsThetaVer1(myCanvas5, myCanvas6, 15 );
}

function doRotationsThetaVer3() {
    doClear();
    RotationsThetaVer1(myCanvas1, myCanvas2, 15, 0, 0 );
    RotationsThetaVer1(myCanvas1, myCanvas3, 15, myWidth, 0 );
    RotationsThetaVer1(myCanvas1, myCanvas4, 15 );
    RotationsThetaVer1(myCanvas1, myCanvas5, 15, myWidth, myHeight );
    RotationsThetaVer1(myCanvas1, myCanvas6, 15, 0, myHeight );
}

//Reflections

function doReflectionVertically(myContextOUT) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * ye + 255 - xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doReflectionHorizontally(myContextOUT) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - ye) + xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doReflectionDiagonalA(myContextOUT) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * xe + ye;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doReflectionDiagonalB(myContextOUT) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - xe) + 255 - ye;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doReflectionVerticallyAndHorizontally(myContextOUT) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * (255 - ye) + 255 - xe;
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doAllReflectionsVer1() {
    doReflectionVertically(myContext2);
    doReflectionVerticallyAndHorizontally(myContext3);
    doReflectionHorizontally(myContext4);
    doReflectionDiagonalB(myContext5);
    doReflectionDiagonalA(myContext6);
}

function doAllReflectionsVer2() {
    doReflectionVertically(myContext2);
    doReflectionHorizontally(myContext4);
    myContext3.putImageData( myContext1.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    doReflectionVerticallyAndHorizontally(myContext5);
    doReflectionHorizontally(myContext6);
}

//Pixel Shiffts

function doPixelShiffts( myContextOUT, dx, dy ) {
    
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContext1.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        var desc = myWidth * ((ye + dy) % 256) + ((xe + dx) % 256);
        myDataOUT[ desc * 4 ] = myDataIN [ i ];
        myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
        myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
        myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doAllPixelShifftsVer1() {
    doPixelShiffts( myContext2, 128, 128 );
    doPixelShiffts( myContext3, 0, 128 );
    doPixelShiffts( myContext4, 128, 0 );
    doPixelShiffts( myContext5, 128, 0 );
    doPixelShiffts( myContext6, 0, 128 );
}

function doAllPixelShifftsVer2() {
    doPixelShiffts( myContext2, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000) );
    doPixelShiffts( myContext3, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000) );
    doPixelShiffts( myContext4, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000) );
    doPixelShiffts( myContext5, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000) );
    doPixelShiffts( myContext6, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000) );
}


//Magnification

function doMagnification( myContextIN,  myContextOUT ) {
    var myImageDataIN = myContextIN.getImageData( 0, 0, myWidth, myHeight );
    var myImageDataOUT = myContextIN.getImageData( 0, 0, myWidth, myHeight );

    var myDataIN = myImageDataIN.data;
    var myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        for ( let ie = 0; ie < 2; ie++ ) {
            var desc = myWidth * ye  + ( 2 * xe + ie );
            myDataOUT[ desc * 4 ] = myDataIN [ i ];
            myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
            myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
            myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
        }
    }
    myContextOUT.putImageData( myImageDataOUT, 0, 0 );

    myImageDataIN = myContextOUT.getImageData( 0, 0, myWidth, myHeight );
    myImageDataOUT = myContextOUT.getImageData( 0, 0, myWidth, myHeight );

    myDataIN = myImageDataIN.data;
    myDataOUT = myImageDataOUT.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        var xe = Math.floor( i / 4 ) % myWidth;
        var ye = Math.floor( Math.floor( i / 4 ) / myWidth);
        for ( let je = 0; je < 2; je ++ ) {
            var desc = myWidth * ( 2 * ye + je ) + xe;
            myDataOUT[ desc * 4 ] = myDataIN [ i ];
            myDataOUT[ desc * 4 + 1 ] = myDataIN [ i + 1 ];
            myDataOUT[ desc * 4 + 2 ] = myDataIN [ i + 2 ];
            myDataOUT[ desc * 4 + 3 ] = myDataIN [ i + 3 ];
        }
    }

    myContextOUT.putImageData( myImageDataOUT, 0, 0 );
}

function doAllMagnificationVer1() {
    doMagnification( myContext1, myContext2 );
    doMagnification( myContext2, myContext3 );
    doMagnification( myContext3, myContext4 );
    doMagnification( myContext4, myContext5 );
    doMagnification( myContext5, myContext6 );
}