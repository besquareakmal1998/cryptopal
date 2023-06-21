import React, { useState,useEffect } from "react";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import { TopList24H } from "../services/api";
import CryptoContext, { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { response } from "express";
import { Link } from "react-router-dom";
import 'react-alice-carousel/lib/alice-carousel.css';
import { CarouselItem } from "react-bootstrap";



const Carousel: React.FC = () => {
  const [topList, setTopList] = useState([]);
  const {currency}= CryptoState();

  const fetchTop24HVol = async () => {
   await fetch(TopList24H(currency)).then((res:any)=>res.json()).then(coin=>{
   const coinData= coin.Data;

    setTopList(coinData);
    console.log(topList);
   })
  };

  console.log(topList)
  useEffect(() => {
    fetchTop24HVol();
   
  }, [currency]);

  const items=topList.map((coin:any)=>{
    const imageUrl= coin.CoinInfo.ImageUrl;
    const fullName=coin.CoinInfo.FullName
    return(
        <Link className="carouselItem"  to={``}>
         <img src={`https://www.cryptocompare.com${imageUrl}`} alt={fullName}
        height="80"
        style={{marginBottom:10}}
        />
        

        </Link>
       
    )
  })
  const responsive={
    0:{
        items:2,
    },

    512:{
        items:4,
    }
  }

  return (
    <div className="carousel">
      <AliceCarousel 
         mouseTracking
         infinite
         autoPlayInterval={1000}
         animationDuration={1500}
         disableDotsControls
         disableButtonsControls
         responsive={responsive}
         items={items}
      />
      <button onClick={fetchTop24HVol}> </button>
    </div>
  );
};

export default Carousel;
