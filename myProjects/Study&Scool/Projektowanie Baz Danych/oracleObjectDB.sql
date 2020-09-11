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
-- *   Temat projektu: Implementacja ODB na SZBD ORACLE                                                          
-- * 																		     
-- *******************************************************************************

-- PROSZĘ NIE UŻYWAĆ W SKRYPTACH ALIASÓW DLA SCHEMATÓW BAZ


-- -------------------------------------------------------------------------------
-- TWORZENIE STRUKTURY BAZY DANYCH                                          
-- -------------------------------------------------------------------------------

CREATE TYPE potrawy_objtype AS OBJECT(
    id_potrawy number(3),
    nazwa nvarchar2(100),
    cena number(5,2)
);
/

CREATE TYPE napoje_objtype AS OBJECT(
    id_napoju number(3),
    nazwa nvarchar2(100),
    cena number(5,2)
);
/

CREATE TABLE potrawy_objtab OF potrawy_objtype
(PRIMARY KEY(id_potrawy));

CREATE TABLE napoje_objtab OF napoje_objtype
(PRIMARY KEY(id_napoju));

CREATE TYPE stoliki_objtype AS OBJECT(
    nr_stolika number(2),
    liczba_miejsc nvarchar2(2)
);
/

CREATE TABLE stoliki_objtab OF stoliki_objtype
(PRIMARY KEY(nr_stolika));

CREATE TYPE adres_objtype AS OBJECT(
    miejscowosc nvarchar2(50),
    ulica nvarchar2(50),
    nr_domu nvarchar2(4),
    nr_mieszkania nvarchar2(2),
    kod_pocztowy nvarchar2(6)
);
/

CREATE TYPE adres_objtab AS TABLE OF adres_objtype;
/

CREATE TYPE osoba_objtype AS OBJECT(
    id_osoby number(3),
    imie nvarchar2(50),
    nazwisko nvarchar2(70),
    data_urodzenia date,
    adres adres_objtab
)NOT FINAL;
/

CREATE TYPE klient_objtype UNDER osoba_objtype();
/

CREATE TYPE kelner_objtype UNDER osoba_objtype();
/

CREATE TYPE kucharz_objtype UNDER osoba_objtype();
/

CREATE TABLE klient_objtab OF klient_objtype NESTED TABLE adres STORE AS adr_klient_tab;

CREATE TABLE kelner_objtab OF kelner_objtype NESTED TABLE adres STORE AS adr_kelner_tab;

CREATE TABLE kucharz_objtab OF kucharz_objtype NESTED TABLE adres STORE AS adr_kucharz_tab;


CREATE TYPE zamowione_potrawy_objtype AS OBJECT(
    id_porawy number(3),
    cena number(5,2),
    potrawy_ref REF potrawy_objtype
);
/


CREATE TYPE zamowione_napoje_objtype AS OBJECT(
    id_napoju number(3),
    cena number(5,2),
    napoje_ref REF napoje_objtype
);
/

CREATE TYPE zamowione_potrawy_objtab AS TABLE OF zamowione_potrawy_objtype;
/

CREATE TYPE zamowione_napoje_objtab AS TABLE OF zamowione_napoje_objtype;
/

CREATE TYPE kucharz_zamowienia_objtype AS OBJECT(
    id_zamowienia number(2),
    kucharz_ref REF kucharz_objtype
);
/

CREATE TYPE kucharz_zamowienia_objtab AS TABLE OF kucharz_zamowienia_objtype;
/

CREATE TYPE zamowienia_objtype AS OBJECT(
    id_zamowienia number(3),
    czas_zlozenia date,
    czas_wydania date,
    potrawy zamowione_potrawy_objtab,
    napoje zamowione_napoje_objtab,
    kucharz kucharz_zamowienia_objtab,
    kelner_odb_ref ref kelner_objtype,
    kelner_real_ref ref kelner_objtype
);
/

CREATE TYPE zamowienia_objtab AS TABLE OF zamowienia_objtype;
/

CREATE TYPE rezerwacje_objtype AS OBJECT(
    id_rezerwacje number(2),
    data_zlozenia_rezerwacji date,
    termin_rezerwacji date,
    data_odwolania date,
    stolik_ref ref stoliki_objtype,
    klient_ref ref klient_objtype,
    zamowienia zamowienia_objtab
);
/

CREATE TABLE rezerwacje_objtab OF rezerwacje_objtype 
NESTED TABLE zamowienia STORE AS zamowienia_tab
    (NESTED TABLE potrawy STORE AS potrawy_tab
    NESTED TABLE napoje STORE AS napoje_tab
    NESTED TABLE kucharz STORE AS kucharz_tab);


-- -------------------------------------------------------------------------------
-- POLECENIA:   5 X INSERT  DO WSZYSTKICH TABEL                                               
-- -------------------------------------------------------------------------------

-- klient
INSERT INTO klient_objtab
    VALUES (1,'Katarzyna','Nowak',to_date('1969/08/01','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Sosnowiec','Stawowa','8','12','33-444'
        )
    ));
INSERT INTO klient_objtab
    VALUES (2,'Janusz','Kowalski',to_date('1997/12/05','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Katowice','Opolska','33','3','43-564'
        )
    )
    );
INSERT INTO klient_objtab
    VALUES (3,'Marek','Jankowski',to_date('1987/11/26','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Bytom','3 Maja','13','45','67-345'
        )
    )
    );
INSERT INTO klient_objtab
    VALUES (4,'Dariusz','Szpakowski',to_date('1975/09/03','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Warszawa','Krosickiego','12','54','56-435'
        )
    )
    );
INSERT INTO klient_objtab
    VALUES (5,'Daria','Nowak',to_date('2000/05/06','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Wroclaw','Katowicka','45','76','67-324'
        )
    )
    );
INSERT INTO klient_objtab
    VALUES (6,'Artur','Polanski',to_date('1960/12/18','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Opole','1 Maja','13',null,'65-412'
        )
    )
    );

--kelner
INSERT INTO kelner_objtab
    VALUES (1,'Jarosław','Przytula',to_date('1998/12/04','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Jelenia Góra','Turczyna','4',null,'43-546'
        )
    )
    );
INSERT INTO kelner_objtab
    VALUES (2,'Miroslaw','Kruszynski',to_date('1996/07/13','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Gliwice','11 Listopada','5','45','65-465'
        )
    )
    );
INSERT INTO kelner_objtab
    VALUES (3,'Hieronim','Miczka',to_date('1973/11/04','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Elbląg','Morska','45','2','65-475'
        )
    )
    );
INSERT INTO kelner_objtab
    VALUES (4,'Magdalena','Ostrowska',to_date('1999/02/28','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Opole','Niemodlińska','65','7','78-327'
        )
    )
    );
INSERT INTO kelner_objtab
    VALUES (5,'Daniel','Kleszcz',to_date('1995/12/31','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Wołczyn','Opolska','56','6','46-250'
        )
    )
    );

--kucharz
INSERT INTO kucharz_objtab
    VALUES (1,'Mateusz','Kowalski',to_date('1973/12/03','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Krapkowice','Rycerska','6','65','76-375'
        )
    )
    );
INSERT INTO kucharz_objtab
    VALUES (2,'Grzegorz','Dolniak',to_date('1995/04/13','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Łódź','Konopnickiej','56','7','65-235'
        )
    )
    );
INSERT INTO kucharz_objtab
    VALUES (3,'Mateusz','Socha',to_date('1990/06/30','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Wieluń','Matejki','6','45','76-475'
        )
    )
    );
INSERT INTO kucharz_objtab
    VALUES (4,'Aberald','Giza',to_date('1978/05/23','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Tarnowkie Góry','Jana Pawła II','76','6','64-454'
        )
    )
    );
INSERT INTO kucharz_objtab
    VALUES (5,'Grzegorz','Brzęczyszczykiewicz',to_date('1969/09/02','RRRR/MM/DD'),
    adres_objtab(
        adres_objtype(
            'Zator','Grzybowa','56','4','76-256'
        )
    )
    );

--stoliki
INSERT INTO stoliki_objtab (NR_STOLIKA, LICZBA_MIEJSC) VALUES (1,'5');
INSERT INTO stoliki_objtab (NR_STOLIKA, LICZBA_MIEJSC) VALUES (2,'4');
INSERT INTO stoliki_objtab (NR_STOLIKA, LICZBA_MIEJSC) VALUES (3,'2');
INSERT INTO stoliki_objtab (NR_STOLIKA, LICZBA_MIEJSC) VALUES (4,'7');
INSERT INTO stoliki_objtab (NR_STOLIKA, LICZBA_MIEJSC) VALUES (5,'8');

--potrawy
INSERT INTO potrawy_objtab (id_potrawy, nazwa, cena) 
    VALUES (1,'Grilowany Łosoś, marynowany ze Świeżymi ziolami, serwowany z racuchami dyniowymi i bukietem salat',35);
INSERT INTO potrawy_objtab (id_potrawy, nazwa, cena) 
    VALUES (2,'Smażony sandacz na klarowanym maśle, podany z chrupiącymi warzywami',34);
INSERT INTO potrawy_objtab (id_potrawy, nazwa, cena) 
    VALUES (3,'Roladka z kurczaka nadziewana kolorowa papryka, rukolo i mozzarella z puree zmiemniaczanym',27);
INSERT INTO potrawy_objtab (id_potrawy, nazwa, cena) 
    VALUES (4,'Stek z Polędwicy wolowej z bukietem kolorowych warzyw, z ziemniakami opiekanymi i sosem pieprzowym',69);
INSERT INTO potrawy_objtab (id_potrawy, nazwa, cena) 
    VALUES (5,'Czekoladowy fordant z lodami waniliowymi',19);

--napoje
INSERT INTO napoje_objtab (id_napoju, nazwa, cena) 
    VALUES (1,'Coca Cola 1l',9);
INSERT INTO napoje_objtab (id_napoju, nazwa, cena) 
    VALUES (2,'Sok pomarańczowy 0,25l',4);
INSERT INTO napoje_objtab (id_napoju, nazwa, cena) 
    VALUES (3,'Kawa',5);
INSERT INTO napoje_objtab (id_napoju, nazwa, cena) 
    VALUES (4,'Piwo 0,5l',6);
INSERT INTO napoje_objtab (id_napoju, nazwa, cena) 
    VALUES (5,'Mohito 0,4l',5);


--rezerwacje
INSERT INTO rezerwacje_objtab
    VALUES (1,to_date('2019/11/30','RRRR/MM/DD'),to_date('2019/11/20','RRRR/MM/DD'),null,
        (SELECT REF(t) FROM stoliki_objtab t WHERE nr_stolika = 2),
        (SELECT REF(t) FROM klient_objtab t WHERE id_osoby = 2),
        zamowienia_objtab(
            zamowienia_objtype(
                1, to_date('19:10','HH24:MI'),to_date('20:00','HH24:MI'),
                zamowione_potrawy_objtab(
                    zamowione_potrawy_objtype(
                        1,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 2),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 2)
                    ),
                    zamowione_potrawy_objtype(
                        2,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 3),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 3)
                    )
                ),
                zamowione_napoje_objtab(
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 2),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 2)
                    ),
                    zamowione_napoje_objtype(
                        2,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 4),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 4)
                    )
                ),
                kucharz_zamowienia_objtab(
                    kucharz_zamowienia_objtype(
                        1, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 1)
                    )
                ),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 1),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 1)
            )
        )
    );
INSERT INTO rezerwacje_objtab
    VALUES (2,to_date('2019/12/11','RRRR/MM/DD'),to_date('2019/10/15','RRRR/MM/DD'),to_date('2019/10/29','RRRR/MM/DD'),
        (SELECT REF(t) FROM stoliki_objtab t WHERE nr_stolika = 3),
        (SELECT REF(t) FROM klient_objtab t WHERE id_osoby = 2),
        null
    );
INSERT INTO rezerwacje_objtab
    VALUES (3,to_date('2019/11/20','RRRR/MM/DD'),to_date('2019/11/15','RRRR/MM/DD'),null,
        (SELECT REF(t) FROM stoliki_objtab t WHERE nr_stolika = 1),
        (SELECT REF(t) FROM klient_objtab t WHERE id_osoby = 5),
        zamowienia_objtab(
            zamowienia_objtype(
                1, to_date('12:20','HH24:MI'),to_date('13:40','HH24:MI'),
                zamowione_potrawy_objtab(
                    zamowione_potrawy_objtype(
                        1,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 4),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 4)
                    )
                ),
                zamowione_napoje_objtab(
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 5),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 5)
                    )
                ),
                kucharz_zamowienia_objtab(
                    kucharz_zamowienia_objtype(
                        1, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 4)
                    )
                ),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 3),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 5)
            )
        )
    );
INSERT INTO rezerwacje_objtab
    VALUES (4,to_date('2019/11/30','RRRR/MM/DD'),to_date('2019/11/15','RRRR/MM/DD'),null,
        (SELECT REF(t) FROM stoliki_objtab t WHERE nr_stolika = 2),
        (SELECT REF(t) FROM klient_objtab t WHERE id_osoby = 4),
        zamowienia_objtab(
            zamowienia_objtype(
                1, to_date('17:30','HH24:MI'),to_date('18:30','HH24:MI'),
                zamowione_potrawy_objtab(
                    zamowione_potrawy_objtype(
                        1,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 3),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 3)
                    )
                ),
                zamowione_napoje_objtab(
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 1),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 1)
                    )
                ),
                kucharz_zamowienia_objtab(
                    kucharz_zamowienia_objtype(
                        1, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 3)
                    ),
                    kucharz_zamowienia_objtype(
                        2, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 2)
                    )
                ),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 5),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 4)
            )
        )
    );
INSERT INTO rezerwacje_objtab
    VALUES (5,to_date('2020/01/02','RRRR/MM/DD'),to_date('2019/12/15','RRRR/MM/DD'),null,
        (SELECT REF(t) FROM stoliki_objtab t WHERE nr_stolika = 5),
        (SELECT REF(t) FROM klient_objtab t WHERE id_osoby = 2),
        zamowienia_objtab(
            zamowienia_objtype(
                1, to_date('14:30','HH24:MI'),to_date('15:30','HH24:MI'),
                zamowione_potrawy_objtab(
                    zamowione_potrawy_objtype(
                        1,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 4),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 4)
                    )
                ),
                zamowione_napoje_objtab(
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 3),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 3)
                    )
                ),
                kucharz_zamowienia_objtab(
                    kucharz_zamowienia_objtype(
                        1, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 5)
                    ),
                    kucharz_zamowienia_objtype(
                        2, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 1)
                    )
                ),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 3),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 2)
            ),
            zamowienia_objtype(
                2, to_date('16:00','HH24:MI'),null,
                zamowione_potrawy_objtab(
                    zamowione_potrawy_objtype(
                        1,
                        (SELECT cena FROM potrawy_objtab WHERE id_potrawy = 5),
                        (SELECT ref(t) FROM potrawy_objtab t WHERE id_potrawy = 5)
                    )
                ),
                zamowione_napoje_objtab(
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 5),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 5)
                    ),
                    zamowione_napoje_objtype(
                        1,
                        (SELECT cena FROM napoje_objtab WHERE id_napoju = 3),
                        (SELECT ref(t) FROM napoje_objtab t WHERE id_napoju = 3)
                    )
                ),
                kucharz_zamowienia_objtab(
                    kucharz_zamowienia_objtype(
                        1, (SELECT ref(t) from kucharz_objtab t WHERE id_osoby = 3)
                    )
                ),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 4),
                (SELECT ref(t) FROM kelner_objtab t WHERE id_osoby = 1)
            )
        )
    );


-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X SELECT  
--( PRZYKŁADY ROZBUDOWANYCH POLECEŃ Z JOIN NA MIN. 3 TABELACH, WARUNKAMI, GROUP BY ITP )
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                                   
-- -------------------------------------------------------------------------------

SELECT deref(t.klient_ref).imie "Imie", deref(t.klient_ref).nazwisko "Nazwisko", deref(ttt.potrawy_ref).nazwa "Nazwa", ttt.cena "Cena"
FROM rezerwacje_objtab t, table(t.zamowienia) tt, table(tt.potrawy) ttt
WHERE t.id_rezerwacje = 5
GROUP BY deref(t.klient_ref).imie, deref(t.klient_ref).nazwisko, ttt.cena, deref(ttt.potrawy_ref).nazwa
ORDER BY "Nazwa";

SELECT imie, nazwisko, miejscowosc, ulica, kod_pocztowy
FROM klient_objtab t, table(t.adres)
WHERE imie LIKE 'D%'
GROUP BY miejscowosc, ulica, kod_pocztowy, nazwisko, imie
ORDER BY nazwisko;

SELECT (deref(klient_ref).imie || ' ' || deref(klient_ref).nazwisko) "Klient", deref(stolik_ref).nr_stolika "Nr stolika", (deref(kelner_odb_ref).imie || ' ' || deref(kelner_odb_ref).nazwisko) "Kelner odbierający", (deref(kelner_real_ref).imie || ' ' || deref(kelner_real_ref).nazwisko) "Kelner realizujący", to_char(czas_zlozenia, 'HH24:MI') "Czas zlożenia", to_char(czas_wydania, 'HH24:MI') "Czas wydania"
FROM rezerwacje_objtab rez, table(rez.zamowienia) zam
WHERE deref(klient_ref).imie = 'Janusz'
GROUP BY deref(klient_ref).imie, deref(klient_ref).nazwisko, deref(kelner_odb_ref).imie, deref(kelner_odb_ref).nazwisko, deref(stolik_ref).nr_stolika, deref(kelner_real_ref).imie, deref(kelner_real_ref).nazwisko, czas_zlozenia, czas_wydania, termin_rezerwacji
ORDER BY termin_rezerwacji DESC;

-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X UPDATE     (POLECENIA POWINNY WYKORZYSTYWAĆ PODZAPYTANIA)     
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                               
-- -------------------------------------------------------------------------------

UPDATE TABLE (
    SELECT adres
    FROM klient_objtab
    WHERE id_osoby = 4
)
SET miejscowosc = 'Rzeszów'
WHERE miejscowosc LIKE 'W%';

UPDATE klient_objtab
SET imie = 'Jarek'
WHERE id_osoby = (
    SELECT deref(klient_ref).id_osoby
    FROM rezerwacje_objtab
    WHERE id_rezerwacje = 4
);

UPDATE TABLE (
    SELECT napoje
    FROM rezerwacje_objtab rez, table(rez.zamowienia)
    WHERE id_rezerwacje = 3
)
SET cena = '3'
WHERE id_napoju = 1;

-- -------------------------------------------------------------------------------
-- POLECENIA:   3 X DELETE     (TEŻ Z PODZAPYTANIAMI)              
-- POZIOM ZAAWANSOWANIA MA WPŁYW NA OCENĘ                                        
-- -------------------------------------------------------------------------------

DELETE FROM TABLE(
    SELECT zamowienia
    FROM rezerwacje_objtab
    WHERE id_rezerwacje = 5
)
WHERE id_zamowienia = 2;

DELETE FROM TABLE (
    SELECT napoje
    FROM rezerwacje_objtab rez, table(rez.zamowienia)
    WHERE id_rezerwacje = 1
)
WHERE id_napoju = 2;

DELETE FROM klient_objtab
WHERE id_osoby = (
    SELECT deref(klient_ref).id_osoby
    FROM rezerwacje_objtab
    WHERE id_rezerwacje = 2
);

-- -------------------------------------------------------------------------------
-- USUWANIE STRUKTURY BAZY DANYCH 
-- NALEŻY USUNAĆ TABELE, A NIE BAZĘ                                           
-- -------------------------------------------------------------------------------

DROP TABLE rezerwacje_objtab;

DROP TYPE rezerwacje_objtype;

DROP TYPE zamowienia_objtab;

DROP TYPE zamowienia_objtype;

DROP TYPE kucharz_zamowienia_objtab;

DROP TYPE kucharz_zamowienia_objtype;

DROP TYPE zamowione_potrawy_objtab;

DROP TYPE zamowione_napoje_objtab;

DROP TABLE klient_objtab;

DROP TABLE kelner_objtab;

DROP TABLE kucharz_objtab;

DROP TYPE klient_objtype;

DROP TYPE kelner_objtype;

DROP TYPE kucharz_objtype;

DROP TYPE osoba_objtype;

DROP TYPE adres_objtab;

DROP TYPE adres_objtype;

DROP TABLE stoliki_objtab;

DROP TYPE stoliki_objtype;

DROP TABLE potrawy_objtab;

DROP TABLE napoje_objtab;

DROP TYPE zamowione_potrawy_objtype;

DROP TYPE zamowione_napoje_objtype;

DROP TYPE potrawy_objtype;

DROP TYPE napoje_objtype;