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
    id_kelnera      SMALLINT NOT NULL,
    imie            NVARCHAR(50) NOT NULL,
    nazwisko        NVARCHAR(70) NOT NULL,
    pesel           CHAR(11) NOT NULL,
    data_urodzenia  DATETIME
);

ALTER TABLE kelner ADD CONSTRAINT kelner_pk PRIMARY KEY ( id_kelnera );

CREATE TABLE klient (
    id_klienta   SMALLINT NOT NULL,
    imie         NVARCHAR(50) NOT NULL,
    nazwisko     NVARCHAR(70) NOT NULL,
    pesel        CHAR(11),
    miejscowosc  NVARCHAR(50) NOT NULL,
    ulica        NVARCHAR(20) NOT NULL,
    nr_domu      NVARCHAR(3) NOT NULL
);

ALTER TABLE klient ADD CONSTRAINT klient_pk PRIMARY KEY ( id_klienta );

CREATE TABLE kucharz (
    id_kucharza     SMALLINT NOT NULL,
    imie            NVARCHAR(50) NOT NULL,
    nazwisko        NVARCHAR(50) NOT NULL,
    data_urodzenia  DATETIME
);

ALTER TABLE kucharz ADD CONSTRAINT kucharz_pk PRIMARY KEY ( id_kucharza );

CREATE TABLE kucharz_zamowienia (
    zamowienia_id_zamowienia  SMALLINT NOT NULL,
    kucharz_id_kucharza       SMALLINT NOT NULL
);

ALTER TABLE kucharz_zamowienia ADD CONSTRAINT kucharz_zamowienie_pk PRIMARY KEY ( zamowienia_id_zamowienia,
                                                                                  kucharz_id_kucharza );

CREATE TABLE napoje (
    id_napoju  SMALLINT NOT NULL,
    nazwa      NVARCHAR(100) NOT NULL,
    cena       DECIMAL(5, 2) NOT NULL
);

ALTER TABLE napoje ADD CONSTRAINT napoje_pk PRIMARY KEY ( id_napoju );

CREATE TABLE potrawy (
    id_potrawy  SMALLINT NOT NULL,
    nazwa       NVARCHAR(100) NOT NULL,
    cena        DECIMAL(5, 2) NOT NULL
);

ALTER TABLE potrawy ADD CONSTRAINT potrawy_pk PRIMARY KEY ( id_potrawy );

CREATE TABLE rezerwacje (
    id_rezerwacje             SMALLINT NOT NULL,
    data_zlozenia_rezerwacji  DATETIME NOT NULL,
    termin_rezerwacji         DATETIME NOT NULL,
    id_klienta                SMALLINT NOT NULL,
    nr_stolika                SMALLINT NOT NULL,
    data_odwolania            DATETIME
);

ALTER TABLE rezerwacje ADD CONSTRAINT rezerwacje_pk PRIMARY KEY ( id_rezerwacje );


CREATE TABLE stoliki (
    nr_stolika     SMALLINT NOT NULL,
    liczba_miejsc  CHAR(2) NOT NULL
);

ALTER TABLE stoliki ADD CONSTRAINT stoliki_pk PRIMARY KEY ( nr_stolika );

CREATE TABLE zamowienia (
    id_zamowienia    SMALLINT NOT NULL,
    id_rezerwacje    SMALLINT NOT NULL,
    czas_zlozenia    DATETIME NOT NULL,
    czas_wydania     DATETIME,
    id_kelnera_odb   SMALLINT NOT NULL,
    id_kelnera_real  SMALLINT NOT NULL
);

ALTER TABLE zamowienia ADD CONSTRAINT zamowienia_pk PRIMARY KEY ( id_zamowienia );

CREATE TABLE zamowione_napoje (
    id_napoju_pk   SMALLINT NOT NULL,
    id_zamowienia  SMALLINT NOT NULL,
    id_napoju_fk   SMALLINT NOT NULL,
    cena           DECIMAL(10, 2) NOT NULL,
    ilosc          BIGINT NOT NULL
);

ALTER TABLE zamowione_napoje ADD CONSTRAINT zamowione_napoje_pk PRIMARY KEY ( id_napoju_pk );

CREATE TABLE zamowione_potrawy (
    id_potrawy_pk  SMALLINT NOT NULL,
    id_potrawy_fk  SMALLINT NOT NULL,
    id_zamowienia  SMALLINT NOT NULL,
    cena           DECIMAL(10, 2) NOT NULL,
    ilosc          BIGINT NOT NULL
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
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu) 
    VALUES (1,'Katarzyna','Nowak','97120153445','Sosnowiec','Stawowa','8');
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu)
    VALUES (2,'Janusz','Kowalski','98072345676','Katowice','Opolska','33');
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu) 
    VALUES (3,'Marek','Jankowski','98082445674','Bytom','3 Maja','13');
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu) 
    VALUES (4,'Dariusz','Szpakowski','95052745677','Warszawa','Krosickiego','12');
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu)
    VALUES (5,'Daria','Nowak',null,'Wroclaw','Katowicka','45');
INSERT INTO klient (id_klienta,imie,nazwisko,pesel,miejscowosc, ulica, nr_domu) 
    VALUES (6,'Artur','Polanski',null,'Opole','1 Maja','13');

--kelner
INSERT INTO kelner (id_kelnera, imie, nazwisko, pesel, data_urodzenia) 
    VALUES (1,'Jarosław','Przytula','98120456793',convert(DATETIME, '04/12/1998',103));
INSERT INTO kelner (id_kelnera, imie, nazwisko, pesel, data_urodzenia) 
    VALUES (2,'Miroslaw','Kruszynski','96071356794',convert(DATETIME, '13/07/1996',103));
INSERT INTO kelner (id_kelnera, imie, nazwisko, pesel, data_urodzenia) 
    VALUES (3,'Hieronim','Miczka','73110467692',convert(DATETIME, '04/11/1973',103));
INSERT INTO kelner (id_kelnera, imie, nazwisko, pesel, data_urodzenia) 
    VALUES (4,'Magdalena','Ostrowska','99022965480',convert(DATETIME, '28/02/1999',103));
INSERT INTO kelner (id_kelnera, imie, nazwisko, pesel, data_urodzenia) 
    VALUES (5,'Daniel','Kleszcz','95123167831',convert(DATETIME, '31/12/1995',103));

--kucharz
INSERT INTO kucharz (id_kucharza, imie, nazwisko, data_urodzenia)
    VALUES (1,'Mateusz','Kowalski',convert(DATETIME, '03/12/1973',103));
INSERT INTO kucharz (id_kucharza, imie, nazwisko, data_urodzenia)
    VALUES (2,'Grzegorz','Dolniak',convert(DATETIME, '13/04/1995',103));
INSERT INTO kucharz (id_kucharza, imie, nazwisko, data_urodzenia)
    VALUES (3,'Mateusz','Socha',convert(DATETIME, '30/06/1990',103));
INSERT INTO kucharz (id_kucharza, imie, nazwisko, data_urodzenia)
    VALUES (4,'Aberald','Giza',convert(DATETIME, '23/05/1978',103));
INSERT INTO kucharz (id_kucharza, imie, nazwisko, data_urodzenia)
    VALUES (5,'Grzegorz','Brzęczyszczykiewicz',convert(DATETIME, '02/09/1969',103));

--stoliki
INSERT INTO stoliki (nr_stolika, liczba_miejsc) VALUES (1,'5');
INSERT INTO stoliki (nr_stolika, liczba_miejsc) VALUES (2,'4');
INSERT INTO stoliki (nr_stolika, liczba_miejsc) VALUES (3,'2');
INSERT INTO stoliki (nr_stolika, liczba_miejsc) VALUES (4,'7');
INSERT INTO stoliki (nr_stolika, liczba_miejsc) VALUES (5,'8');

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

--rezerwacje
INSERT INTO rezerwacje (id_rezerwacje,termin_rezerwacji,data_zlozenia_rezerwacji,id_klienta,nr_stolika, data_odwolania)
    VALUES (1,convert(DATETIME, '30/11/2019',103),convert(DATETIME, '20/11/2019',103),2,2,null);
INSERT INTO rezerwacje (id_rezerwacje,termin_rezerwacji,data_zlozenia_rezerwacji,id_klienta,nr_stolika, data_odwolania)
    VALUES (2,convert(DATETIME, '11/12/2019',103),convert(DATETIME, '15/10/2019',103),2,3,convert(DATETIME, '29/10/2019',103));
INSERT INTO rezerwacje (id_rezerwacje,termin_rezerwacji,data_zlozenia_rezerwacji,id_klienta,nr_stolika, data_odwolania)
    VALUES (3,convert(DATETIME, '20/11/2019',103),convert(DATETIME, '15/11/2019',103),5,1,null);
INSERT INTO rezerwacje (id_rezerwacje,termin_rezerwacji,data_zlozenia_rezerwacji,id_klienta,nr_stolika, data_odwolania)
    VALUES (4,convert(DATETIME, '30/11/2019',103),convert(DATETIME, '15/11/2019',103),4,2,null);
INSERT INTO rezerwacje (id_rezerwacje,termin_rezerwacji,data_zlozenia_rezerwacji,id_klienta,nr_stolika, data_odwolania)
    VALUES (5,convert(DATETIME, '02/01/2020',103),convert(DATETIME, '15/12/2019',103),3,5,null);

--zamowienia
INSERT INTO zamowienia (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (1,4,convert(DATETIME, '17:30',108),convert(DATETIME, '18:30',108),1,1);
INSERT INTO zamowienia (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (2,5,convert(DATETIME, '14:30',108),convert(DATETIME, '15:30',108),2,2);
INSERT INTO zamowienia (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (3,3,convert(DATETIME, '12:20',108),convert(DATETIME, '13:40',108),3,4);
INSERT INTO zamowienia (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (4,5,convert(DATETIME, '16:00',108),null,4,1);
INSERT INTO zamowienia (id_zamowienia, id_rezerwacje, czas_zlozenia, czas_wydania, id_kelnera_odb, id_kelnera_real)
    VALUES (5,1,convert(DATETIME, '19:10',108),convert(DATETIME, '20:00',108),5,3);



INSERT INTO zamowione_potrawy (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (1,2,1,2,(SELECT cena FROM potrawy WHERE id_potrawy = 1));
INSERT INTO zamowione_potrawy (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (2,4,3,2,(SELECT cena FROM potrawy WHERE id_potrawy = 2));
INSERT INTO zamowione_potrawy (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (3,4,2,1,(SELECT cena FROM potrawy WHERE id_potrawy = 3));
INSERT INTO zamowione_potrawy (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (4,2,1,3,(SELECT cena FROM potrawy WHERE id_potrawy = 4));
INSERT INTO zamowione_potrawy (id_potrawy_pk, id_potrawy_fk, id_zamowienia, ilosc, cena) 
    VALUES (5,5,5,3,(SELECT cena FROM potrawy WHERE id_potrawy = 5));

INSERT INTO zamowione_napoje (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (1,2,1,1,(SELECT cena FROM napoje WHERE id_napoju = 1));
INSERT INTO zamowione_napoje (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (2,4,3,3,(SELECT cena FROM napoje WHERE id_napoju = 2));
INSERT INTO zamowione_napoje (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (3,4,2,2,(SELECT cena FROM napoje WHERE id_napoju = 3));
INSERT INTO zamowione_napoje (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (4,2,1,1,(SELECT cena FROM napoje WHERE id_napoju = 4));
INSERT INTO zamowione_napoje (id_napoju_pk, id_napoju_fk, id_zamowienia, ilosc, cena) 
    VALUES (5,5,5,4,(SELECT cena FROM napoje WHERE id_napoju = 5));


INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (2,3);
INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (2,4);
INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (5,3);
INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (1,1);
INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
    VALUES (4,2);
INSERT INTO kucharz_zamowienia (zamowienia_id_zamowienia, kucharz_id_kucharza)
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
    CONVERT(CHAR(5),czas_zlozenia, 108)
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
    CONVERT(CHAR(5),czas_zlozenia, 108) Godzina, 
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
    CONVERT(VARCHAR,termin_rezerwacji, 103),
    CONVERT(CHAR(5),czas_wydania, 108) Godzina,
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
SET termin_rezerwacji = convert(DATETIME, '03/12/2019',103)
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


DROP TABLE zamowione_napoje;
DROP TABLE kucharz_zamowienia;
DROP TABLE zamowione_potrawy;
DROP TABLE zamowienia;
DROP TABLE rezerwacje;
DROP TABLE kucharz;
DROP TABLE napoje;
DROP TABLE potrawy;
DROP TABLE stoliki;
DROP TABLE kelner;
DROP TABLE klient;