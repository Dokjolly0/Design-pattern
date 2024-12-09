// Interfaccia comune per i prodotti
interface TransportExample {
  deliver(): void;
  getCost(): number; // Metodo aggiunto
}

// Implementazione concreta: Camion
class TruckExample implements TransportExample {
  deliver(): void {
    console.log("Consegna su strada con un camion.");
  }

  getCost(): number {
    return 50; // Costo fisso per il trasporto su strada
  }
}

// Implementazione concreta: Nave
class ShipExample implements TransportExample {
  deliver(): void {
    console.log("Consegna via mare con una nave.");
  }

  getCost(): number {
    return 200; // Costo fisso per il trasporto via mare
  }
}

// Creator astratto
abstract class LogisticsExample {
  // Metodo Factory
  abstract createTransport(): TransportExample;

  planDelivery(): void {
    // Usa il prodotto creato dal Factory Method
    const transport = this.createTransport();
    transport.deliver();
    console.log(`Costo della consegna: ${transport.getCost()} EUR`);
  }
}

// Creator concreto: Logistica su strada
class RoadLogisticsExample extends LogisticsExample {
  createTransport(): TransportExample {
    return new TruckExample();
  }
}

// Creator concreto: Logistica via mare
class SeaLogisticsExample extends LogisticsExample {
  createTransport(): TransportExample {
    return new ShipExample();
  }
}

// Esempio di utilizzo
class MainExample {
  static main(): void {
    // Logistica su strada
    const roadLogistics = new RoadLogisticsExample();
    roadLogistics.planDelivery();

    // Logistica via mare
    const seaLogistics = new SeaLogisticsExample();
    seaLogistics.planDelivery();
  }
}

// Esecuzione del main
MainExample.main();
