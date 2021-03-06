$(function(){
    $('#imie').keyup(function(){ 
        $(this).val($(this).val().substr(0, 1).toUpperCase() + $(this).val().substr(1).toLowerCase());
    });
    $('#nazwisko').keyup(function(){ 
        $(this).val($(this).val().substr(0, 1).toUpperCase() + $(this).val().substr(1).toLowerCase());
    });
    $('#miejscowosc').keyup(function(){ 
        $(this).val($(this).val().substr(0, 1).toUpperCase() + $(this).val().substr(1).toLowerCase());
    });
    $('#imie').keyup(function(e){ 
        if (e.which >= 48 && e.which <= 57) $(this).val($(this).val().substr(0, $(this).val().length - 1));
    });
    $('#nazwisko').keyup(function(e){ 
        if (e.which >= 48 && e.which <= 57) $(this).val($(this).val().substr(0, $(this).val().length - 1));
    });
    $('#miejscowosc').keyup(function(e){ 
        if (e.which >= 48 && e.which <= 57) $(this).val($(this).val().substr(0, $(this).val().length - 1));
    });
    $('#kod').keyup(function(e){
        if ((e.which > 40 && e.which <= 47) || (e.which >= 58 && e.which <= 127)) $(this).val($(this).val().substr(0, $(this).val().length - 1));
        else
        {
            if ($(this).val().length == 2 && e.which != 8) this.value += '-';
            if ($(this).val().charAt(2) != '-' && $(this).val().length >= 3) $(this).val($(this).val().substr(0,2) + '-');
        }
    });
    $('#phone').keyup(function(e){
        if ((e.which > 40 && e.which <= 47) || (e.which >= 58 && e.which <= 127) && e.which != 8) $(this).val($(this).val().substr(0, $(this).val().length - 1));
    });
    $('#phone').keyup(function(){
        if ($(this).val() == '') $(this).val('+48');
    });
    $('#send').click(function(event){
        var flag = true;
        var comm = $('#communicate');
        var user = $('#username').val();
        var password = $('#haslo').val();
        var password2 = $('#haslo2').val();
        var imie = $('#imie').val();
        var nazwisko = $('#nazwisko').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var miejscowosc = $('#miejscowosc').val();
        var kod = $('#kod').val();
        comm.html("");

        //user
        if (user == '')
        {
            comm.append('<p>Proszę uzupełnić pole: Nazwa Użytkownika</p>');
            flag = false;
        }

        //haslo
        if (password == '')
        {
            comm.append('<p>Proszę uzupełnić pole: haslo</p>');
            flag = false;
        }
        

        //porównywanie haseł
        if (password != password2)
        {
            comm.append('<p>Hasła się nie zgadzają</p>');
            flag = false;
        }

        //imie
        if (imie == '')
        {
            comm.append('<p>Proszę uzupełnić pole: Imię</p>');
            flag = false;
        }
        for (i = 0; i < imie.length; i++) 
        {
            if (imie.charAt(i) >= '0' && imie.charAt(i) <= '9') 
            {
                comm.append('<p>Imię nie może zawierać cyfry</p>');
                flag = false;
                break;
            }
        }

        //nazwisko
        if (nazwisko == '')
        {
            comm.append('<p>Proszę uzupełnić pole: Nazwisko</p>');
            flag = false;
        }
        for (i = 0; i < nazwisko.length; i++) 
        {
            if (nazwisko.charAt(i) >= '0' && nazwisko.charAt(i) <= '9')
            {
                comm.append('<p>Nazwisko nie może zawierać cyfry</p>');
                flag = false;
                break;
            }
        }
        
        //email
        if (email == '')
        {
            comm.append('<p>Proszę uzupełnić pole: E-mail</p>');
            flag = false;
        }

        //numer telefonu
        if (phone == '') 
        {
            comm.append('<p>Proszę uzupełnić pole: Numer telefonu</p>');
            flag = false;
        }
        else if (phone.length <= 9) 
        {
            comm.append('<p>Numer telefonu jest niekompletny</p>');
            flag = false;
        }
        if (phone.charAt(0) != '+') 
        {
            comm.append('<p>Brak numeru kierunkowego</p>');
            flag = false;
        }
        else {
        for (i = 1; i < phone.length; i++) 
        {
            if (phone.charAt(i) < '0' || phone.charAt(i) > '9')
            {
                comm.append('<p>Niepoprawny numer telefonu</p>');
                flag = false;
                break;
            }
        }}

        //miejscowość
        if (miejscowosc == '') 
        {
            comm.append('<p>Proszę uzupełnić pole: Miejscowość</p>');
            flag = false;
        }
        for (i = 0; i < miejscowosc.length; i++) 
        {
            if (miejscowosc.charAt(i) >= '0' && miejscowosc.charAt(i) <= '9')
            {
                comm.append('<p>Miejscowość nie może zawierać cyfry</p>');
                flag = false;
                break;
            }
        }

        //kod pocztowy
        if (kod == '') 
        {
            comm.append('<p>Proszę uzupełnić pole: Kod pocztowy</p>');
            flag = false;
        }
        else if (kod.length != 6) 
        {
            comm.append('<p>Kod pocztowy jest niekompetny</p>');
            flag = false;
        }
        else {
        for (i = 0; i < kod.length; i++) 
        {
            if ((kod.charAt(i) < '0' || kod.charAt(i) > '9') && !(i == 2 && kod.charAt(i) == '-')) 
            {
                comm.append('<p>Kod pocztowy nie może zawierać litery</p>');
                flag = false;
                break;
            }
        }}

        $('p').css('color','red');
        $('p').css('margin','5px');

        //SUBMIT
        if (!flag) event.preventDefault();
    });    
})