
function ParseCsvToList(csvData) {
    const filas = csvData.split('\n');
    const columnas = filas[0].split(',');
  
    const lista = [];
  
    for (let i = 1; i < filas.length; i++) {
      const fila = filas[i].split(',');
      const objeto = {};
  
      for (let j = 0; j < columnas.length; j++) {
        const clave = columnas[j];
        const valor = fila[j];
        objeto[clave] = valor;
      }
  
      lista.push(objeto);
    }
  
    return lista;
  }
  module.exports = {
    ParseCsvToList
  }