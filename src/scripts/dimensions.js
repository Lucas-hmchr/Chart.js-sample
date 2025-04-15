import Chart from 'chart.js/auto'
import { getDimensions } from './api'

(async function() {
  const data = await getDimensions();

  const chartAreaBorder = {
    id: 'chartAreaBorder',

    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { left, top, width, height } } = chart;

      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    }
  };

  new Chart(
    document.getElementById('dimensionsChart'),
    {
      type: 'bubble',
      options: {
        aspectRatio: 1,
        scales: {
            x: {
                max: 500
            },
            y: {
                max: 500
            }
        },
        
        plugins: {
            legend: {
              display: true,
              labels: {
                color: '#fff'
              }
            },
        },
        tooltip: {
          enabled: false,
          titleColor: '#fff', // Tooltip-Titel in weiß
          bodyColor: '#fff',  // Tooltip-Text in weiß
          // Optional: Tooltip-Rahmen, falls benötigt:
          borderColor: '#fff',
          borderWidth: 1
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
        labels: data.map(x => x.year),
        datasets: [
            {
              label: 'width = height',
              data: data
                .filter(row => row.width === row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            },
            {
              label: 'width > height',
              data: data
                .filter(row => row.width > row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            },
            {
              label: 'width < height',
              data: data
                .filter(row => row.width < row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            }
          ]
      }
    }
  );
})();