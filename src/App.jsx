import { useState } from 'react';
import './css/App.css'
import SelectBox from './components/SelectBox';

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

const App = () => {
  const [amount, setAmount] = useState(10000); // 初期値1万円
  const [rate, setRate] = useState(0.01); // 初期値1%
  const [year, setYear] = useState(1); // 初期値1年
  
  return (
    <>
      <div className="amount">
        <SelectBox
          id="amount"
          label="積立金額"
          value={amount}
          items={amounts}
          onChange={setAmount}
        />
      </div>
      <div className="rate">
        <SelectBox
          id="rate"
          label="利回り"
          value={rate}
          items={rates}
          onChange={setRate}
        />
      </div>

      <div className="year">
        <SelectBox
          id="year"
          label="積立期間"
          value={year}
          items={years}
          onChange={setYear}
        />
      </div>
    </>
  )
}

export default App
