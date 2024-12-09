// Interfacce dei Prodotti Astratti
interface ButtonExample {
  paint(): void;
}

interface CheckboxExample {
  paint(): void;
}

// Interfaccia Astratta per Slider
interface SliderExample {
  render(): void;
}

// Prodotti Concreti: Windows
class WinButtonExample implements ButtonExample {
  paint(): void {
    console.log("Rendering a button in Windows style.");
  }
}

class WinCheckboxExample implements CheckboxExample {
  paint(): void {
    console.log("Rendering a checkbox in Windows style.");
  }
}

class WinSliderExample implements SliderExample {
  render(): void {
    console.log("Rendering a slider in Windows style.");
  }
}

// Prodotti Concreti: macOS
class MacButtonExample implements ButtonExample {
  paint(): void {
    console.log("Rendering a button in macOS style.");
  }
}

class MacCheckboxExample implements CheckboxExample {
  paint(): void {
    console.log("Rendering a checkbox in macOS style.");
  }
}

class MacSliderExample implements SliderExample {
  render(): void {
    console.log("Rendering a slider in macOS style.");
  }
}

// Interfaccia della Factory Astratta
interface GUIFactoryExample {
  createButton(): Button;
  createCheckbox(): Checkbox;
  createSlider(): SliderExample;
}

// Implementa il Metodo nella Factory Concreta
class WinFactoryExample implements GUIFactoryExample {
  createButton(): ButtonExample {
    return new WinButtonExample();
  }
  createCheckbox(): CheckboxExample {
    return new WinCheckboxExample();
  }
  createSlider(): SliderExample {
    return new WinSliderExample();
  }
}

class MacFactoryExample implements GUIFactoryExample {
  createButton(): ButtonExample {
    return new MacButtonExample();
  }
  createCheckbox(): CheckboxExample {
    return new MacCheckboxExample();
  }
  createSlider(): SliderExample {
    return new MacSliderExample();
  }
}

// Codice Client Aggiornato
class ApplicationExample {
  private button: ButtonExample;
  private checkbox: CheckboxExample;
  private slider: SliderExample;

  constructor(factory: GUIFactoryExample) {
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

// Inizializzazione dell'Applicazione
class ApplicationConfiguratorExample {
  static initialize(): ApplicationExample {
    let factory: GUIFactoryExample;

    // Simula il rilevamento dell'ambiente
    const OS = "Windows"; // Cambia in "Mac" per testare macOS

    if (OS === "Windows") {
      factory = new WinFactoryExample();
    } else if (OS === "Mac") {
      factory = new MacFactoryExample();
    } else {
      throw new Error("Unknown operating system.");
    }

    return new ApplicationExample(factory);
  }
}

// Avvia l'Applicazione
const appExample = ApplicationConfiguratorExample.initialize();
appExample.render();
