<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" type="text/css"/>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
        <title>Pod Wielkim Dębem &nbsp; | &nbsp; Rezerwacje</title>
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
                <?php 
                    if ($_SESSION['logged']) {
                ?>
                <a class="link" id="this" href="rezerwacje.php">Rezerwacje</a>
                <?php } ?>
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
                        //po zalogowaniu
                        $querry = $connect -> query('SELECT imie FROM klienci WHERE id_klienta= "'. $_SESSION['id'] .'"');
                        while ($row = $querry -> fetch_assoc()) $imie = $row['imie'];
                ?>
                        <form method="post">
                            <table>
                            <tr><td> <?php echo "<p style='font-family: sans-serif'>Witaj  $imie :)</p>" ?>
                            <input type="submit" class="button" value="   Wyloguj się     " name="logout"/>
                        </td></tr>
                            </table>
                        </form>
                            <?php 
                                if (isset($_POST['logout'])) 
                                {
                                    $_SESSION['logged'] = false;
                                    header("Location:index.php");
                                }
                    }
                ?>


            </div>
            <div class="right">
               <?php 
                    //echo $_SESSION['id_rezerw'];
                    if (!isset($_SESSION['id_rezerw']))
                    {
                        header("Location:rezerwacje.php");
                    }
                    else
                    {
                ?>
                    <form method="post">
                        <table class="remove">
                        <tr><th>Czy na pewno chcesz usunąć rezerwacje?</th></tr>
                        <tr><td><input type="submit" class="button" name="yes" value="Tak"></td></tr>
                        <tr><td><input type="submit" class="button" name="no" value="Nie"></td></tr>
                        </table>
                    </form>
                <?php
                        $sql = "DELETE FROM rezerwacje WHERE id_rezerwacje=" . $_SESSION['id_rezerw'];
                        //IF YES
                        if (isset($_POST['yes']))
                        {
                            $query = $connect -> query($sql);
                            header("Location:rezerwacje.php");
                        }
                        //IF NO
                        if (isset($_POST['no'])) header("Location:rezerwacje.php");
                    }
                ?> 
            </div>
            <div class="footer">
                &copy; Martin Gladis
            </div>
        </div>
        <?php $connect->close() ?>
    </body>
</html>