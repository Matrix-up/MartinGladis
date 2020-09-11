<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" type="text/css"/>
        <title>Pod Wielkim Dębem &nbsp; | &nbsp; Załóż konto</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
        <script type="text/javascript" src="script-rezerwacja.js"></script>
    </head>
    <body>
        <?php
            session_start();
            $connect = new mysqli('mysql.cba.pl','matrix98a','Baza12345','matrix98a');
            $connect -> query("SET CHARSET utf8"); // polskie znaki
            $connect -> query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); // polskie znaki 
            if (!isset($_SESSION['logged'])) $_SESSION['logged'] = false;
        ?>
        <div id="site">
            <div class="nav">
                <div id="logo"><img src="logo.png" id="img_logo" alt="logo"/></div>
                <div id="title">Restauracja pod Wielkim Dębem</div>
            </div>
            <div class="left">
                <a class="link" href="index.php">Strona Główna</a>
                <a class="link" href="onas.php">O nas</a>
                <a class="link" href="menu.php">Menu</a>
                <a class="link" href="galeria.php">Galeria</a>
                <a class="link" href="kontakt.php">Kontakt</a>

                <br />
                <?php
                    //logowanie się
                    if(!$_SESSION['logged']) {
                ?>
                <h4>Logowanie</h4>
                <form method="post" name="login">
                    <table>
                        <tr><td>Login:</td><td><input type="text" name="user"/></td></tr>
                        <tr><td>Hasło:</td><td><input type="password" name="haslo" /></td></tr>
                        <tr><td colspan="2"><input type="submit" class="button" value="zaloguj się" name="login"/></td></tr>
                        <tr><td colspan="2">Nie masz konta? <br /><a href="zaloz_konto.php">Zarejestruj się</a> ;)</td></tr>
                        <tr><td colspan="2">
                            <?php
                                if(isset($_POST['login']))
                                {
                                    if(empty($_POST['user']) || empty($_POST['haslo']))
                                    {
                                        if (empty($_POST['user']))
                                            echo "<p style='color: #CC0000; font-family: arial'>Wpisz login</p>";
                                        if (empty($_POST['haslo']))
                                            echo "<p style='color: #CC0000; font-family: arial'>Wpisz haslo</p>";
                                    }
                                    else
                                    {
                                        $querry = $connect -> query("SELECT id_klienta, username, haslo as haslo FROM klienci");
                                        while ($row = $querry -> fetch_assoc())
                                            if($row['username'] == $_POST['user'] && $row['haslo'] ==  md5($_POST['haslo']))
                                            {
                                                $_SESSION['id'] = $row['id_klienta'];
                                                $_SESSION['logged'] = true;
                                                header("Refresh:0");
                                            }
                                        echo "<p style='color: #CC0000; font-family: Calibri sans-serif'>Błędny login lub hasło</p>";
                                    }
                                }
                            ?>
                        </td></tr>
                    </table>
                    <br/>
                </form>
                <?php
                    }
                    else
                    {
                        header("Location: index.php");
                    }
                        ?>


            </div>
            <div class="right">
                <div class="formularz"><form id="rezerw" method="post">
                    <table>
                        <tr><th colspan="2">Dane potrzebne do założenia konta</th></tr>
                        <tr><td class="tdform">Nazwa Użytkownika</td><td><input type="text" id="username" name="username"/></td></tr>
                        <tr><td class="tdform">Hasło:</td><td><input type="password" name="haslo" id="haslo"/></td></tr>
                        <tr><td class="tdform">Powtórz hasło:</td><td><input type="password" name="haslo2" id="haslo2"/></td></tr>
                        <tr><td class="tdform">Imię</td><td><input type="text" id="imie" name="imie" /></td></tr>
                        <tr><td class="tdform">Nazwisko</td><td><input type="text" id="nazwisko" name="nazwisko"/></td></tr>
                        <tr><td class="tdform">E-mail</td><td><input type="email" id="email" name="email"/></td></tr>
                        <tr><td class="tdform">Numer telefonu</td><td><input type="tel" id="phone" value="+48" maxlength="15" name="phone"/></td></tr>
                        <tr><td class="tdform">Miejscowość</td><td><input type="text" id="miejscowosc" name="miejscowosc"/></td></tr>
                        <tr><td class="tdform">Kod pocztowy</td><td><input type="text" id="kod" maxlength="6" name="kod"/></td></tr>
                        <tr><td colspan="2"><div id="communicate"></div></td></tr>
                        <tr><td class="tdform"><input type="reset" value="Wyczyść" class="button"/></td><td><input type="submit" value="Załóż konto" class="button" id="send" name="send"/></td></tr>
                    </table>
                    <?php
                        if (isset($_POST['send']))
                        {
                            $sql = 'INSERT INTO klienci (username, haslo, imie, nazwisko, email, nr_telefonu, Miejscowosc, kod_pocztowy) 
                                    VALUES ("'. $_POST['username'] .'","'. md5($_POST['haslo']).'","'. $_POST['imie'] .'","'. $_POST['nazwisko'] .'","'. $_POST['email'] .'","'. $_POST['phone'] .'","'. $_POST['miejscowosc'] .'","'. $_POST['kod'] .'")';
                            if ($connect->query($sql) === TRUE)
                                echo "<script type='text/javascript'>alert('Konto zostało założone','')</script>";
                            else
                                echo "<script type='text/javascript'>alert('Nie udało się konta założyć','')</script>";
                            header("Refresh:0");
                        }
                    ?>
                </form></div>
            </div>
            <div class="footer">
                &copy; Martin Gladis
            </div>
        </div>
        <?php $connect->close() ?>
    </body>
</html>