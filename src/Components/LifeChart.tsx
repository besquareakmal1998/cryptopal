import React, { useEffect, useState } from 'react';
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

const LifeChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>({
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
    });
  
    useEffect(() => {
      const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2');
  
      ccStreamer.onopen = () => {
        const subRequest = {
          action: 'SubAdd',
          subs: ['2~Coinbase~BTC~USD'],
        };
        ccStreamer.send(JSON.stringify(subRequest));
      };
  
      ccStreamer.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.TYPE === '2' && message.MARKET === 'Coinbase' && message.FROMSYMBOL === 'BTC' && message.TOSYMBOL === 'USD') {
          const time = new Date(message.LASTUPDATE * 1000).toLocaleTimeString();
          const price = message.PRICE;
  
          setChartData((prevData: any) => ({
            ...prevData,
            labels: [...prevData.labels, time],
            datasets: [
              {
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data, price],
              },
            ],
          }));
        }
      };
  
      ccStreamer.onclose = () => {
        console.log('WebSocket connection closed');
        // Handle connection closed event
      };
  
      return () => {
        ccStreamer.close();
      };
    }, []);
  
    return (
      <div>
        <Line data={chartData} />
      </div>
    );
  };
  
  export default LifeChart;
  