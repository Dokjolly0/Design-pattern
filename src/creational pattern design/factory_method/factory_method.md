# Metodo Factory (Factory Method)

Il **Factory Method** è un pattern di progettazione creazionale che fornisce un'interfaccia per creare oggetti in una superclasse, ma consente alle sottoclassi di modificare il tipo di oggetti che saranno creati.

---

## Problema

Immagina di creare un'applicazione di gestione logistica. La prima versione dell'app può gestire solo il trasporto su strada tramite camion (`Truck`). Tuttavia, con il tempo, il sistema deve gestire anche trasporti marittimi con navi (`Ship`).

Modificare il codice esistente per aggiungere ogni nuovo tipo di trasporto potrebbe risultare complicato e introdurre bug. Inoltre, sarebbe difficile aggiungere nuovi tipi di trasporto in futuro senza riscrivere parte del codice esistente.

---

## Soluzione

Il **Factory Method** propone di sostituire le chiamate dirette ai costruttori (`new`) con un metodo factory. Questo metodo è sovrascritto dalle sottoclassi per restituire un tipo specifico di oggetto. Tutti i tipi di trasporto implementano un'interfaccia comune (`Transport`), garantendo che il codice cliente possa usarli in modo uniforme.

---

## Esempio di Implementazione

Ecco un'implementazione concreta per un sistema di logistica con supporto per camion e navi:

```java
// Interfaccia comune per i prodotti
interface Transport {
    void deliver();
}

// Implementazione concreta: Camion
class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("Consegna su strada con un camion.");
    }
}

// Implementazione concreta: Nave
class Ship implements Transport {
    @Override
    public void deliver() {
        System.out.println("Consegna via mare con una nave.");
    }
}

// Creator astratto
abstract class Logistics {
    // Metodo Factory
    public abstract Transport createTransport();

    public void planDelivery() {
        // Usa il prodotto creato dal Factory Method
        Transport transport = createTransport();
        transport.deliver();
    }
}

// Creator concreto: Logistica su strada
class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}

// Creator concreto: Logistica via mare
class SeaLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}

// Esempio di utilizzo
public class Main {
    public static void main(String[] args) {
        // Logistica su strada
        Logistics roadLogistics = new RoadLogistics();
        roadLogistics.planDelivery();

        // Logistica via mare
        Logistics seaLogistics = new SeaLogistics();
        seaLogistics.planDelivery();
    }
}
```

---

## Vantaggi

- **Disaccoppiamento**: Il codice cliente non dipende dai tipi concreti di trasporto.
- **Estensibilità**: È facile aggiungere nuovi tipi di trasporto (es. `Airplane`) creando una nuova sottoclasse di `Logistics`.
- **Manutenibilità**: La logica per creare un tipo specifico di trasporto è isolata nel metodo factory.

---

## Applicabilità

Usa il **Factory Method** quando:

- Non conosci in anticipo i tipi esatti di oggetti di cui il tuo codice avrà bisogno.
- Vuoi semplificare l'estensione del codice per supportare nuovi tipi di oggetti.
- Vuoi ridurre la duplicazione di codice relativo alla creazione degli oggetti.

---

## Aggiunte

Aggiungi a **Transport** (interface) il metodo che vuoi aggiungere (comune a tutti i trasporti).

- getCost(): double
- getDuration(): int

Aggiungi a **Truck** e **Ship** (classi concrete) l'implementazione dei metodi aggiunti.

```java
// Interfaccia comune per i prodotti
interface Transport {
    void deliver();
    double getCost();
    int getDuration();
}

// Implementazione concreta: Camion
class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("Consegna su strada con un camion.");
    }

    @Override
    public double getCost() {
        return 100.0;
    }

    @Override
    public int getDuration() {
        return 2;
    }
}

// Implementazione concreta: Nave
class Ship implements Transport {
    @Override
    public void deliver() {
        System.out.println("Consegna via mare con una nave.");
    }

    @Override
    public double getCost() {
        return 200.0;
    }

    @Override
    public int getDuration() {
        return 5;
    }
}
```

---

## Conclusione

Il **Factory Method** è una soluzione elegante per problemi di creazione di oggetti che possono variare. Nel caso della logistica, permette di aggiungere nuovi tipi di trasporto senza modificare il codice cliente esistente, rendendo il sistema più modulare e flessibile.
