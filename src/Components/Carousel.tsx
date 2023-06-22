import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import { TopList24H } from "../services/api";
import CryptoContext, { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import 'react-alice-carousel/lib/alice-carousel.css';
import { CarouselItem } from "react-bootstrap";
import '../styles/crypto.css';

interface CoinData {
  CoinInfo: {
    Id:string;
    ImageUrl: string;
    FullName: string;
    Name:string;
  
  };

  DISPLAY:{
    USD:{
      PRICE:string;
      CHANGEPCT24HOUR:number;
      HIGH24HOUR:number;
      LOW24HOUR:number;
    }
    
  }

}

const Carousel: React.FC = () => {
  const [topList, setTopList] = useState<CoinData[]>([]);
  const { currency } = CryptoState();

  const fetchTop24HVol = async () => {
    await fetch(TopList24H(currency))
      .then((res: any) => res.json())
      .then((coin: any) => {
        const coinData = coin.Data;
        setTopList(coinData);
        console.log(topList);
      });
  };

  console.log(topList);
  useEffect(() => {
    fetchTop24HVol();
  }, [currency]);

  const items = topList.map((coin: CoinData) => {
    const id=coin.CoinInfo.Id;
    const imageUrl = coin.CoinInfo.ImageUrl;
    const fullName = coin.CoinInfo.FullName;
    const price=coin.DISPLAY.USD.PRICE;
    const changepct=coin.DISPLAY.USD.CHANGEPCT24HOUR;
    const highhour=coin.DISPLAY.USD.HIGH24HOUR;
    const lowhour=coin.DISPLAY.USD.LOW24HOUR;

    return (
      <Link className="carouselItem" to={``}>
        <div className="cardcrypto">
          <div className="containercrypto">
            <div className="cloud front">
              <span className="left-front"></span>
              <span className="right-front"></span>
            </div>
            <span className="sun sunshine"></span>
            <span className="sun">
              <img
                src={`https://www.cryptocompare.com${imageUrl}`}
                alt={fullName}
                height="200"
                style={{ marginBottom: 20 }}
              />
            </span>
            <div className="cloud back">
              <span className="left-back"></span>
              <span className="right-back"></span>
            </div>
          </div>

          <div className="cardcrypto-header">
           <p>Current price:{price}</p>
            <span>High 24 Hour:{highhour}</span>
            <span>Low 24 Hour:{lowhour}</span>
          </div>

          <span className="temp">{fullName}</span>

          <div className="temp-scale">
            <span>{changepct}</span>
          </div>
        </div>

        <h1>{fullName}</h1>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    }
  };

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
      <button onClick={fetchTop24HVol}></button>
    </div>
  );
};

export default Carousel;
