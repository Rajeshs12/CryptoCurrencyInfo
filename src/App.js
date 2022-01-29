import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response?.data?.coins);
      }
    );
  }, []);
  const searchResult = listOfCoins?.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return (
    <div className="App">
      <div
        className="crypto-header"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/crypto_heder.webp"
          })`,
          height: "381px",
        }}
      ></div>
      <div className="heading">
        <marquee scrollamount="20">
          Get Info About Different Crypto Currency
        </marquee>
      </div>
      <div
        className="crypto-display"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/bgImg.png"})`,
        }}
      >
        <input
          type="text"
          placeholder="search here"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        {searchResult?.map((coin) => {
          return (
            <Coin
              name={coin.name}
              price={coin.price}
              icon={coin.icon}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
