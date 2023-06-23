import React, { useEffect, useRef, useState } from 'react';
import WebSocketConnection from '../services/WebsocketConnection';
import { Chart, ChartData } from 'chart.js/auto';


const RealTimeChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  const handleData = (data: any) => {
    if (chart && chart.data.labels) {
      const time = new Date().toLocaleTimeString();
      const price = data.PRICE;

      chart.data.labels.push(time);
      chart.data.datasets[0].data.push(price);

      if (chart.data.labels.length > 50) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }

      chart.update();
    }
  };

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
  
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
            data: [],
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
      },
    });
  
    setChart(newChart);
  
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [chart]);
  

  return (
    <div>
      <WebSocketConnection />
       <canvas ref={chartRef} /> 
    </div>
  );
};

export default RealTimeChart;
