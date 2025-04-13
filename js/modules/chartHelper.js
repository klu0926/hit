// using chart.js from CDN (in index.html)

// dataArray
// [
// {
//   label : String
//   value : Number
//   max : Number
// },
//]

Chart.register(ChartDataLabels);

export function renderChart(container, dataArray) {
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  console.log('dataArray:', dataArray)

  // Prepare chart config
  const cfg = {
    type: 'bar',
    data: {
      labels: dataArray.map(d => d.label.toUpperCase()),
      datasets: [{
        data: dataArray.map(d => d.value),
        // Bar color
        backgroundColor: 'rgb(246, 26, 66)',
        barThickness: 24,
      }]
    },
    options: {
      indexAxis: 'y', // horizontal bars
      layout: {
        padding: 0
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: '#fff', // X-axis text color
            font: {
              size: 16
            }
          }
        },
        y: {
          ticks: {
            color: '#fff', // Y-axis text color
            font: {
              size: 16
            }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          anchor: 'end',
          align: 'right',
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold'
          },
          formatter: (val) => val
        }
      }
    },
    plugins: [ChartDataLabels]
  }

  new Chart(canvas, cfg);
}