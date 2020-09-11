function doOpenPhotos( ) {
    doClear();
    openImage( myContext1, 'img/lena256.png' );
    openImage( myContext2, 'img/airplane256.png' );
    openImage( myContext3, 'img/mandrill256.png' );
    openImage( myContext4, 'img/parrots256.png' );
    openImage( myContext5, 'img/cicada256.png' );
    openImage( myContext6, 'img/monkey256.png' );
}
//-------------------------------------------------------------------

function doOpenIndustrial( ) {
    doClear();
    openImage( myContext1, 'img/tire256.png' );
    openImage( myContext2, 'img/black_rectangles256.png' );
    openImage( myContext3, 'img/cross_board256.png' );
    openImage( myContext4, 'img/six_squares256.png' );
    openImage( myContext5, 'img/for_histogram256.png' );
    openImage( myContext6, 'img/grid256.png' );
}
//-------------------------------------------------------------------

function openImage( myContext, fileName ) {
    var myImage = new Image( );
    myImage.src = fileName;
    myImage.onload = function ( ) {
        myContext.drawImage( myImage, 0, 0 );
    }
}
//-------------------------------------------------------------------

function doColors( ) {
    doClear();
    myContext1.fillStyle = "red";
    myContext1.fillRect( 0, 0, myWidth, myHeight );
    myContext2.fillStyle = "green";
    myContext2.fillRect( 0, 0, myWidth, myHeight );
    myContext3.fillStyle = "blue";
    myContext3.fillRect( 0, 0, myWidth, myHeight );
    myContext4.fillStyle = "cyan";
    myContext4.fillRect( 0, 0, myWidth, myHeight );
    myContext5.fillStyle = "magenta";
    myContext5.fillRect( 0, 0, myWidth, myHeight );
    myContext6.fillStyle = "yellow";
    myContext6.fillRect( 0, 0, myWidth, myHeight );
}
//-------------------------------------------------------------------

function doNoise1( ) {
    doClear( );
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            var r = Math.floor( Math.random( ) * 256 );
            var g = Math.floor( Math.random( ) * 256 );
            var b = Math.floor( Math.random( ) * 256 );
            var gray = Math.floor( ( r + g + b ) / 3 );
            myContext1.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext1.fillRect( xe, ye, 1, 1 );
            myContext2.fillStyle = "rgba( " + gray + "," + gray + "," + gray + "," + 1 + " )";
            myContext2.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doNoise2( ) {
    doClear( );
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    var myImageDataOUT1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT1 = myImageDataOUT1.data;
    var myImageDataOUT2 = myContext2.getImageData( 0, 0, myWidth, myHeight );
    var myDataOUT2 = myImageDataOUT2.data;
    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataOUT1[ i ] = Math.floor( Math.random( ) * 256 );
        myDataOUT1[ i + 1 ] = Math.floor( Math.random( ) * 256 );
        myDataOUT1[ i + 2 ] = Math.floor( Math.random( ) * 256 );
        myDataOUT1[ i + 3 ] = 255; 
        var gray = Math.floor( ( myDataOUT1[ i ] + myDataOUT1[ i + 1 ] + myDataOUT1[ i + 2 ] ) / 3 );
        myDataOUT2[ i ] = gray;
        myDataOUT2[ i + 1 ] = gray;
        myDataOUT2[ i + 2 ] = gray;
        myDataOUT2[ i + 3 ] = 255;
    }
    myContext1.putImageData( myImageDataOUT1, 0, 0 );
    myContext2.putImageData( myImageDataOUT2, 0, 0 );
}
//-------------------------------------------------------------------

function doGrid1( ) {
    doClear( );
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            myContext1.fillStyle = ( ye % 2 === 0 ? ( xe % 2 === 0 ? '#FF0000' : '#0000FF' ) : ( xe % 2 === 0 ? '#00FF00' : '#FFFF00' ) );
            myContext1.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doGrid2( ) {
    doClear( );
    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;
    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        if ( ( Math.floor( i / 4 ) % myWidth ) % 2 === 0 )  // even xe...
        {
            if ( Math.floor( Math.floor( i / 4 ) / myWidth ) % 2 === 0 )  // even ye...
            {
                myDataIN[  i ] = 255; // red
                myDataIN[ i + 1 ] = 0;
                myDataIN[ i + 2 ] = 0;
                myDataIN[ i + 3 ] = 255;
            }
            else  // odd ye
            {
                myDataIN[ i ] = 0; // green
                myDataIN[ i + 1 ] = 255;
                myDataIN[ i + 2 ] = 0;
                myDataIN[ i + 3 ] = 255;
            }
        }
        else  // odd xe
        {
            if ( Math.floor( Math.floor( i / 4 ) / myWidth ) % 2 === 0 )  // even ye...
            {
                myDataIN[ i ] = 0; // blue
                myDataIN[ i + 1 ] = 0;
                myDataIN[ i + 2 ] = 255;
                myDataIN[ i + 3 ] = 255;
            }
            else  // odd ye
            {
                myDataIN[ i ] = 255; // yellow
                myDataIN[ i + 1 ] = 255;
                myDataIN[ i + 2 ] = 0;
                myDataIN[ i + 3 ] = 255;
            }
        }
    }
    myContext1.putImageData( myImageDataIN, 0, 0 );
}
//-------------------------------------------------------------------

function doTest4Histogram1( ) {
    doClear();
    var n, r, g, b;
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            n = ( xe * myWidth + ye ) % 256;

            r = n; g = xe, b = ye;
            myContext1.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext1.fillRect( xe, ye, 1, 1 );

            r = n; g = ye, b = xe;
            myContext2.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext2.fillRect( xe, ye, 1, 1 );

            r = xe; g = n, b = ye;
            myContext3.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext3.fillRect( xe, ye, 1, 1 );

            r = ye; g = n, b = xe;
            myContext4.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext4.fillRect( xe, ye, 1, 1 );

            r = xe; g = ye, b = n;
            myContext5.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext5.fillRect( xe, ye, 1, 1 );

            r = ye; g = xe, b = n;
            myContext6.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext6.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------


function doTest4Histogram2( ) {
    doClear();

    var myImageDataIN = myContext1.getImageData( 0, 0, myWidth, myHeight );
    var myDataIN = myImageDataIN.data;

    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / myWidth ) ) % 256;
        myDataIN[ i + 1 ] = Math.floor( i / 4 ) % 256;
        myDataIN[ i + 2 ] = Math.floor( Math.floor( i / 4 ) / myWidth );
    }
    myContext1.putImageData( myImageDataIN, 0, 0 );


    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / myWidth ) ) % 256;
        myDataIN[ i + 1 ] = Math.floor( Math.floor( i / 4 ) / myWidth );
        myDataIN[ i + 2 ] = Math.floor( i / 4 ) % 256;
    }
    myContext2.putImageData( myImageDataIN, 0, 0 );


    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = Math.floor( i / 4 ) % 256;
        myDataIN[ i + 1 ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / myWidth ) ) % 256;
        myDataIN[ i + 2 ] = Math.floor( Math.floor( i / 4 ) / myWidth );
    }
    myContext3.putImageData( myImageDataIN, 0, 0 );


    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = Math.floor( Math.floor( i / 4 ) / myWidth );
        myDataIN[ i + 1 ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / myWidth ) ) % 256;
        myDataIN[ i + 2 ] = Math.floor( i / 4 ) % myWidth;
    }
    myContext4.putImageData( myImageDataIN, 0, 0 );


    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = Math.floor( i / 4 ) % myWidth;
        myDataIN[ i + 1 ] = Math.floor( Math.floor( i / 4 ) / myWidth );
        myDataIN[ i + 2 ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / 256 ) ) % 256;
    }
    myContext5.putImageData( myImageDataIN, 0, 0 );


    for ( let i = 0; i < myDataIN.length; i += 4 ) {
        myDataIN[ i ] = Math.floor( Math.floor( i / 4 ) / myWidth );
        myDataIN[ i + 1 ] = Math.floor( i / 4 ) % myWidth;
        myDataIN[ i + 2 ] = ( Math.floor( i / 4 ) % myWidth * myWidth + Math.floor( Math.floor( i / 4 ) / 256 ) ) % 256;
    }
    myContext6.putImageData( myImageDataIN, 0, 0 );
}
//-------------------------------------------------------------------

function doTest1( ) {
    doClear();
    test1( myContext1, 0 );
    test1( myContext2, 51 );
    test1( myContext3, 102 );
    test1( myContext4, 153 );
    test1( myContext5, 204 );
    test1( myContext6, 255 );
}
//-------------------------------------------------------------------

function test1( myContext, r ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let g = xe;
            let b = ye;

            myContext.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
  
        }
    }
}
//-------------------------------------------------------------------

function doTest2( ) {
    doClear();
    test2( myContext1, 0 );
    test2( myContext2, 51 );
    test2( myContext3, 102 );
    test2( myContext4, 153 );
    test2( myContext5, 204 );
    test2( myContext6, 255 );
}
//-------------------------------------------------------------------

function test2( myContext, g ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = xe;
            let b = ye;
            myContext.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doTest3( ) {
    doClear();
    test3( myContext1, 0 );
    test3( myContext2, 51 );
    test3( myContext3, 102 );
    test3( myContext4, 153 );
    test3( myContext5, 204 );
    test3( myContext6, 255 );
}
//-------------------------------------------------------------------

function test3( myContext, b ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = xe;
            let g = ye;
            myContext.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doJava1( ) {
    doClear();
    java11( myContext1 );
    java12( myContext2 );
    java13( myContext3 );
    java14( myContext4 );
    java15( myContext5 );
    java16( myContext6 );
}
//-------------------------------------------------------------------

function java11( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java12( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + r + "," + b + "," + g + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java13( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + g + "," + r + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java14( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + g + "," + b + "," + r + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java15( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + b + "," + r + "," + g + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java16( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 1 ) ^ ( ye << 1 ) );
            let b = ( ( xe << 2 ) ^ ( ye << 2 ) );
            myContext.fillStyle = "rgba( " + b + "," + g + "," + r + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doJava2( ) {
    doClear();
    java21( myContext1 );
    java22( myContext2 );
    java23( myContext3 );
    java24( myContext4 );
    java25( myContext5 );
    java26( myContext6 );
}
//-------------------------------------------------------------------

function java21( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 4 ) ^ ( ye << 4 ) );
            myContext.fillStyle = "rgba( " + r + "," + g + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java22( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 3 ) ^ ( ye << 3 ) );
            myContext.fillStyle = "rgba( " + r + "," + b + "," + g + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java23( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 3 ) ^ ( ye << 3 ) );
            myContext.fillStyle = "rgba( " + g + "," + r + "," + b + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java24( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 3 ) ^ ( ye << 3 ) );
            myContext.fillStyle = "rgba( " + g + "," + b + "," + r + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java25( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 3 ) ^ ( ye << 3 ) );
            myContext.fillStyle = "rgba( " + b + "," + r + "," + g + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function java26( myContext ) {
    for ( let xe = 0; xe < myWidth; xe++ ) {
        for ( let ye = 0; ye < myHeight; ye++ ) {
            let r = ( xe ^ ye );
            let g = ( ( xe << 2 ) ^ ( ye << 2 ) );
            let b = ( ( xe << 3 ) ^ ( ye << 3 ) );
            myContext.fillStyle = "rgba( " + b + "," + g + "," + r + "," + 1 + " )";
            myContext.fillRect( xe, ye, 1, 1 );
        }
    }
}
//-------------------------------------------------------------------

function doClear( ) {
    myContext2.globalAlpha = 1;
    myContext2.fillStyle = "lightgray";
    myContext2.fillRect( 0, 0, myWidth, myHeight );
    myContext3.globalAlpha = 1;
    myContext3.fillStyle = "lightgray";
    myContext3.fillRect( 0, 0, myWidth, myHeight );
    myContext4.globalAlpha = 1;
    myContext4.fillStyle = "lightgray";
    myContext4.fillRect( 0, 0, myWidth, myHeight );
    myContext5.globalAlpha = 1;
    myContext5.fillStyle = "lightgray";
    myContext5.fillRect( 0, 0, myWidth, myHeight );
    myContext6.globalAlpha = 1;
    myContext6.fillStyle = "lightgray";
    myContext6.fillRect( 0, 0, myWidth, myHeight );
    linCorrection = false;
    linSimpleCorrection = false;
    nonLinCorrection = false;
}
//-------------------------------------------------------------------

function doMargins( ) {
    if ( myCanvas1.style.margin === '4px' ? myCanvas1.style.margin = '-4px' : myCanvas1.style.margin = '4px' );
    if ( myCanvas2.style.margin === '4px' ? myCanvas2.style.margin = '-4px' : myCanvas2.style.margin = '4px' );
    if ( myCanvas3.style.margin === '4px' ? myCanvas3.style.margin = '-4px' : myCanvas3.style.margin = '4px' );
    if ( myCanvas4.style.margin === '4px' ? myCanvas4.style.margin = '-4px' : myCanvas4.style.margin = '4px' );
    if ( myCanvas5.style.margin === '4px' ? myCanvas5.style.margin = '-4px' : myCanvas5.style.margin = '4px' );
    if ( myCanvas6.style.margin === '4px' ? myCanvas6.style.margin = '-4px' : myCanvas6.style.margin = '4px' );
}
//-------------------------------------------------------------------

function doClone( ) {
    doClear();
    var myImageDataIN1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myContext2.putImageData( myImageDataIN1, 0, 0 );
    myContext3.putImageData( myImageDataIN1, 0, 0 );
    myContext4.putImageData( myImageDataIN1, 0, 0 );
    myContext5.putImageData( myImageDataIN1, 0, 0 );
    myContext6.putImageData( myImageDataIN1, 0, 0 );
}
//-------------------------------------------------------------------

function doMoveO_CW( ) {
    var myImageDataIN1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myContext1.putImageData( myContext4.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext4.putImageData( myContext5.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext5.putImageData( myContext6.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext6.putImageData( myContext3.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext3.putImageData( myContext2.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext2.putImageData( myImageDataIN1, 0, 0 );
}
//-------------------------------------------------------------------

function doMoveO_CCW( ) {
    var myImageDataIN1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myContext1.putImageData( myContext2.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext2.putImageData( myContext3.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext3.putImageData( myContext6.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext6.putImageData( myContext5.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext5.putImageData( myContext4.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext4.putImageData( myImageDataIN1, 0, 0 );
}
//-------------------------------------------------------------------

function doMoveZ_R( ) {
    var myImageDataIN1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myContext1.putImageData( myContext6.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext6.putImageData( myContext5.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext5.putImageData( myContext4.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext4.putImageData( myContext3.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext3.putImageData( myContext2.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext2.putImageData( myImageDataIN1, 0, 0 );
}
//-------------------------------------------------------------------

function doMoveZ_L( ) {
    var myImageDataIN1 = myContext1.getImageData( 0, 0, myWidth, myHeight );
    myContext1.putImageData( myContext2.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext2.putImageData( myContext3.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext3.putImageData( myContext4.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext4.putImageData( myContext5.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext5.putImageData( myContext6.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
    myContext6.putImageData( myImageDataIN1, 0, 0 );
}
//-------------------------------------------------------------------

function doCopyFrom2( ) {
    myContext1.putImageData( myContext2.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
}
//-------------------------------------------------------------------

function doCopyFrom3( ) {
    myContext1.putImageData( myContext3.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
}
//-------------------------------------------------------------------

function doCopyFrom4( ) {
    myContext1.putImageData( myContext4.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
}
//-------------------------------------------------------------------

function doCopyFrom5( ) {
    myContext1.putImageData( myContext5.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
}
//-------------------------------------------------------------------

function doCopyFrom6( ) {
    myContext1.putImageData( myContext6.getImageData( 0, 0, myWidth, myHeight ), 0, 0 );
}
//-------------------------------------------------------------------