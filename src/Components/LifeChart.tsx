import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

// Line.register(CategoryScale);

interface ChartData {
    x: number;
    y: number;
  }
  
  interface SocketData {
    RAW: {
      USD: {
        PRICE: number;
      };
    };
  }
  
  const LifeChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
  
    useEffect(() => {
      const apiKey = 'fda6a333ee629fa55a6d3911ec7f34981aecffa364b98731255a23e72127ac4e';
  
      const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);
  
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      socket.onmessage = (event) => {
        const data: SocketData = JSON.parse(event.data);
        const { PRICE } = data.RAW.USD;
        
        const newData: ChartData = {
          x: new Date().getTime(),
          y: PRICE,
        };
  
        setChartData((prevData) => [...prevData, newData]);
      };
  
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      return () => {
        socket.close();
      };
    }, []);
  
    useEffect(() => {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      if (ctx) {
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.map((data) => data.x.toString()),
            datasets: [
              {
                label: 'Live Chart',
                data: chartData.map((data) => data.y),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'second',
                },
              },
            },
          },
        });
  
        return () => {
          myChart.destroy();
        };
      }
    }, [chartData]);
  
    return <canvas id="myChart" />;
  };
  
  export default LifeChart;