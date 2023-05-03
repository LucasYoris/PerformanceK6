function resultsPerformanceToHTML(summaryK6List,urlResults,buildNumber) {
    let filas = summaryK6List.map(summary => {
        let porcentajeExitosos = (summary.requestExitosos / summary.totalRequest) * 100;
        let porcentajeFallidos = 100 - porcentajeExitosos;
    
        return `
          <tr>
            <td style="color: black;">${summary.url}</td>
            <td style="color: black;">${summary.min}</td>
            <td style="color: black;">${summary.max}</td>
            <td style="color: black;">${summary.avg}</td>
            <td style="color: black;">${summary.totalRequest}</td>
            <td style="color: black;">${summary.requestFallidos}</td>
            <td style="color: black;">${summary.requestExitosos}</td>
            <td style="color: black;">${summary.transaccionesPorSegundos}</td>
            <td style="color: black;">${summary.tiempoInicio}</td>
            <td style="color: black;">${summary.tiempoFin}</td>
            <td style="color: black;">${summary.tiempoEjecutado}</td>
            <td style="color: black; text-align: center;">
              <div style="display: flex; width: 100%; height: 25px; background-color: #f8f9fa;">
                <div style="background-color: #28a745; width: ${porcentajeExitosos}%; position: relative;">
                  <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; color: white; text-align: center; font-size: 9px;">${porcentajeExitosos.toFixed(1)}%</span>
                </div>
                <div style="background-color: #F44336; width: ${porcentajeFallidos}%; position: relative;">
                  <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; color: white; text-align: center; font-size: 9px;">${porcentajeFallidos.toFixed(1)}%</span>
                </div>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    
      const totalExitosos = summaryK6List.reduce((acc, summary) => acc + summary.requestExitosos, 0);
      const totalFallidos = summaryK6List.reduce((acc, summary) => acc + summary.requestFallidos, 0);
      const totalSolicitudes = totalExitosos + totalFallidos;
      const porcentajeExitososGeneral = (totalExitosos / totalSolicitudes) * 100;
      const porcentajeFallidosGeneral = 100 - porcentajeExitososGeneral;
      const barraPorcentajeGeneral = `
      <h2 style="color: black;">Porcentaje General de Éxitos y Fallidos</h2>
      <div style="width: 100%; text-align: left">
      <tr>
          <td><span style="font-weight: bold; color: #080808de;">Total Requests: </span></td>
          <td><h1>${totalSolicitudes}</h1></td>
          <td><span style="font-weight: bold; color: #080808de;">Requests Exitosos: </span></td>
          <td><h1 style="font-weight: normal;">${totalExitosos}</h1></td>
          <td><span style="font-weight: bold; color: #080808de;">Requests Fallidos: </span></td>
          <td><h1 style="color:#ff1900; font-weight: normal;">${totalFallidos}</h1></td>
      </tr>
      </div>
      <div style="display: flex; width: 100%; height: 25px; background-color: #f8f9fa; text-align: center; padding-bottom: 2%;">
        <div style="background-color: #28a745; width: ${porcentajeExitososGeneral}%; position: relative;">
          <span style="position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); color: white; text-align: center; font-size: 15px;">${porcentajeExitososGeneral.toFixed(1)}%</span>
        </div>
        <div style="background-color: #F44336; width: ${porcentajeFallidosGeneral}%; position: relative;">
          <span style="position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); color: white; text-align: center; font-size: 15px;">${porcentajeFallidosGeneral.toFixed(1)}%</span>
        </div>
      </div>
    `;

    const urlHtml= `
    <div style="width: 100%; text-align: left; padding-top: 1%;">
    <hr class="linea-horizontal">
    <div style="padding-bottom: 1%;">
      <span style="font-weight: bold; color: #080808de;">URL Resultados:</span> <a href="${urlResults}" target="_blank">Hace clic en este enlace para ver los resultados de la prueba</a>
    </div>
    <hr class="linea-horizontal">
    </div>
  `;
    
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th {
              background-color: #007bff;
              color: white;
              padding: 8px;
              text-align: center;
              border: 1px solid #ddd;
            }
            td {
              padding: 8px;
              text-align: left;
              border: 1px solid #ddd;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            .linea-horizontal {
              height: 2px;
              border-width: 0;
              border-top-width: 2px;
              border-style: solid;
              border-color: #0a0a0a;
              margin-top: 0;
              margin-bottom: 1em;
            }
          </style>
        </head>
        <body>
          <h1 style="color: black;">Resultados Pruebas de Performance Build#00${buildNumber}</h1>
        ${urlHtml}
        ${barraPorcentajeGeneral}
    
          
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Total Request</th>
                <th>Request Fallidos</th>
                <th>Request Exitosos</th>
                <th>Transacciones Por Segundos</th>
                <th>Tiempo Inicio</th>
                <th>Tiempo Fin</th>
                <th>Tiempo Ejecutado</th>
                <th>Porcentaje de Éxitos</th>
              </tr>
            </thead>
            <tbody>
              ${filas}
            </tbody>
          </table>
        </body>
        </html>
      `;
}

module.exports = {
    resultsPerformanceToHTML
  };
  