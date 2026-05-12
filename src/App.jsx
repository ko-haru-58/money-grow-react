import { useState } from 'react';
import './css/App.css'
import Amount from './components/Amount';
import Year from './components/Year';
import Rate from './components/Rate';

const amounts = [];

for (let i = 1; i <= 10; i++){
  amounts.push(i);
}

const rates = [];

for (let i = 1; i <= 20; i++){
  rates.push(i);
}

const years = [];

for (let i = 1; i <= 50; i++){
  years.push(i);
}

function App() {
  
  return (
    <>
      <div className="amount">
        <Amount
          amounts={amounts}
        />
      </div>
      <div className="rate">
        <Rate
          rates={rates}
        />
      </div>

      <div className="year">
        <Year
          years={years}
        />
      </div>
    </>
  )
}

export default App
