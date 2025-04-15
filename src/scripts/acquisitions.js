import Chart from 'chart.js/auto'
import { getAquisitionsByYear } from './api'

(async function() {
  const data = await getAquisitionsByYear();

  new Chart(
    document.getElementById('acquisitionsChart'),
    {
      type: 'bar',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            enabled: false,
            titleColor: '#fff', // Tooltip-Titel in weiß
            bodyColor: '#fff',  // Tooltip-Text in weiß
            // Optional: Tooltip-Rahmen, falls benötigt:
            borderColor: '#fff',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();