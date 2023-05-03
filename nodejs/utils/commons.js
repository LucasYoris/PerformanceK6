
function calcularTiempoTranscurrido(timestampMin, timestampMax) {
    const segundosTranscurridos = timestampMax - timestampMin;
    const horas = Math.floor(segundosTranscurridos / 3600);
    const minutos = Math.floor((segundosTranscurridos % 3600) / 60);
    const segundos = segundosTranscurridos % 60;
    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');
    const segundosStr = segundos.toString().padStart(2, '0');
    return `${horasStr}h:${minutosStr}m:${segundosStr}s`;
  }
  
  function formatearTimestamp(timestampSegundos) {
    const fecha = new Date(timestampSegundos * 1000);
  
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
  
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
  
    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
  }
  
  function filtrarPorMetricaYUrl(objetos, metrica, url) {
    return objetos.filter(objeto => objeto.metric_name === metrica && objeto.url === url);
  }
  
  function filtrarPorMetrica(objetos, metrica, url) {
    if (url) {
      return objetos.filter(objeto => objeto.metric_name === metrica && objeto.url === url);
    } else {
      return objetos.filter(objeto => objeto.metric_name === metrica);
    }
  }
  
  function filtrarExitosos(objetos) {
    return objetos.filter(objeto => objeto.status < 400 && objeto.status >=200);
  }
  
  function extraerValoresNumericos(listaObjetos, columna) {
    return listaObjetos.map(item => parseFloat(item[columna]));
  }

  function calcularSolicitudesPorSegundo(lista) {
    const contador = {};
    lista.forEach((item) => {
      const second = Math.floor(parseInt(item.timestamp, 10));
      contador[second] = (contador[second] || 0) + 1;
    });
  
    const totalTime = Object.keys(contador).length;
    const totalRequests = Object.values(contador).reduce((acc, count) => acc + count, 0);
    const requestsPerSecond = totalRequests / totalTime;
  
    return `${requestsPerSecond.toFixed(2)} trans/seg`;
  }
  
  function promedio(lista, columna) {
    const valores = lista
      .filter((item) => item[columna] !== null && item[columna] !== '' && item[columna] !== undefined)
      .map((item) => parseFloat(item[columna]));
  
    if (valores.length === 0) {
      return 0;
    }
  
    const total = valores.reduce((acc, value) => acc + value, 0);
    return total / valores.length;
  }
  
  function obtenerValoresUnicos(lista, columna) {
    const uniqueData = new Set();
    lista.forEach((item) => {
      if (item[columna] !== null && item[columna] !== '' && item[columna] !== undefined) {
        uniqueData.add(item[columna]);
      }
    });
  
    return Array.from(uniqueData);
  }
  
  function formatTime(tiempo) {
    const tiempoMs = parseFloat(tiempo);
    const tiempoString = tiempoMs >= 1000
      ? `${(tiempoMs / 1000).toLocaleString()} seg`
      : `${tiempoMs.toLocaleString()} ms`;
  
    return tiempoString;
  }
  module.exports = {
    calcularTiempoTranscurrido,
    formatearTimestamp,
    filtrarPorMetricaYUrl,
    filtrarPorMetrica,
    filtrarExitosos,
    extraerValoresNumericos,
    calcularSolicitudesPorSegundo,
    promedio,
    obtenerValoresUnicos,
    formatTime
  };
  