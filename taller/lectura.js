const fs = require('fs');
const SummaryK6 = require('./summary')

const csvData = fs.readFileSync(`../results/test_results.csv`, 'utf8');

let listCsv = ParseCsvToList(csvData);

let listDuration = listCsv.filter(objeto => objeto.metric_name === 'http_req_duration');

let listUrl = obtenerValoresUnicos(listDuration, 'url');
/// Armar la lista ///

let listSummary=listUrl.map(url=>generarReporte(url,listDuration))



function generarReporte(url,lista){
    console.log('URL = '+url);
}

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

function obtenerValoresUnicos(lista, columna) {
    const uniqueData = new Set();
    lista.forEach((item) => {
        if (item[columna] !== null && item[columna] !== '' && item[columna] !== undefined) {
            uniqueData.add(item[columna]);
        }
    });
    return Array.from(uniqueData);
}