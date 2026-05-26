import { useState } from 'react';
import './css/App.css'
import Amount from './components/Amount';
import Year from './components/Year';
import Rate from './components/Rate';

const amounts = [];

for (let i = 1; i <= 10; i++){
  amounts.push({
    value: 10000 * i,
    label: `${i}万円`,
  });
}

const rates = [];

for (let i = 1; i <= 20; i++){
  rates.push({
	  value: 0.01 * i,
	  label: `${i}%`,
  });
}

const years = [];

for (let i = 1; i <= 50; i++){
  years.push({
	  value: i,
	  label: `${i}年`,
  });
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
