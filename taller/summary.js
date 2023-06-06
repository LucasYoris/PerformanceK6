class SummaryK6 {
    constructor(url, min, max, avg,totalRequest,requestExitosos,requestFallidos,transaccionesPorSegundos,
        tiempoInicio,tiempoFin,tiempoEjecutado) {
      this.url = url;
      this.min = min;
      this.max = max;
      this.avg = avg;
      this.totalRequest=totalRequest;
      this.requestFallidos=requestFallidos;
      this.requestExitosos=requestExitosos;
      this.transaccionesPorSegundos=transaccionesPorSegundos;
      this.tiempoInicio=tiempoInicio;
      this.tiempoFin=tiempoFin;
      this.tiempoEjecutado=tiempoEjecutado;
    }
  }
  
  module.exports = SummaryK6;