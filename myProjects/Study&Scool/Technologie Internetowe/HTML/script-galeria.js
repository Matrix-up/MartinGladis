var selectedImage = 1;
var time;
$(function(){
    $('.view').html('<img id="view" src="gallery/1.jpg" />');
    for (i = 1; i <= 15; i++)
    {
        $('.gallery').append('<img id="ph'+i+'" class="min-photo" src="gallery/'+i+'.jpg"/>')
    }
    $('#ph1').addClass('selected')
    timeOut();
    $('.min-photo').click(function(){
        $('#view').fadeOut(500, function(){$(this).attr('src','')});
        setTimeout(function(){
        }, 600);
        $('#ph'+selectedImage).removeClass('selected')
        selectedImage = parseInt($(this).attr('id').substr(2));
        setTimeout(function(){
            $('#view').attr('src','gallery/'+selectedImage+'.jpg').fadeIn(500, function(){});
        }, 600);
        $('#ph'+selectedImage).addClass('selected');
        clearInterval(time);
        timeOut();
    })
    $('#r-arrow').click(function(){
        $('#view').fadeOut(500, function(){$(this).attr('src','')});
        setTimeout(function(){
        }, 600);
        $('#ph'+selectedImage).removeClass('selected');
        selectedImage++;
        if(selectedImage > 15) selectedImage = 1;
        setTimeout(function(){
            $('#view').attr('src','gallery/'+selectedImage+'.jpg').fadeIn(500, function(){});
        }, 600);
        $('#ph'+selectedImage).addClass('selected');
        clearInterval(time);
        timeOut();
    })
    $('#l-arrow').click(function(){
        $('#view').fadeOut(500, function(){$(this).attr('src','')});
        setTimeout(function(){
        }, 600);
        $('#ph'+selectedImage).removeClass('selected');
        selectedImage--;
        if(selectedImage < 1) selectedImage = 15;
        setTimeout(function(){
            $('#view').attr('src','gallery/'+selectedImage+'.jpg').fadeIn(500, function(){});
        }, 600);
        $('#ph'+selectedImage).addClass('selected');
        clearInterval(time);
        timeOut();
    })
})

function timeOut()
{
    time = setInterval(function(){
        $('#view').fadeOut(500, function(){$(this).attr('src','')});
        setTimeout(function(){
        }, 600);
        $('#ph'+selectedImage).removeClass('selected');
        selectedImage++;
        if(selectedImage > 15) selectedImage = 1;
        setTimeout(function(){
            $('#view').attr('src','gallery/'+selectedImage+'.jpg').fadeIn(500, function(){});
        }, 600);
        $('#ph'+selectedImage).addClass('selected');
    }, 5000)
}