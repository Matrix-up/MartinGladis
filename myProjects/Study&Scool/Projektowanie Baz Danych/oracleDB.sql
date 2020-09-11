-- *******************************************************************************
-- *                                                                     
-- *   GRUPA LABORATORYJNA: 10		               
-- *                                 
-- *******************************************************************************
-- * 																		     
-- *   Nazwisko i imię: Gladis Martin                                                        
-- * 																		     
-- *******************************************************************************
-- * 																		     
-- *   Nr indeksu: 97601
-- * 																		     
-- *******************************************************************************
-- * 																		     
-- *   Temat projektu: Implementacja RDB na SZBD ORACLE                                                          
-- * 																		     
-- *******************************************************************************

-- PROSZĘ NIE UŻYWAĆ W SKRYPTACH ALIASÓW DLA SCHEMATÓW BAZ


-- -------------------------------------------------------------------------------
-- TWORZENIE STRUKTURY BAZY DANYCH  
-- [PAMIĘTAĆ O KLUCZACH OBCYCH]                                          
-- -------------------------------------------------------------------------------


CREATE TABLE kelner (
    id_kelnera      NUMBER(2) NOT NULL,
    imie            NVARCHAR2(50) NOT NULL,
    nazwisko        NVARCHAR2(70) NOT NULL,
    pesel           CHAR(11) NOT NULL,
    data_urodzenia  DATE
);

ALTER TABLE kelner ADD CONSTRAINT kelner_pk PRIMARY KEY ( id_kelnera );

CREATE TABLE klient (
    id_klienta   NUMBER(2) NOT NULL,
    imie         NVARCHAR2(50) NOT NULL,
    nazwisko     NVARCHAR2(70) NOT NULL,
    pesel        CHAR(11),
    miejscowosc  NVARCHAR2(50) NOT NULL,
    ulica        NVARCHAR2(20) NOT NULL,
    nr_domu      NVARCHAR2(3) NOT NULL
);

ALTER TABLE klient ADD CONSTRAINT klient_pk PRIMARY KEY ( id_klienta );

CREATE TABLE kucharz (
    id_kucharza     NUMBER(3) NOT NULL,
    imie            NVARCHAR2(50) NOT NULL,
    nazwisko        NVARCHAR2(50) NOT NULL,
    data_urodzenia  DATE
);

ALTER TABLE kucharz ADD CONSTRAINT kucharz_pk PRIMARY KEY ( id_kucharza );

CREATE TABLE kucharz_zamowienia (
    zamowienia_id_zamowienia  NUMBER(2) NOT NULL,
    kucharz_id_kucharza       NUMBER(3) NOT NULL
);

ALTER TABLE kucharz_zamowienia ADD CONSTRAINT kucharz_zamowienie_pk PRIMARY KEY ( zamowienia_id_zamowienia,
                                                                                  kucharz_id_kucharza );

CREATE TABLE napoje (
    id_napoju  NUMBER(3) NOT NULL,
    nazwa      NVARCHAR2(100) NOT NULL,
    cena       NUMBER(5, 2) NOT NULL
);

ALTER TABLE napoje ADD CONSTRAINT napoje_pk PRIMARY KEY ( id_napoju );

CREATE TABLE potrawy (
    id_potrawy  NUMBER(2) NOT NULL,
    nazwa       NVARCHAR2(100) NOT NULL,
    cena        NUMBER(5, 2) NOT NULL
);

ALTER TABLE potrawy ADD CONSTRAINT potrawy_pk PRIMARY KEY ( id_potrawy );

CREATE TABLE rezerwacje (
    id_rezerwacje             NUMBER(2) NOT NULL,
    data_zlozenia_rezerwacji  DATE NOT NULL,
    termin_rezerwacji         DATE NOT NULL,
    id_klienta                NUMBER(2) NOT NULL,
    nr_stolika                NUMBER(2) NOT NULL,
    data_odwolania            DATE
);

ALTER TABLE rezerwacje ADD CONSTRAINT rezerwacje_pk PRIMARY KEY ( id_rezerwacje );


CREATE TABLE stoliki (
    nr_stolika     NUMBER(2) NOT NULL,
    liczba_miejsc  CHAR(2) NOT NULL
);

ALTER TABLE stoliki ADD CONSTRAINT stoliki_pk PRIMARY KEY ( nr_stolika );

CREATE TABLE zamowienia (
    id_zamowienia    NUMBER(2) NOT NULL,
    id_rezerwacje    NUMBER(2) NOT NULL,
    czas_zlozenia    DATE NOT NULL,
    czas_wydania     DATE,
    id_kelnera_odb   NUMBER(2) NOT NULL,
    id_kelnera_real  NUMBER(2) NOT NULL
);

ALTER TABLE zamowienia ADD CONSTRAINT zamowienia_pk PRIMARY KEY ( id_zamowienia );

CREATE TABLE zamowione_napoje (
    id_napoju_pk   NUMBER(2) NOT NULL,
    id_zamowienia  NUMBER(2) NOT NULL,
    id_napoju_fk   NUMBER(3) NOT NULL,
    cena           NUMBER(10, 2) NOT NULL,
    ilosc          NUMBER(10) NOT NULL
);

ALTER TABLE zamowione_napoje ADD CONSTRAINT zamowione_napoje_pk PRIMARY KEY ( id_napoju_pk );

CREATE TABLE zamowione_potrawy (
    id_potrawy_pk  NUMBER(3) NOT NULL,
    id_potrawy_fk  NUMBER(2) NOT NULL,
    id_zamowienia  NUMBER(2) NOT NULL,
    cena           NUMBER(10, 2) NOT NULL,
    ilosc          NUMBER(10) NOT NULL
);

ALTER TABLE zamowione_potrawy ADD CONSTRAINT zamowione_potrawy_pk PRIMARY KEY ( id_potrawy_pk );

ALTER TABLE kucharz_zamowienia
    ADD CONSTRAINT kucharz_zamowiania_fk FOREIGN KEY ( kucharz_id_kucharza )
        REFERENCES kucharz ( id_kucharza );

ALTER TABLE kucharz_zamowienia
    ADD CONSTRAINT kucharz_zamow_zamowienia_fk FOREIGN KEY ( zamowienia_id_zamowienia )
        REFERENCES zamowienia ( id_zamowienia );

ALTER TABLE rezerwacje
    ADD CONSTRAINT rezerwacje_klient_fk FOREIGN KEY ( id_klienta )
        REFERENCES klient ( id_klienta );

ALTER TABLE rezerwacje
    ADD CONSTRAINT rezerwacje_stoliki_fk FOREIGN KEY ( nr_stolika )
        REFERENCES stoliki ( nr_stolika );

ALTER TABLE zamowienia
    ADD CONSTRAINT zamowienia_kelner_odb FOREIGN KEY ( id_kelnera_odb )
        REFERENCES kelner ( id_kelnera );

ALTER TABLE zamowienia
    ADD CONSTRAINT zamowienia_kelner_real FOREIGN KEY ( id_kelnera_real )
        REFERENCES kelner ( id_kelnera );

ALTER TABLE zamowienia
    ADD CONSTRAINT zamowienia_rezerwacje_fk FOREIGN KEY ( id_rezerwacje )
        REFERENCES rezerwacje ( id_rezerwacje );

ALTER TABLE zamowione_napoje
    ADD CONSTRAINT zamowione_napoje_napoje_fk FOREIGN KEY ( id_napoju_fk )
        REFERENCES napoje ( id_napoju );

ALTER TABLE zamowione_napoje
    ADD CONSTRAINT zamowione_napoje_zamow_fk FOREIGN KEY ( id_zamowienia )
        REFERENCES zamowienia ( id_zamowienia );

ALTER TABLE zamowione_potrawy
    ADD CONSTRAINT zamowione_potrawy_fk FOREIGN KEY ( id_potrawy_fk )
        REFERENCES potrawy ( id_potrawy );

ALTER TABLE zamowione_potrawy
    ADD CONSTRAINT zamowione_potr_zamowienia_fk FOREIGN KEY ( id_zamowienia )
        REFERENCES zamowienia ( id_zamowienia );



-- -------------------------------------------------------------------------------
-- POLECENIA:   5 X INSERT  DO WSZYSTKICH TABEL                                               
-- -------------------------------------------------------------------------------

-- klient
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (1,'Katarzyna','Nowak','97120153445','Sosnowiec','Stawowa','8');
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (2,'Janusz','Kowalski','98072345676','Katowice','Opolska','33');
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (3,'Marek','Jankowski','98082445674','Bytom','3 Maja','13');
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (4,'Dariusz','Szpakowski','95052745677','Warszawa','Krosickiego','12');
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (5,'Daria','Nowak',null,'Wroclaw','Katowicka','45');
INSERT INTO KLIENT (ID_KLIENTA,IMIE,NAZWISKO,PESEL,MIEJSCOWOSC, ULICA, NR_DOMU) 
    VALUES (6,'Artur','Polanski',null,'Opole','1 Maja','13');

--kelner
INSERT INTO KELNER (ID_KELNERA, IMIE, NAZWISKO, PESEL, DATA_URODZENIA) 
    VALUES (1,'Jarosław','Przytula','98120456793',to_date('1998/12/04','RRRR/MM/DD'));
INSERT INTO KELNER (ID_KELNERA, IMIE, NAZWISKO, PESEL, DATA_URODZENIA) 
    VALUES (2,'Miroslaw','Kruszynski','96071356794',to_date('1996/07/13','RRRR/MM/DD'));
INSERT INTO KELNER (ID_KELNERA, IMIE, NAZWISKO, PESEL, DATA_URODZENIA) 
    VALUES (3,'Hieronim','Miczka','73110467692',to_date('1973/11/04','RRRR/MM/DD'));
INSERT INTO KELNER (ID_KELNERA, IMIE,NAZWISKO, PESEL, DATA_URODZENIA)
    VALUES (4,'Magdalena','Ostrowska','99022965480',to_date('1999/02/28','RRRR/MM/DD'));
INSERT INTO KELNER (ID_KELNERA, IMIE,NAZWISKO, PESEL, DATA_URODZENIA)
    VALUES (5,'Daniel','Kleszcz','95123167831',to_date('1995/12/31','RRRR/MM/DD'));

--kucharz
INSERT INTO KUCHARZ (ID_KUCHARZA, IMIE, NAZWISKO, DATA_URODZENIA)
    VALUES (1,'Mateusz','Kowalski',to_date('1973/12/03','RRRR/MM/DD'));
INSERT INTO KUCHARZ (ID_KUCHARZA, IMIE, NAZWISKO, DATA_URODZENIA)
    VALUES (2,'Grzegorz','Dolniak',to_date('1995/04/13','RRRR/MM/DD'));
INSERT INTO KUCHARZ (ID_KUCHARZA, IMIE, NAZWISKO, DATA_URODZENIA)
    VALUES (3,'Mateusz','Socha',to_date('1990/06/30','RRRR/MM/DD'));
INSERT INTO KUCHARZ (ID_KUCHARZA, IMIE, NAZWISKO, DATA_URODZENIA)
    VALUES (4,'Aberald','Giza',to_date('1978/05/23','RRRR/MM/DD'));
INSERT INTO KUCHARZ (ID_KUCHARZA, IMIE, NAZWISKO, DATA_URODZENIA)
    VALUES (5,'Grzegorz','Brzęczyszczykiewicz',to_date('1969/09/02','RRRR/MM/DD'));

--potrawy
INSERT INTO potrawy (id_potrawy, nazwa, cena) 
    VALUES (1,'Grilowany Łosoś, marynowany ze Świeżymi ziolami, serwowany z racuchami dyniowymi i bukietem salat',35);
INSERT INTO potrawy (id_potrawy, nazwa, cena) 
    VALUES (2,'Smażony sandacz na klarowanym maśle, podany z chrupiącymi warzywami',34);
INSERT INTO potrawy (id_potrawy, nazwa, cena) 
    VALUES (3,'Roladka z kurczaka nadziewana kolorowa papryka, rukolo i mozzarella z puree zmiemniaczanym',27);
INSERT INTO potrawy (id_potrawy, nazwa, cena) 
    VALUES (4,'Stek z Polędwicy wolowej z bukietem kolorowych warzyw, z ziemniakami opiekanymi i sosem pieprzowym',69);
INSERT INTO potrawy (id_potrawy, nazwa, cena) 
    VALUES (5,'Czekoladowy fordant z lodami waniliowymi',19);

--napoje
INSERT INTO napoje (id_napoju, nazwa, cena) 
    VALUES (1,'Coca Cola 1l',9);
INSERT INTO napoje (id_napoju, nazwa, cena) 
    VALUES (2,'Sok pomarańczowy 0,25l',4);
INSERT INTO napoje (id_napoju, nazwa, cena) 
    VALUES (3,'Kawa',5);
INSERT INTO napoje (id_napoju, nazwa, cena) 
    VALUES (4,'Piwo 0,5l',6);
INSERT INTO napoje (id_napoju, nazwa, cena) 
    VALUES (5,'Mohito 0,4l',5);

--stoliki
INSERT INTO STOLIKI (NR_STOLIKA, LICZBA_MIEJSC) VALUES (1,'5');
INSERT INTO STOLIKI (NR_STOLIKA, LICZBA_MIEJSC) VALUES (2,'4');
INSERT INTO STOLIKI (NR_STOLIKA, LICZBA_MIEJSC) VALUES (3,'2');
INSERT INTO STOLIKI (NR_STOLIKA, LICZBA_MIEJSC) VALUES (4,'7');
INSERT INTO STOLIKI (NR_STOLIKA, LICZBA_MIEJSC) VALUES (5,'8');

--rezerwacje
INSERT INTO REZERWACJE (ID_REZERWACJE,TERMIN_REZERWACJI,DATA_ZLOZENIA_REZERWACJI,ID_KLIENTA,NR_STOLIKA, DATA_ODWOLANIA)
    VALUES (1,to_date('2019/11/30','RRRR/MM/DD'),to_date('2019/11/20','RRRR/MM/DD'),2,2,null);
INSERT INTO REZERWACJE (ID_REZERWACJE,TERMIN_REZERWACJI,DATA_ZLOZENIA_REZERWACJI,ID_KLIENTA,NR_STOLIKA, DATA_ODWOLANIA)
    VALUES (2,to_date('2019/12/11','RRRR/MM/DD'),to_date('2019/10/15','RRRR/MM/DD'),2,3,to_date('2019/10/29','RRRR/MM/DD'));
INSERT INTO REZERWACJE (ID_REZERWACJE,TERMIN_REZERWACJI,DATA_ZLOZENIA_REZERWACJI,ID_KLIENTA,NR_STOLIKA, DATA_ODWOLANIA)
    VALUES (3,to_date('2019/11/20','RRRR/MM/DD'),to_date('2019/11/15','RRRR/MM/DD'),5,1,null);
INSERT INTO REZERWACJE (ID_REZERWACJE,TERMIN_REZERWACJI,DATA_ZLOZENIA_REZERWACJI,ID_KLIENTA,NR_STOLIKA, DATA_ODWOLANIA)
    VALUES (4,to_date('2019/11/30','RRRR/MM/DD'),to_date('2019/11/15','RRRR/MM/DD'),4,2,null);
INSERT INTO REZERWACJE (ID_REZERWACJE,TERMIN_REZERWACJI,DATA_ZLOZENIA_REZERWACJI,ID_KLIENTA,NR_STOLIKA, DATA_ODWOLANIA)
    VALUES (5,to_date('2020/01/02','RRRR/MM/DD'),to_date('2019/12/15','RRRR/MM/DD'),3,5,null);

--zamowienia
INSERT INTO ZAMOWIENIA (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (1,4,to_date('17:30','HH24:MI'),to_date('18:30','HH24:MI'),1,1);
INSERT INTO ZAMOWIENIA (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (2,5,to_date('14:30','HH24:MI'),to_date('15:30','HH24:MI'),2,2);
INSERT INTO ZAMOWIENIA (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (3,3,to_date('12:20','HH24:MI'),to_date('13:40','HH24:MI'),3,4);
INSERT INTO ZAMOWIENIA (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (4,5,to_date('16:00','HH24:MI'),null,4,1);
INSERT INTO ZAMOWIENIA (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (5,1,to_date('19:10','HH24:MI'),to_date('20:00','HH24:MI'),5,3);



INSERT INTO ZAMOWIONE_POTRAWY (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (1,2,1,2,(SELECT cena FROM potrawy WHERE id_potrawy = 1));
INSERT INTO ZAMOWIONE_POTRAWY (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (2,4,3,2,(SELECT cena FROM potrawy WHERE id_potrawy = 2));
INSERT INTO ZAMOWIONE_POTRAWY (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (3,4,2,1,(SELECT cena FROM potrawy WHERE id_potrawy = 3));
INSERT INTO ZAMOWIONE_POTRAWY (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (4,2,1,3,(SELECT cena FROM potrawy WHERE id_potrawy = 4));
INSERT INTO ZAMOWIONE_POTRAWY (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (5,5,5,3,(SELECT cena FROM potrawy WHERE id_potrawy = 5));

INSERT INTO ZAMOWIONE_NAPOJE (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (1,2,1,1,(SELECT cena FROM napoje WHERE id_napoju = 1));
INSERT INTO ZAMOWIONE_NAPOJE (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (2,4,3,3,(SELECT cena FROM napoje WHERE id_napoju = 2));
INSERT INTO ZAMOWIONE_NAPOJE (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (3,4,2,2,(SELECT cena FROM napoje WHERE id_napoju = 3));
INSERT INTO ZAMOWIONE_NAPOJE (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (4,2,1,1,(SELECT cena FROM napoje WHERE id_napoju = 4));
INSERT INTO ZAMOWIONE_NAPOJE (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (5,5,5,4,(SELECT cena FROM napoje WHERE id_napoju = 5));


INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (2,3);
INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (2,4);
INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (5,3);
INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (1,1);
INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (4,2);
INSERT INTO KUCHARZ_ZAMOWIENIA (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (3,2);



-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X SELECT  
--( PRZYKŁADY ROZBUDOWANYCH POLECEŃ Z JOIN NA MIN. 3 TABELACH, WARUNKAMI, GROUP BY ITP )
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                                   
-- -------------------------------------------------------------------------------

SELECT 
    imie, 
    nazwisko, 
    id_zamowienia, 
    to_char(czas_zlozenia, 'HH24:MI')
FROM klient 
    INNER JOIN rezerwacje 
        ON klient.id_klienta = rezerwacje.id_klienta 
    INNER JOIN zamowienia 
        ON rezerwacje.id_rezerwacje = zamowienia.id_rezerwacje
WHERE
    imie LIKE 'D%'
GROUP BY
    id_zamowienia,
    imie,
    nazwisko,
    czas_zlozenia;



SELECT 
    stoliki.nr_stolika,
    termin_rezerwacji Dzień,
    TO_CHAR(czas_zlozenia,'HH24:MI') Godzina, 
    CONCAT(odb.imie, CONCAT(' ', odb.nazwisko)) "Kelner odbierający", 
    CONCAT(rea.imie, CONCAT(' ', rea.nazwisko)) "Kelner realizujący"
FROM
    stoliki
    INNER JOIN rezerwacje
        ON stoliki.nr_stolika = rezerwacje.nr_stolika
    INNER JOIN zamowienia
        ON rezerwacje.id_rezerwacje = zamowienia.id_rezerwacje
    INNER JOIN kelner odb
        ON zamowienia.id_kelnera_odb = odb.id_kelnera
    INNER JOIN kelner rea
        ON zamowienia.id_kelnera_real = rea.id_kelnera
GROUP BY
	stoliki.nr_stolika,
	rezerwacje.termin_rezerwacji,
	czas_zlozenia,
	odb.imie,
	odb.nazwisko,
	rea.imie,
	rea.nazwisko
ORDER BY 
    termin_rezerwacji,
    czas_zlozenia;



SELECT
    imie,
    nazwisko,
    to_char(termin_rezerwacji,'DD/MM/RRRR'),
    to_char(czas_wydania,'HH24:MI'),
    (zamowione_potrawy.cena*zamowione_potrawy.ilosc + zamowione_napoje.cena*zamowione_napoje.ilosc) "Cena za zamowienie"
FROM
    klient
    INNER JOIN rezerwacje 
        ON klient.id_klienta = rezerwacje.id_klienta 
    INNER JOIN zamowienia 
        ON rezerwacje.id_rezerwacje = zamowienia.id_rezerwacje
    INNER JOIN zamowione_potrawy
        ON zamowienia.id_zamowienia = zamowione_potrawy.id_zamowienia
    INNER JOIN zamowione_napoje
        ON zamowienia.id_zamowienia = zamowione_napoje.id_zamowienia
GROUP BY
    termin_rezerwacji,
    imie,
    nazwisko,
    czas_wydania,
    zamowione_potrawy.cena,
    zamowione_potrawy.ilosc,
    zamowione_napoje.cena,
    zamowione_napoje.ilosc;

-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X UPDATE     (POLECENIA POWINNY WYKORZYSTYWAĆ PODZAPYTANIA)     
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                               
-- -------------------------------------------------------------------------------

UPDATE kelner
SET imie = (SELECT imie FROM kelner WHERE id_kelnera = 3)
WHERE id_kelnera = 4;

UPDATE klient
SET nazwisko = 'Zalewski'
WHERE id_klienta = (SELECT id_klienta FROM rezerwacje WHERE id_rezerwacje = 1);

UPDATE rezerwacje
SET termin_rezerwacji = to_date('2019/12/03','RRRR/MM/DD')
WHERE id_klienta = (SELECT id_klienta FROM klient WHERE nazwisko = 'Zalewski');
-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X DELETE     (TEŻ Z PODZAPYTANIAMI)              
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                        
-- -------------------------------------------------------------------------------



DELETE FROM zamowione_potrawy
WHERE id_potrawy_fk =
    (SELECT 
        id_potrawy
    FROM 
        potrawy
    WHERE
        cena = 69);

DELETE FROM zamowione_napoje
WHERE id_napoju_fk =
    (SELECT 
        id_napoju
    FROM 
        napoje
    WHERE
        nazwa = 'Piwo 0,5l');


DELETE FROM kucharz_zamowienia
WHERE zamowienia_id_zamowienia =
    (SELECT 
        id_zamowienia 
    FROM 
        zamowienia 
        INNER JOIN kelner 
            ON zamowienia.id_kelnera_real = kelner.id_kelnera 
    WHERE kelner.imie = 'Miroslaw');

-- -------------------------------------------------------------------------------
-- USUWANIE STRUKTURY BAZY DANYCH 
-- NALEŻY USUNAĆ TABELE, A NIE BAZĘ                                           
-- -------------------------------------------------------------------------------


DROP TABLE ZAMOWIONE_NAPOJE;
DROP TABLE KUCHARZ_ZAMOWIENIA;
DROP TABLE ZAMOWIONE_POTRAWY;
DROP TABLE ZAMOWIENIA;
DROP TABLE REZERWACJE;
DROP TABLE KUCHARZ;
DROP TABLE NAPOJE;
DROP TABLE POTRAWY;
DROP TABLE STOLIKI;
DROP TABLE KELNER;
DROP TABLE KLIENT;