import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';

const LiveChart: React.FC = () => {
  const chartRef = useRef<any>();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Live Price',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  });
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    const wsInstance = new WebSocket('wss://streamer.cryptocompare.com/v2');

    wsInstance.onopen = () => {
      // Subscribe to the desired cryptocurrency symbol
      wsInstance.send(
        JSON.stringify({
          action: 'SubAdd',
          subs: ['5~CCCAGG~BTC~USD'], // Replace with the desired symbol (e.g., BTC-USD)
        })
      );
    };

    wsInstance.onmessage = (message) => {
      const response = JSON.parse(message.data);
      const { FROMSYMBOL, PRICE } = response;

      // Update the chart with the new data
      setChartData((prevData: any) => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, PRICE],
          },
        ],
      }));
    };

    setWs(wsInstance);

    // Clean up the WebSocket connection on unmount
    return () => {
      wsInstance.close();
    };
  }, []);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options as any} />
    </div>
  );
};

export default LiveChart;
