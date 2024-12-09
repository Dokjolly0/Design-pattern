# Pattern di Progettazione Abstract Factory

L'**Abstract Factory** è un pattern creazionale che fornisce un'interfaccia per creare famiglie di oggetti correlati o dipendenti senza specificarne le classi concrete. È particolarmente utile quando un sistema deve supportare varianti di prodotto multiple, ma deve rimanere disaccoppiato dai dettagli della loro implementazione.

## Come Funziona

1. **Prodotti Astratti**: Definisci interfacce per i prodotti distinti in una famiglia di prodotti.
2. **Prodotti Concreti**: Implementano le interfacce dei prodotti astratti, raggruppandoli per varianti.
3. **Factory Astratta**: Dichiara metodi per creare ciascun prodotto della famiglia.
4. **Factory Concreta**: Implementa l'interfaccia della factory astratta per ciascuna variante di prodotto.
5. **Codice Client**: Lavora con factory e prodotti solo tramite le loro interfacce astratte.

Questo garantisce flessibilità e adesione al **Principio Open/Closed**—puoi aggiungere nuove famiglie di prodotti o varianti senza modificare il codice del client.

## Esempio in TypeScript

### Scenario

Consideriamo un'applicazione GUI che supporta due sistemi operativi: **Windows** e **macOS**. Ogni sistema operativo ha stili distinti per componenti UI come pulsanti e checkbox. Utilizzando il pattern Abstract Factory, creeremo famiglie di questi componenti UI garantendo che siano compatibili all'interno delle rispettive varianti.

### Implementazione

```typescript
// Interfacce dei Prodotti Astratti
interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}

// Prodotti Concreti: Windows
class WinButton implements Button {
  paint(): void {
    console.log("Rendering a button in Windows style.");
  }
}

class WinCheckbox implements Checkbox {
  paint(): void {
    console.log("Rendering a checkbox in Windows style.");
  }
}

// Prodotti Concreti: macOS
class MacButton implements Button {
  paint(): void {
    console.log("Rendering a button in macOS style.");
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("Rendering a checkbox in macOS style.");
  }
}

// Interfaccia della Factory Astratta
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Factory Concreta
class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }

  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Codice Client
class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  render(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}

// Inizializzazione dell'Applicazione
class ApplicationConfigurator {
  static initialize(): Application {
    let factory: GUIFactory;

    // Simula il rilevamento dell'ambiente
    const OS = "Windows"; // Cambia in "Mac" per testare macOS

    if (OS === "Windows") {
      factory = new WinFactory();
    } else if (OS === "Mac") {
      factory = new MacFactory();
    } else {
      throw new Error("Unknown operating system.");
    }

    return new Application(factory);
  }
}

// Avvia l'Applicazione
const app = ApplicationConfigurator.initialize();
app.render();
```

---

### Come Aggiungere Altri Metodi o Prodotti

Per aggiungere nuovi metodi o prodotti:

1. Aggiorna le **`Interfacce dei Prodotti Astratti`**: Aggiungi nuovi metodi nelle interfacce esistenti o crea nuove interfacce per i prodotti aggiuntivi.
2. **`Crea Prodotti`** Concreti: Implementa i nuovi metodi o prodotti nelle classi concrete esistenti o crea nuove classi per i prodotti.
3. **`Aggiorna l'Interfaccia della Factory Astratta`**: Aggiungi i metodi di creazione per i nuovi prodotti.
   Implementa i Nuovi Metodi nella Factory Concreta: Aggiorna le factory concrete per supportare i nuovi prodotti.
4. **`Modifica il Codice Client`**: Utilizza i nuovi metodi della factory astratta per accedere ai prodotti.

Esempio: Aggiunta di un Slider

```typescript
// Interfaccia Astratta per Slider
interface Slider {
  render(): void;
}

// Prodotti Concreti: Slider per Windows e macOS
class WinSlider implements Slider {
  render(): void {
    console.log("Rendering a slider in Windows style.");
  }
}

class MacSlider implements Slider {
  render(): void {
    console.log("Rendering a slider in macOS style.");
  }
}

// Aggiungi un Metodo all'Interfaccia della Factory Astratta
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createSlider(): Slider;
}

// Implementa il Metodo nella Factory Concreta
class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }
  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
  createSlider(): Slider {
    return new WinSlider();
  }
}

class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
  createSlider(): Slider {
    return new MacSlider();
  }
}

// Codice Client Aggiornato
class Application {
  private button: Button;
  private checkbox: Checkbox;
  private slider: Slider;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
    this.slider = factory.createSlider();
  }

  render(): void {
    this.button.paint();
    this.checkbox.paint();
    this.slider.render();
  }
}
```

### Vantaggi

1. Garantisce la compatibilità tra oggetti correlati in una famiglia.
2. Disaccoppia il codice client dalle classi concrete di prodotti e factory.
3. Rispetta il Principio di Responsabilità Singola, centralizzando la logica di creazione degli oggetti.

### Svantaggi

1. **Troppe interfacce**: Incrementa il numero di classi e interfacce, rendendo il sistema più complesso.

### Quando Utilizzarlo

1. Quando devi lavorare con famiglie di oggetti correlati.
2. Quando vuoi garantire la compatibilità tra prodotti correlati.
3. Quando il sistema deve essere estensibile per supportare nuove famiglie di prodotti.

Seguendo questo pattern, il tuo codice rimarrà flessibile, manutenibile ed estensibile, anche con l'introduzione di nuove varianti di prodotto.
