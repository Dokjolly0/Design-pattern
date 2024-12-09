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
