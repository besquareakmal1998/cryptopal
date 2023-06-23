import React from "react";
import NavBar from "../Components/Navigationbar";
import AuthDetails from "../Components/AuthDetails";
import Carousel from "../Components/Carousel";
import RealTimeChart from "../Components/Realtimechart";
import LifeChart from "../Components/LifeChart";
import WebSocketConnection from "../services/WebsocketConnection";

const Home=() => {
    return(
        <div>
            <NavBar/>

<Carousel />
         {/* <LifeChart /> */}

        </div>
    )

}

export default Home;