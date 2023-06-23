import React from "react";
import NavBar from "../Components/Navigationbar";
import RealTimeChart from "../Components/Realtimechart";
import WebSocketConnection from "../services/WebsocketConnection";
const Features=() => {
    return(
        <div>
             <NavBar />
             <h1>Market</h1>
             <RealTimeChart />
            
        </div>
    )

}

export default Features;