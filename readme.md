# System zarządzania wypożyczalnią samochodów

Projekt zrealizowany w ramach praktyk, pozwala na zarządzanie flotą samochodów w firmie zajmującą się ich wypożyczaniem. Jest on oparty na MEAN stack tj. MongoDB, Angular 5, Express.js, Node.js. Backend został również zrealizowany w technologii Java Spring ( http://www.github.com/gajewa/wypozyczalniaSpring ).

Mamy dostępne spisy samochodów oraz klientów wraz z wyszukiwarkami oraz ranking klientów który automatycznie przydziela zniżkę przy wypożyczeniu jeśli dany klient jest w top3 stałych klientów. 

Każde auto posiada swoją historię eksploatacyjną wraz z możliwością dodania przeglądów, serwisów, czyszczenia itd. 

Aby wypożyczyć auto należy wyszukać interesujące nas auto w liście i kliknąć w odpowiedni link po prawej stronie tabelki. Pojawi nam się strona z danymi auta na której możemy edytować auto, wyświetlić historię wypożyczeń / serwisową, usunąć auto lub wypożyczyć je (numery dowodów do testu: "ABC 123456", "XYZ 987654").

Po wykonaniu tej operacji wypożyczenie jest zlecone i w spisie wypożyczeń możemy je odebrać gdy minie data wypożyczenia. Możemy też anulować wypożyczenie i oddać.
