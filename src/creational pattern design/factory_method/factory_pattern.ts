// Interfaccia comune per i prodotti
interface Transport {
  deliver(): void;
}

// Implementazione concreta: Camion
class Truck implements Transport {
  deliver(): void {
    console.log("Consegna su strada con un camion.");
  }
}

// Implementazione concreta: Nave
class Ship implements Transport {
  deliver(): void {
    console.log("Consegna via mare con una nave.");
  }
}

// Creator astratto
abstract class Logistics {
  // Metodo Factory
  abstract createTransport(): Transport;

  planDelivery(): void {
    // Usa il prodotto creato dal Factory Method
    const transport = this.createTransport();
    transport.deliver();
  }
}

// Creator concreto: Logistica su strada
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Truck();
  }
}

// Creator concreto: Logistica via mare
class SeaLogistics extends Logistics {
  createTransport(): Transport {
    return new Ship();
  }
}

// Esempio di utilizzo
class Main {
  static main(): void {
    // Logistica su strada
    const generalLogistics: Logistics = new RoadLogistics();

    // const seaLogistics = new SeaLogistics();
    generalLogistics.planDelivery();
  }
}

// Esecuzione del main
Main.main();
