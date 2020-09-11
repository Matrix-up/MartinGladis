var ones = [ 0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8 ];

function colorCounter( event, myContext ) {
   var myImageDataIN = myContext.getImageData( 0,  0, myWidth, myHeight );

   var myDataIN = myImageDataIN.data;
   var myTable = new Array( 256 );
   for ( var b = 0; b < myTable.length; b++ ) {
      myTable[ b ] = new Array( 256 );
   }

   for ( var r = 0; r < 256; r++ ) {
      for ( var g = 0; g < 256; g++ ) {
         myTable[ r ][ g ] = null;
      }
   }
   for ( var i = 0; i < myDataIN.length; i += 4 ) {
      r = myDataIN[ i ];
      g = myDataIN[ i + 1 ];
      b = myDataIN[ i + 2 ];
      if ( myTable [ r ][ g ] === null ) {
         myTable[ r ][ g ] = new Uint8Array( 32 );
         for ( var j = 0; j < 32; j++ ) myTable[ r ][ g ][ j ] = 0;
      }
      var b1 = b % 8;
      var b2 = Math.floor( b / 8 );

      var nn = myTable[ r ][ g ][ b2 ];
      nn = nn | Math.pow( 2, b1 );
      myTable[ r ][ g ][ b2 ] = nn;
   }

   var howMany = 0;
   for ( r = 0; r < 256; r++) {
      for ( g = 0; g < 256; g++) {
         if ( myTable[ r ][ g ] != null ) {
               for ( i = 0; i < 32; i++) {
                  howMany += ones[ myTable[ r ][ g ][ i ] ] ;
               }
         }
      }
   }
   //console.log( '$$$$$', howMany );
   myTable = null;
   return howMany;
}
