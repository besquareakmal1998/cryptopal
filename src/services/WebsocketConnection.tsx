import React, { useEffect } from 'react';

const WebSocketConnection: React.FC = () => {
  useEffect(() => {
    const apiKey = 'fda6a333ee629fa55a6d3911ec7f34981aecffa364b98731255a23e72127ac4e';
    const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);

    ccStreamer.onopen = () => {
      const subRequest = {
        action: 'SubAdd',
        subs: ['2~Coinbase~BTC~USD'],
      };
      ccStreamer.send(JSON.stringify(subRequest));
      console.log(JSON.stringify(subRequest));
    };

    ccStreamer.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Hiiiiiiiiiiiiii"+ event.data);
      console.log(message)
      // Pass the received message to the parent component or store it in state for further processing
      // You can use a callback function or a state management library to handle the data
    };

    ccStreamer.onclose = () => {
      console.log('WebSocket connection closed');
      // Handle connection closed event
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      ccStreamer.close();
    };
  }, []);

  return null;
};

export default WebSocketConnection;