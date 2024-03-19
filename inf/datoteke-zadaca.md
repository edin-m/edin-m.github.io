# Zadaca 3

Napisati program koji iz ulazne datoteke `input.txt` čita 2D niz brojeva. Prva dva broja u datoteci predstavljaju broj redova i broj kolona, a nakon toga slijede elementi 2D niza.

Npr. ulazna datoteka: `input.txt`:
    
    3 3
    4 3 2
    1 8 9
    7 6 5
    
Nakon učitavanja 2D niza brojeva, program treba za svaki broj sračunati prosječnu vrijednost okoline tog broja. Okolina broja predstavljaju svi brojevi oko tog broja.

Npr. 
Okolina broja `4` su brojevi `3` `8` i `1`
Okolina broja `9` su brojevi `2` `3` `8` `6` i `5`
Okolina broja `8` su brojevi `4` `3` `2` `1` `9` `7` `6` i `5`

Sračunatu prosječnu vrijednost okoline nekog broja program spašava na poziciju na kojoj se taj broj nalazi i spašava u izlaznu datoteku `output.txt`. 2D niz float brojeva se može deklarisati sa `float niz[broj][broj];`. Tako će izlaz prethodnog primjera biti:

`output.txt`

    3 3
    4 4.8 6.66667 
    5.6 4.625 4.8 
    5 6 7.66667 

Primjer:

Npr ako je ulazna datoteka `input.txt` ovakva:

    6 6 
    9 9 3 6 1 4 
    1 5 1 4 1 2 
    6 8 7 6 6 3 
    7 9 0 5 5 1 
    8 7 9 3 8 6 
    8 7 2 5 8 6
    
Datoteka `output.txt` treba izlgedati ovako:

    6 6
    5 3.8 5 2 3.4 1.33333 
    1.68517e+08 5.5 6 3.875 4 3.625 
    4.875 4.5 4.75 3.625 3.375 4.5 
    5.5 6.5 6.75 5.5 4.75 6.375 
    6 6.25 4.75 5.25 4.875 9.89527e+07 
    7.33333 6.6 6.6 6.2 6.2 6.66667 
