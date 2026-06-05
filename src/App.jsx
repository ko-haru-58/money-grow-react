import { useState } from 'react';
import './css/App.css'
import SelectBox from './components/SelectBox';
import TextBox from './components/TextBox';

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
	const [amount, setAmount] = useState(30000); // 初期値3万円
	const [rate, setRate] = useState(0.03); // 初期値3%（年利）
	const [year, setYear] = useState(20); // 初期値20年

	// 日本円での表示に変換するためのオブジェクト
	const formatter = new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY'
	});
  
	// 元本の計算
	const sumAmountInt = amount * year * 12
	const sumAmount = formatter.format(sumAmountInt);

	// 運用成績の計算
	const mthRate = rate / 12;  //月利
	const month = year * 12;
	const resultInt = Math.round(amount * (((1 + mthRate) ** month - 1) / mthRate));
	const result = formatter.format(resultInt);

	// 運用益の計算
	const profit = formatter.format(resultInt - sumAmountInt);

	return (
    	<>
			<div className = "main-wrapper">
				<div className = "input-container">
					{ /* 積立金額 */} 
					<div className="amount">
						<SelectBox
							id="amount"
							label="積立金額"
							value={amount}
							items={amounts}
							onChange={setAmount}
						/>
					</div>

					{ /* 利回り */} 
					<div className="rate">
						<SelectBox
							id="rate"
							label="利回り"
							value={rate}
							items={rates}
							onChange={setRate}
						/>
					</div>

					{ /* 積立期間 */} 
					<div className="year">
						<SelectBox
							id="year"
							label="積立期間"
							value={year}
							items={years}
							onChange={setYear}
						/>
					</div>
				</div>

				<div className = "output-container">
				
					{ /* 元本 */} 
					<div className="sumAmount">
						<TextBox
							id="sumAmount"
							label="積立元本"
							value={sumAmount}
						/>
					</div>

						{ /* 運用成績 */} 
						<div className="result">
							<TextBox
								id="result"
								label="運用成績"
								value={result}
							/>
						</div>

					{ /* 運用益 */} 
					<div className="profit">
						<TextBox
							id="profit"
							label="運用益"
							value={profit}
						/>
					</div>
				</div>
			</div>
    	</>
  	)
}

export default App
