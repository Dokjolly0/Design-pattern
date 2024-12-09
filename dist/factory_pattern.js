"use strict";
// Implementazione concreta: Camion
class Truck {
    deliver() {
        console.log("Consegna su strada con un camion.");
    }
}
// Implementazione concreta: Nave
class Ship {
    deliver() {
        console.log("Consegna via mare con una nave.");
    }
}
// Creator astratto
class Logistics {
    planDelivery() {
        // Usa il prodotto creato dal Factory Method
        const transport = this.createTransport();
        transport.deliver();
    }
}
// Creator concreto: Logistica su strada
class RoadLogistics extends Logistics {
    createTransport() {
        return new Truck();
    }
}
// Creator concreto: Logistica via mare
class SeaLogistics extends Logistics {
    createTransport() {
        return new Ship();
    }
}
// Esempio di utilizzo
class Main {
    static main() {
        // Logistica su strada
        const generalLogistics = new RoadLogistics();
        // const seaLogistics = new SeaLogistics();
        generalLogistics.planDelivery();
    }
}
// Esecuzione del main
Main.main();
//# sourceMappingURL=factory_pattern.js.map