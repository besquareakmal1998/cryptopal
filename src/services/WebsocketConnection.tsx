import React, { useEffect } from 'react';

interface WebSocketConnectionProps {
  handleData: (data: any) => void;
}

const WebSocketConnection: React.FC<WebSocketConnectionProps> = ({ handleData }) => {
  useEffect(() => {
    const apiKey = 'fda6a333ee629fa55a6d3911ec7f34981aecffa364b98731255a23e72127ac4e';
    const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);

    ccStreamer.onopen = () => {
      const subRequest = {
        action: 'SubAdd',
        subs: ['2~Coinbase~BTC~USD'],
      };
      ccStreamer.send(JSON.stringify(subRequest));
     // console.log(JSON.stringify(subRequest));
    };

   ccStreamer.onmessage = (event) => {
    let parsedJSON = JSON.parse(event.data);
    
    if(parsedJSON["PRICE"]){
      console.log(parsedJSON);
      handleData(parsedJSON);
    }

    // console.log(JSON.parse(event.data));
    // console.log("test"+Object.keys(parsedJSON));
    // console.log(event.data['4'] +'hhhhhhhhhhhh');
  // const message = event.data;

  // if (message.type !=='999') {
  //   const parsedMessage = JSON.parse(message);
  //   console.log(parsedMessage);
  //   handleData(parsedMessage); 
    
   
  // }
 
};


    ccStreamer.onclose = () => {
      console.log('WebSocket connection closed');
      // Handle connection closed event
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      ccStreamer.close();
    };
  }, [handleData]); // Add handleData as a dependency to ensure it's redefined when it changes

  return null;
};

export default WebSocketConnection;
