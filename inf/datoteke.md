# Datoteke

Osim ulaznih i izlaznih podataka preko konzole/terminala, programi mogu korstiti datoteke za  
spašavanje ulaznih ili ispis izlaznih podataka. Za tu svrhu koristi se biblioteka `fstream`

## Ispis iz programa u datoteku

Za ispis u datoteku koristi se `ofstream` tip objekta iz biblioteke `<fstream>`.

```c++
#include <fstream>

using namespace std;

int main() {
    ofstream file("output.txt");
    file << 1;
    file << "tekst";
    file << 3.14;
    file.close();
    return 0;
}
```

Poslije pokretanja programa datoteka "output.txt" će biti kreirana pored programa i izgledat će ovako:
```txt
1tekst3.14
```

#### Kako ovo radi

`ofstream` je kompleksni tip podatka varijable koja se zove `file`. U zagradama se stavlja naziv datoteke, sa ekstenzijom `"output.txt"` u koju se podaci žele unijeti. Unos podataka se obavlja na isti način kao i sa `cout`, tj. koristeći strelice koje pokazuju da se podatak "kreće" prema `file`, tj. `file << " tekst "` će ispisati string "tekst" u datoteku. Kako bi spasili promjene napravljene u datoteci, mora se koristiti `file.close()`. `file` je samo naziv varijable te može biti šta god korisnik želi.

Za ispis novog reda, slično kao `cout << endl;` koristi se `file << endl;`

## Unos iz datoteke u program

Unos iz datoteke se radi koristeći `ifstream` tip podataka, na sličan način kao i ispis, s tim da je smijer toka podataka obrnut.

input.txt:
```txt
4 5
3
```

```c++
int main() {
    int a, b, c;
    ifstream file("input.txt");
    file >> a;
    file >> b >> c;
    file.close();
    return 0; 
}
```

#### Kako ovo radi

Brojevi su zapisani u datoteci `input.txt` razmaknuti `whitespace`-om (tj. razmakom ili novim redom). Za ulaznu datoteku se koristi `ifstream` tip varijable sa nazivom datoteke. `file >> a` prouzrokuje da se prvi broj prebaci u varijablu `a` dok `file >> b >> c` rezultiraju tome da se drugi i treći broj prebace u varijable `b` i `c`.

## Upis / ispis

Ukoliko je potrebno čitanje i pisanje u istu datoteku u nekom programu može se koristiti tip podatka `fstream`. Tako bi se umjesto `ifstream` ili `ofstream` koristilo `fstream file` a ostatak koda je isti.

#### Primjer
Potrebno je napisati program koji računa prosječnu vrijednost niza koji je definisan u ulaznoj datoteci `input.txt`. Sračunatu vrijednost je potrebno ispisati u datoteku `output.txt`.

Ulazna datoteka izgleda ovako:

```txt
8
1 1 2 1 4 5 2 3
```
tj. prvi broj predstavlja broj elemenata niza, a potom slijede vrijednosti elemenata tog niza.

```cpp
#include <fstream>

using namespace std;

int main() {
    ifstream ulaz("input.txt");
    int br;
    ulaz >> br;
    float suma = 0;
    for (int i = 0; i < br; i++) {
        int a;
        ulaz >> a;
        suma += a;
    }
    ulaz.close();
    
    float prosjek = suma / br;
    ofstream izlaz("output.txt");
    izlaz << "Prosječna vrijednost je: " << prosjek;
    izlaz.close();
    return 0;
}
```



