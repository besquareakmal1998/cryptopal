import React, { useEffect, useRef, useState } from 'react';
import WebSocketConnection from '../services/WebsocketConnection';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-zoom';

interface ChartData {
  time: EpochTimeStamp,
  price: number,
}

const RealTimeChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [chartData, setChartData] =useState<ChartData[]>([]);

  const handleData = (data: any) => {
    if (chart && chart.data.labels) {
      const time = Date.now();
      const price = data.PRICE;

      setChartData([...chartData, {time: time, price: price}])
  
      // chart.data.labels.push(time);
      // chart.data.datasets[0].data.push(price);

  
      if (chartData.length > 50) {
        chartData.shift();
      }
  
      chart.update(); // Add this line to update the chart
    }
  };
  

  useEffect(() => {
    const chartRefCurrent = chartRef.current;
    if (!chartRefCurrent) return;

    const ctx = chartRefCurrent.getContext('2d');
    if (!ctx) return;

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: 
            // [{x:1,y:1}, {x:1,y:1}],
            chartData.map((data) => ({
              x: data.time,
              y: data.price
            })),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            type: 'time',
            time: {
              parser: 'HH:mm',
              tooltipFormat: 'HH:mm',
              unit: 'minute',
             
              displayFormats: {
                minute: 'HH:mm',
              },
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price',
            },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
            pan: {
              enabled: true,
              mode: 'xy',
            },
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <WebSocketConnection handleData={handleData}/>
      <canvas
        ref={chartRef}
        style={{ height: '500px', width: '80%' }} // Apply CSS styles to set the height and width
      />
    </div>
  );
};

export default RealTimeChart;
