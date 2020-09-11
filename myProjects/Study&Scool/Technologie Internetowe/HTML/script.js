function responsibility()
{
    if ($(window).width() <= 900 || $(window).width() * 1.5 < $(window).height()) 
    {
        $('.left').addClass('optional');
        $('.right').addClass('optional');
        $('.left').height('100%');
        $('.right').height('100%');

        if ($(window).height() > $('.nav').height() + $('.left').height() + $('.right').height() + $('.footer').height())
            $('.right').height($(window).height() - ($('.nav').height() + $('.left').height() + $('.footer').height()));
        
        
        if ($(window).width() < 600) 
        {
            $("#logo").hide();
            $("#title").css('width','100%');
        }
        else
        {
            $("#logo").show();
            $("#title").css('width','85%');
        }
    }
    else
    {
        $('.left').removeClass('optional');
        $('.right').removeClass('optional');
        $('.left').height(1500);
        $('.right').height(1500);

        if ($('.right').height() < $(window).height() - ($('.nav').height() + $('.footer').height()))
        {
            $('.right').height($(window).height() - ($('.nav').height() + $('.footer').height()));
            $('.left').height($(window).height() - ($('.nav').height() + $('.footer').height()));
        }

        if ($('#logo').is(':hidden'))
        {
            $('#logo').show();
            $("#title").css('width','85%');
        }
    }
}

$(function(){
    responsibility();
    $(window).resize(function(){
        responsibility();
    })
})