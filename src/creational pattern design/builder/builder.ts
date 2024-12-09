// Interfaccia del Builder
interface Builder {
  reset(): void;
  setWalls(material: string): void;
  setDoor(door: string): void;
  setWindows(count: number): void;
  setRoof(roof: string): void;
  getProduct(): House;
}

// Concrete Builder per una casa standard
class HouseBuilder implements Builder {
  protected house: House = new House(); // Inizializzazione diretta

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

// Concrete Builder per una casa di lusso
class LuxuryHouseBuilder extends HouseBuilder {
  setSwimmingPool(): void {
    this.house.hasSwimmingPool = true;
  }

  setGarden(): void {
    this.house.hasGarden = true;
  }
}

// Classe House: rappresenta il prodotto finale
class House {
  walls: string = "";
  door: string = "";
  windows: number = 0;
  roof: string = "";
  hasSwimmingPool: boolean = false;
  hasGarden: boolean = false;

  toString(): string {
    return `Walls: ${this.walls}, Door: ${this.door}, Windows: ${this.windows}, Roof: ${this.roof}, Swimming Pool: ${this.hasSwimmingPool}, Garden: ${this.hasGarden}`;
  }
}

// Classe Director
class Director {
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
    if (this.builder instanceof LuxuryHouseBuilder) {
      this.builder.reset();
      this.builder.setWalls("stone");
      this.builder.setDoor("double-glazed");
      this.builder.setWindows(6);
      this.builder.setRoof("slate");
      this.builder.setSwimmingPool();
      this.builder.setGarden();
    } else {
      console.warn("Luxury features not available with the current builder.");
    }
  }
}

// Utilizzo del Builder Pattern
const director = new Director();
const simpleBuilder = new HouseBuilder();
director.setBuilder(simpleBuilder);

director.constructSimpleHouse();
const simpleHouse = simpleBuilder.getProduct();
console.log("Simple House:", simpleHouse.toString());

const luxuryBuilder = new LuxuryHouseBuilder();
director.setBuilder(luxuryBuilder);

director.constructLuxuryHouse();
const luxuryHouse = luxuryBuilder.getProduct();
console.log("Luxury House:", luxuryHouse.toString());

// Costruzione personalizzata senza Director
const customBuilder = new LuxuryHouseBuilder();
customBuilder.setWalls("concrete");
customBuilder.setDoor("metal");
customBuilder.setWindows(10);
customBuilder.setRoof("glass");
customBuilder.setSwimmingPool();
const customHouse = customBuilder.getProduct();
console.log("Custom House:", customHouse.toString());
