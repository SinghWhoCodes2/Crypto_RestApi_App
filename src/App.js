
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=20&page=1&sparkline=false').then((res) => {
      console.log(res);
      setCoins(res.data);
    }).catch((err) => {
      console.log(err);
    })
  })

  const handleChange = e => {
    setSearch(e.target.value);
  }


  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className='coin-search'>

        <h1 className='coin-text'>
          Search a Crypto Coin
        </h1>
        <form>
          <input type="text" placeholder='Search' onChange={handleChange} className='coin-input' />
        </form>
      </div>

      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}

          />

        )
      })}

      {/* https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=20&page=1&sparkline=false*/}

    </div>
  );
}

export default App;
