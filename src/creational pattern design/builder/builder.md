# Pattern Builder

Il pattern Builder è un pattern creazionale che permette di costruire oggetti complessi passo dopo passo. Questo pattern consente di produrre diversi tipi e rappresentazioni di un oggetto utilizzando lo stesso codice di costruzione. L'obiettivo principale del pattern Builder è separare la logica di costruzione di un oggetto dalla sua rappresentazione, permettendo di costruire oggetti complessi senza creare un numero eccessivo di sottoclassi o usare costruttori mostruosi con molti parametri.

## Problema

Immagina un oggetto complesso che richiede un'inizializzazione laboriosa e step-by-step di molti campi e oggetti nidificati. Tale codice di inizializzazione è spesso sepolto all'interno di un costruttore mostruoso con molti parametri. Oppure, peggio ancora, è sparso ovunque nel codice cliente. Potresti complicare eccessivamente il programma creando una sottoclasse per ogni possibile configurazione di un oggetto.

Ad esempio, consideriamo come creare un oggetto `Casa`. Per costruire una semplice casa, devi costruire quattro muri e un pavimento, installare una porta, inserire una coppia di finestre e costruire un tetto. Ma cosa succede se vuoi una casa più grande e luminosa, con un cortile e altri accessori (come un impianto di riscaldamento, impianti idraulici e impianti elettrici)?

## Soluzione

Il pattern Builder suggerisce di estrarre il codice di costruzione dell'oggetto dalla sua classe principale e di spostarlo in oggetti separati chiamati builder. Il pattern Builder ti permette di costruire oggetti complessi passo dopo passo. Il Builder non permette ad altri oggetti di accedere al prodotto mentre è in fase di costruzione. Il pattern organizza la costruzione degli oggetti in un insieme di passaggi (`buildWalls`, `buildDoor`, ecc.). Per creare un oggetto, esegui una serie di questi passaggi su un oggetto builder. L'importante è che non sia necessario chiamare tutti i passaggi. Puoi chiamare solo quelli necessari per produrre una particolare configurazione di un oggetto.

Alcuni dei passaggi di costruzione potrebbero richiedere implementazioni diverse quando hai bisogno di costruire varie rappresentazioni del prodotto. Ad esempio, i muri di una baita potrebbero essere costruiti di legno, ma i muri di un castello devono essere costruiti con pietra. In questo caso, puoi creare diverse classi builder che implementano lo stesso set di passaggi di costruzione, ma in modo diverso. Quindi puoi usare questi builder nel processo di costruzione (cioè, un insieme ordinato di chiamate ai passaggi di costruzione) per produrre diversi tipi di oggetti.

### Struttura

1. **L'interfaccia Builder** dichiara passaggi di costruzione comuni a tutti i tipi di builder.
2. **Concrete Builders** forniscono implementazioni diverse dei passaggi di costruzione. I concrete builder possono produrre prodotti che non seguono necessariamente l'interfaccia comune.
3. **Products** sono gli oggetti risultanti. I prodotti costruiti dai diversi builder non devono appartenere necessariamente alla stessa gerarchia di classi o interfaccia.
4. **La classe Director** definisce l'ordine in cui eseguire i passaggi di costruzione, così puoi creare e riutilizzare configurazioni specifiche di prodotti.
5. **Il Cliente** deve associare uno degli oggetti builder con il direttore. Di solito, questo viene fatto una sola volta, tramite i parametri del costruttore del direttore. Quindi il direttore usa quell'oggetto builder per tutte le costruzioni successive. Tuttavia, c'è un'altra approccio in cui il cliente passa l'oggetto builder al metodo di produzione del direttore. In questo caso, puoi usare un builder diverso ogni volta che produci qualcosa con il direttore.

### Esempio Concreto: Costruzione di una Casa

Consideriamo di costruire una casa complessa usando il pattern Builder. In questo esempio, utilizzeremo TypeScript per implementare il pattern.

```typescript
// Interfaccia del Builder
interface Builder {
  reset(): void;
  setWalls(material: string): void;
  setDoor(door: string): void;
  setWindows(count: number): void;
  setRoof(roof: string): void;
  getProduct(): House;
}

// Un esempio di Concrete Builder per costruire una casa
class HouseBuilder implements Builder {
  private house: House;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new House();
  }

  setWalls(material: string): void {
    this.house.walls = material;
  }

  setDoor(door: string): void {
    this.house.door = door;
  }

  setWindows(count: number): void {
    this.house.windows = count;
  }

  setRoof(roof: string): void {
    this.house.roof = roof;
  }

  getProduct(): House {
    const product = this.house;
    this.reset();
    return product;
  }
}

// Un altro esempio di Concrete Builder per una casa di lusso
class LuxuryHouseBuilder extends HouseBuilder {
  setSwimmingPool(): void {
    this.house.hasSwimmingPool = true;
  }

  setGarden(): void {
    this.house.hasGarden = true;
  }
}

// La classe House che rappresenta il prodotto finale
class House {
  walls: string = "";
  door: string = "";
  windows: number = 0;
  roof: string = "";
  hasSwimmingPool: boolean = false;
  hasGarden: boolean = false;
}

// La classe Director che dirige il processo di costruzione
class Director {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  constructSimpleHouse(): void {
    this.builder.setWalls("brick");
    this.builder.setDoor("wooden");
    this.builder.setWindows(4);
    this.builder.setRoof("shingles");
  }

  constructLuxuryHouse(): void {
    this.builder.setWalls("stone");
    this.builder.setDoor("double-glazed");
    this.builder.setWindows(6);
    this.builder.setRoof("slate");
    this.builder.setSwimmingPool();
    this.builder.setGarden();
  }
}

// Il client utilizza il pattern Builder
const director = new Director(new HouseBuilder());
director.constructSimpleHouse();
const simpleHouse = director.builder.getProduct();

const luxuryDirector = new Director(new LuxuryHouseBuilder());
luxuryDirector.constructLuxuryHouse();
const luxuryHouse = luxuryDirector.builder.getProduct();

console.log("Simple House:", simpleHouse);
console.log("Luxury House:", luxuryHouse);
```

## Applicabilità

1. **Usa il pattern Builder per eliminare un “costruttore telescopico”.**
   - Ad esempio, se hai un costruttore con dieci parametri opzionali. Utilizzare il pattern Builder permette di costruire oggetti passo dopo passo, utilizzando solo i passaggi necessari.
2. **Usa il pattern Builder quando vuoi che il tuo codice possa creare diverse rappresentazioni di un prodotto (ad esempio, case di pietra e di legno).**
   - Il pattern Builder può essere applicato quando la costruzione di vari rappresentazioni del prodotto comporta passaggi simili che differiscono solo nei dettagli.
3. ## Usa il pattern Builder per costruire alberi compositi o altri oggetti complessi.
   - Il pattern Builder permette di costruire prodotti passo dopo passo. Puoi posticipare l'esecuzione di alcuni passaggi senza rompere il prodotto finale. Puoi anche chiamare passaggi in modo ricorsivo, il che è utile quando hai bisogno di costruire una struttura ad albero di oggetti.

## Pro e Contro

### Vantaggi:

1. **Separazione della costruzione e rappresentazione.**
   - Il pattern Builder separa la costruzione di un oggetto complesso dalla sua rappresentazione. Questo ti permette di costruire oggetti passo dopo passo, utilizzando solo i passaggi necessari.
2. **Riutilizzo del codice.**
   - Puoi riutilizzare lo stesso codice di costruzione quando costruisci varie rappresentazioni di prodotti.
3. **Costruzione passo dopo passo.**
   - Il pattern Builder ti permette di costruire oggetti passo dopo passo, posticipando l'esecuzione di alcuni passaggi o chiamando passaggi in modo ricorsivo.

### Svantaggi:

1. La complessità complessiva del codice aumenta poiché il pattern richiede la creazione di più classi nuove.

## Relazioni con altri Pattern

- Molti progetti iniziano utilizzando Factory Method (meno complicato e più personalizzabile tramite sottoclassi) e si evolvono verso Abstract Factory, Prototype o Builder (più flessibile, ma più complicato).
- Builder si concentra sulla costruzione di oggetti complessi passo dopo passo.
- Abstract Factory si concentra sulla creazione di famiglie di oggetti correlati. Abstract Factory restituisce il prodotto immediatamente, mentre Builder ti permette di eseguire ulteriori passaggi di costruzione prima di ottenere il prodotto.
- Puoi usare Builder quando crei alberi compositi complessi perché puoi programmare i suoi passaggi di costruzione per lavorare in modo ricorsivo.
- Puoi combinare Builder con Bridge: la classe direttore svolge il ruolo di astrazione, mentre diversi builder agiscono come implementazioni.
- Abstract Factories, Builders e Prototypes possono essere implementati come Singleton.
