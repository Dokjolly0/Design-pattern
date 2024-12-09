"use strict";
// Implementazione concreta: Camion
class TruckExample {
    deliver() {
        console.log("Consegna su strada con un camion.");
    }
    getCost() {
        return 50; // Costo fisso per il trasporto su strada
    }
}
// Implementazione concreta: Nave
class ShipExample {
    deliver() {
        console.log("Consegna via mare con una nave.");
    }
    getCost() {
        return 200; // Costo fisso per il trasporto via mare
    }
}
// Creator astratto
class LogisticsExample {
    planDelivery() {
        // Usa il prodotto creato dal Factory Method
        const transport = this.createTransport();
        transport.deliver();
        console.log(`Costo della consegna: ${transport.getCost()} EUR`);
    }
}
// Creator concreto: Logistica su strada
class RoadLogisticsExample extends LogisticsExample {
    createTransport() {
        return new TruckExample();
    }
}
// Creator concreto: Logistica via mare
class SeaLogisticsExample extends LogisticsExample {
    createTransport() {
        return new ShipExample();
    }
}
// Esempio di utilizzo
class MainExample {
    static main() {
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
//# sourceMappingURL=factory_pattern_example_add.js.map