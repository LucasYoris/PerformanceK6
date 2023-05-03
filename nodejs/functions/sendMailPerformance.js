const fs = require('fs');
const SummaryK6 = require('../models/summary');
const mail = require('../utils/mail');
const {ParseCsvToList} = require('../utils/csv');
const commons = require('../utils/commons');
const html = require('../utils/templateHtml');
const config = require('../../framework/utils/properties');


const buildNumber = process.argv[2];
const urlGrafana=`http://${config.grafana.ip}:${config.grafana.port}`


function sendPerformanceResultsMail() {
  const csvData = fs.readFileSync(`../../results/Build${buildNumber}.csv`, 'utf8');
  const listaObjetos = ParseCsvToList(csvData);

  const [minTimeExecution, maxTimeExecution] = obtenerTiempoInicioFinalizacion(listaObjetos);

  let urlResultsGrafana = urlGrafana+`/d/Reasd/bh-performance?orgId=1&var-Measurement=http_req_duration&var-URL=All&var-TagID=Build${buildNumber}&from=${minTimeExecution}&to=${maxTimeExecution}`

  const listUrls = commons.obtenerValoresUnicos(listaObjetos, 'url');
  const listSummary = listUrls.map(url => generarReporte(url, listaObjetos));

  mail.enviarMail(html.resultsPerformanceToHTML(listSummary,urlResultsGrafana,buildNumber), function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}

function obtenerTiempoInicioFinalizacion(lista){
  let listTime = commons.filtrarPorMetrica(lista, 'http_req_duration');
  const metricValues = commons.extraerValoresNumericos(listTime, 'timestamp');
  let minTimeExecution = Math.min(...metricValues) * 1000
  let maxTimeExecution = Math.max(...metricValues) * 1000
  const date = new Date(maxTimeExecution);
  maxTimeExecution = date.getTime() + 8000;
  return [minTimeExecution, maxTimeExecution];
}

function generarReporte(url, listaObjetos) {
  const listaDuration = commons.filtrarPorMetricaYUrl(listaObjetos, 'http_req_duration', url);
  const listaExitosos = commons.filtrarExitosos(listaDuration);
  const listaTiempoEnvio = commons.filtrarPorMetricaYUrl(listaObjetos, 'http_req_sending', url);
  const metricValues = commons.extraerValoresNumericos(listaDuration, 'metric_value');
  const metricTime = commons.extraerValoresNumericos(listaTiempoEnvio, 'timestamp');

  const transaccionPorSegundo = commons.calcularSolicitudesPorSegundo(listaTiempoEnvio);
  const min = commons.formatTime(Math.min(...metricValues));
  const max = commons.formatTime(Math.max(...metricValues));
  const avg = commons.formatTime(commons.promedio(listaDuration, 'metric_value'));
  const totalRequest = listaDuration.length;
  const totalRequestExitoso = listaExitosos.length;
  const totalRequestFallidos = totalRequest - totalRequestExitoso;
  const tiempoInicio = commons.formatearTimestamp(Math.min(...metricTime));
  const tiempoFinalizacion = commons.formatearTimestamp(Math.max(...metricTime));
  const TiempoTranscurrido = commons.calcularTiempoTranscurrido(Math.min(...metricTime), Math.max(...metricTime));

  return new SummaryK6(
    url,
    min,
    max,
    avg,
    totalRequest,
    totalRequestExitoso,
    totalRequestFallidos,
    transaccionPorSegundo,
    tiempoInicio,
    tiempoFinalizacion,
    TiempoTranscurrido
  );
}

sendPerformanceResultsMail();