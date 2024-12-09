
# Metodo Factory (Factory Method)

Il **Factory Method** è un pattern di progettazione creazionale che fornisce un'interfaccia per creare oggetti in una superclasse, ma consente alle sottoclassi di modificare il tipo di oggetti che saranno creati.

---

## Problema

Immagina di creare un'applicazione di gestione logistica. La prima versione dell'app può gestire solo il trasporto su strada tramite camion, quindi la maggior parte del codice risiede nella classe `Truck`.

Con il tempo, l'app diventa popolare e ricevi richieste da aziende di trasporto marittimo per integrare la logistica via mare. Tuttavia, il codice è fortemente accoppiato alla classe `Truck`. Aggiungere una classe `Ship` richiederebbe modifiche estese e complicate al codice esistente.

Risultato: il codice diventerebbe difficile da gestire, con molte condizioni per cambiare il comportamento a seconda della classe di trasporto.

---

## Soluzione

Il **Factory Method** suggerisce di sostituire le chiamate dirette ai costruttori degli oggetti (tramite l'operatore `new`) con chiamate a un metodo factory speciale. Questo metodo factory crea oggetti e li restituisce come "prodotti".

- Le sottoclassi possono sovrascrivere il metodo factory per modificare il tipo di oggetti restituiti.
- I prodotti devono condividere una base comune (un'interfaccia o una classe astratta). Ad esempio, `Truck` e `Ship` possono implementare l'interfaccia `Transport`, che include un metodo `deliver`.

Con questo approccio, il codice cliente utilizza i prodotti come istanze astratte (`Transport`) senza preoccuparsi di quale tipo specifico sia stato creato.

---

## Struttura del Factory Method

1. **Prodotto**: Interfaccia comune per tutti gli oggetti prodotti dal creator e dalle sue sottoclassi.
2. **Prodotti Concreti**: Implementazioni specifiche del prodotto.
3. **Creator**: Classe base che dichiara il metodo factory. Può essere astratto o fornire un'implementazione predefinita.
4. **Creator Concreti**: Sottoclassi del creator che sovrascrivono il metodo factory per creare prodotti specifici.

---

## Esempio di Pseudocodice

Un esempio semplice di Factory Method per creare elementi UI cross-platform:

```java
// Creator astratto con il metodo factory
class Dialog {
    abstract Button createButton();

    void render() {
        Button okButton = createButton();
        okButton.onClick(this::closeDialog);
        okButton.render();
    }
}

// Creator concreti che sovrascrivono il metodo factory
class WindowsDialog extends Dialog {
    Button createButton() {
        return new WindowsButton();
    }
}

class WebDialog extends Dialog {
    Button createButton() {
        return new HTMLButton();
    }
}

// Interfaccia prodotto
interface Button {
    void render();
    void onClick(Action action);
}

// Prodotti concreti
class WindowsButton implements Button { ... }
class HTMLButton implements Button { ... }
```

---

## Applicabilità

- **Quando non conosci in anticipo i tipi esatti di oggetti che il codice deve gestire.**
- **Per estendere componenti interni di una libreria o framework.**
- **Per ottimizzare l'uso delle risorse riutilizzando oggetti esistenti.**

---

## Come Implementare

1. **Definisci un'interfaccia comune** per tutti i prodotti.
2. **Aggiungi un metodo factory** astratto nel creator.
3. **Sostituisci i costruttori diretti** con chiamate al metodo factory.
4. **Crea sottoclassi del creator** che sovrascrivono il metodo factory per ogni tipo di prodotto.
5. **Ottimizza il metodo factory** per gestire eventuali parametri di controllo.

---

## Pro e Contro

### Pro
- Riduce l'accoppiamento tra il creator e i prodotti concreti.
- Migliora la manutenibilità grazie al principio di responsabilità unica.
- Facilita l'estendibilità grazie al principio aperto/chiuso.

### Contro
- Può complicare il codice introducendo molte nuove sottoclassi.
- È ideale quando esiste già una gerarchia di creator da cui partire.

---

## Relazioni con Altri Pattern

- Può evolvere in **Abstract Factory**, **Prototype** o **Builder** per maggiore flessibilità.
- Spesso usato insieme a **Iterator** per restituire tipi diversi di iteratori.
- È una specializzazione del **Template Method**.
