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

  // Assign color based on index
  for (const i in dataArray) {
    dataArray[i].color = 'red' // default
    if (i == 0) dataArray[i].color = 'red'
    if (i == 1) dataArray[i].color = 'orange'
    if (i == 2) dataArray[i].color = 'yellow'
  }

  // Prepare chart config
  const cfg = {
    type: 'bar',
    data: {
      labels: dataArray.map(d => d.label.toUpperCase()),
      datasets: [{
        data: dataArray.map(d => d.value),
        backgroundColor: dataArray.map(d => d.color), // bar colors
        barPercentage: 1, // (size of the bar)
        categoryPercentage: 0.8, // (less = more space between bars)
      }]
    },
    options: {
      indexAxis: 'y', // horizontal bars
      layout: {
        padding: 0
      },
      scales: {
        x: { // number below
          display: false, // hide it
          beginAtZero: true,
          max: 800, // max value
          // ticks: {
          //   color: '#fff',
          //   font: {
          //     size: 16
          //   }
          // }
        },
        y: { // text on the left
          ticks: {
            // return color
            color: function (context) {
              return dataArray[context.index]?.color || '#fff';
            },
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
          formatter: function (value, context) {
            const index = context.dataIndex;
            // index 2 is states.cool
            if (index === 2) {
              const percent = Math.max(1, parseFloat(((value / 100) * 100).toFixed(2)));
              return `${value}  (${percent}%)`;
            }
            return value;
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  }

  new Chart(canvas, cfg);
}