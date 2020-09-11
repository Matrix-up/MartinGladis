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
                <a class="link" href="rezerwacje.php">Rezerwacje</a>
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
            <div class="formularz"><form id="rezerw" method="post">
                <?php if($_SESSION['logged']) { ?>
                    <table>
                        <tr><th colspan="2">Złóż rezerwacje</th></tr>
                        <tr><td class="tdform">Data</td><td><input type="date" name="date" class="date" value="<?= date('Y-m-d'); ?>"/></td></tr>
                        <tr><td class="tdform">Godzina</td><td>
                            <select class="list" name="time">
                                <option>11:00</option>
                                <option>13:00</option>
                                <option>15:00</option>
                                <option>17:00</option>
                                <option>19:00</option>
                                <option>21:00</option>
                            </select>
                        </td></tr>
                        <tr><td colspan="2"><input type="submit" class="button" value="Złóż rezerwacje" name="rezerw"></td></tr>
                    </table>
                    <?php
                        if (isset($_POST['rezerw']))
                        {
                            $flag = TRUE;
                            $datetime = strtotime($_POST['date'] . " " . $_POST['time']);
                            $query = $connect -> query('SELECT termin_rezerwacji FROM rezerwacje');
                            while ($row = $query->fetch_assoc())
                                if (strtotime($row['termin_rezerwacji']) == $datetime) $flag = FALSE;
                            if ($flag) {
                                $sql = 'INSERT INTO rezerwacje (data_zlozenia, termin_rezerwacji, id_klienta)
                                VALUES ("' . date('Y-m-d') . '","' . date('Y-m-d H:i', $datetime) . '",' . $_SESSION['id'] . ')';
                                if (date('Y-m-d') < date('Y-m-d', $datetime))
                                {
                                    header("Location:rezerwacje.php");
                                    $connect->query($sql);
                                }
                                else echo "<p style='color: red; font family: arial'>Błąd: Prosze Wybrać dzień z czasu przyszłego</p>";
                            }
                            else echo "<p style='color: red; fomt-family: arial'>Termin jest już zajęty</p>";
                        }
                    ?>
                </form>
                    <?php } else header("Location:index.php"); ?>
                </div>
            </div>
            <div class="footer">
                &copy; Martin Gladis
            </div>
        </div>
        <?php $connect->close() ?>
    </body>
</html>