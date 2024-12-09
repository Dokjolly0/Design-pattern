// Interfaccia del Builder
interface BuilderExample {
  reset(): void;
  setWalls(material: string): void;
  setDoor(door: string): void;
  setWindows(count: number): void;
  setRoof(roof: string): void;
  getProduct(): HouseExample;
}

// Concrete Builder per una casa standard
class HouseBuilderExample implements BuilderExample {
  protected house: HouseExample = new HouseExample(); // Inizializzazione diretta

  constructor() {
    this.reset();
  }

  reset(): void {
    this.house = new HouseExample();
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

  getProduct(): HouseExample {
    const product = this.house;
    this.reset();
    return product;
  }
}

// Concrete Builder per una casa di lusso
class LuxuryHouseBuilderExample extends HouseBuilderExample {
  setSwimmingPool(): void {
    this.house.hasSwimmingPool = true;
  }

  setGarden(): void {
    this.house.hasGarden = true;
  }
}

// Estendiamo il builder di casa di lusso per supportare pannelli solari
class EcoLuxuryHouseBuilderExample extends LuxuryHouseBuilderExample {
  setSolarPanels(): void {
    this.house.hasSolarPanels = true;
  }
}

// Classe House: rappresenta il prodotto finale
class HouseExample {
  walls: string = "";
  door: string = "";
  windows: number = 0;
  roof: string = "";
  hasSwimmingPool: boolean = false;
  hasGarden: boolean = false;
  hasSolarPanels: boolean = false;

  toString(): string {
    return `Walls: ${this.walls}, Door: ${this.door}, Windows: ${this.windows}, Roof: ${this.roof}, Swimming Pool: ${this.hasSwimmingPool}, Garden: ${this.hasGarden}`;
  }
}

// Classe Director
class DirectorExample {
  private builder!: Builder;

  setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  constructSimpleHouse(): void {
    this.builder.reset();
    this.builder.setWalls("brick");
    this.builder.setDoor("wooden");
    this.builder.setWindows(4);
    this.builder.setRoof("shingles");
  }

  constructLuxuryHouse(): void {
    if (this.builder instanceof LuxuryHouseBuilderExample) {
      this.builder.reset();
      this.builder.setWalls("stone");
      this.builder.setDoor("double-glazed");
      this.builder.setWindows(6);
      this.builder.setRoof("slate");
      this.builder.setSwimmingPool();
      this.builder.setGarden();
    } else if (this.builder instanceof EcoLuxuryHouseBuilderExample) {
      this.builder.reset();
      this.builder.setWalls("stone");
      this.builder.setDoor("double-glazed");
      this.builder.setWindows(6);
      this.builder.setRoof("slate");
      this.builder.setSwimmingPool();
      this.builder.setGarden();
      this.builder.setSolarPanels();
    } else {
      console.warn("Luxury features not available with the current builder.");
    }
  }
}

// Utilizzo del Builder Pattern
const directorExample = new DirectorExample();
const simpleBuilderExample = new HouseBuilderExample();
directorExample.setBuilder(simpleBuilderExample);

directorExample.constructSimpleHouse();
const simpleHouseExample = simpleBuilderExample.getProduct();
console.log("Simple House:", simpleHouseExample.toString());

const luxuryBuilderExample = new LuxuryHouseBuilderExample();
directorExample.setBuilder(luxuryBuilderExample);

directorExample.constructLuxuryHouse();
const luxuryHouseExample = luxuryBuilderExample.getProduct();
console.log("Luxury House:", luxuryHouseExample.toString());

// Test del builder di casa di lusso con pannelli solari
const ecoLuxuryBuilderExample = new EcoLuxuryHouseBuilderExample();
directorExample.setBuilder(ecoLuxuryBuilderExample);
directorExample.constructLuxuryHouse();
const ecoLuxuryHouseExample = ecoLuxuryBuilderExample.getProduct();
console.log("Eco Luxury House:", ecoLuxuryHouseExample.toString());

// Costruzione personalizzata senza Director
const customBuilderExample = new LuxuryHouseBuilderExample();
customBuilderExample.setWalls("concrete");
customBuilderExample.setDoor("metal");
customBuilderExample.setWindows(10);
customBuilderExample.setRoof("glass");
customBuilderExample.setSwimmingPool();
const customHouseExample = customBuilderExample.getProduct();
console.log("Custom House:", customHouseExample.toString());

// // Interfaccia del Builder con un metodo aggiuntivo per sistemi smart
// interface BuilderExample {
//   reset(): void;
//   setWallsExample(material: string): void;
//   setDoorExample(door: string): void;
//   setWindowsExample(count: number): void;
//   setRoofExample(roof: string): void;
//   addSmartHomeSystemExample(): void; // Metodo aggiuntivo
//   getProductExample(): HouseExample;
// }

// // Concrete Builder per una casa base
// class HouseBuilderExample implements BuilderExample {
//   private houseExample = new HouseExample();

//   constructor() {
//     this.reset();
//   }

//   reset(): void {
//     this.houseExample = new HouseExample();
//   }

//   setWallsExample(material: string): void {
//     this.houseExample.wallsExample = material;
//   }

//   setDoorExample(door: string): void {
//     this.houseExample.doorExample = door;
//   }

//   setWindowsExample(count: number): void {
//     this.houseExample.windowsExample = count;
//   }

//   setRoofExample(roof: string): void {
//     this.houseExample.roofExample = roof;
//   }

//   // Metodo aggiuntivo per aggiungere un sistema smart
//   addSmartHomeSystemExample(): void {
//     this.houseExample.hasSmartHomeSystemExample = true;
//   }

//   getProductExample(): HouseExample {
//     const product = this.houseExample;
//     this.reset();
//     return product;
//   }
// }

// // Classe House rappresenta il prodotto finale
// class HouseExample {
//   wallsExample: string = "";
//   doorExample: string = "";
//   windowsExample: number = 0;
//   roofExample: string = "";
//   hasSmartHomeSystemExample: boolean = false;
// }

// // La classe Director per dirigere il processo di costruzione
// class DirectorExample {
//   private builderExample: BuilderExample;

//   constructor(builderExample: BuilderExample) {
//     this.builderExample = builderExample;
//   }

//   constructSimpleHouseExample(): void {
//     this.builderExample.setWallsExample("brick");
//     this.builderExample.setDoorExample("wooden");
//     this.builderExample.setWindowsExample(4);
//     this.builderExample.setRoofExample("shingles");
//   }

//   // Metodo per costruire una casa con sistema smart
//   constructSmartHouseExample(): void {
//     this.builderExample.setWallsExample("brick");
//     this.builderExample.setDoorExample("wooden");
//     this.builderExample.setWindowsExample(6);
//     this.builderExample.setRoofExample("modern");
//     this.builderExample.addSmartHomeSystemExample();
//   }
// }

// // Esempio di utilizzo
// const builderExample = new HouseBuilderExample();
// const directorExample = new DirectorExample(builderExample);

// // Creazione di una casa semplice
// directorExample.constructSimpleHouseExample();
// const simpleHouseExample = builderExample.getProductExample();
// console.log("Simple House Example:", simpleHouseExample);

// // Creazione di una casa con sistema smart
// directorExample.constructSmartHouseExample();
// const smartHouseExample = builderExample.getProductExample();
// console.log("Smart House Example:", smartHouseExample);
