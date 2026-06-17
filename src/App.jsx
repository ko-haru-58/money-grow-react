import { useState } from 'react';
import './css/App.css'
import './css/Charts.css'
import Header from './components/Header';
import Footer from './components/Footer';
import SelectBox from './components/SelectBox';
import TextBox from './components/TextBox';
import Charts from './components/Charts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const amounts = [];

for (let i = 1; i <= 20; i++){
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

	// グラフデータの計算 - 年ごとの残高推移
	const lineChartData = [];
	const lineChartLabels = [];
	
	for (let y = 0; y <= year; y++) {
		const monthCount = y * 12;
		const balance = monthCount === 0 ? 0 : Math.round(amount * (((1 + mthRate) ** monthCount - 1) / mthRate));
		const principal = amount * 12 * y;
		lineChartData.push(balance);
		lineChartLabels.push(y);
	}

	return (
    	<>
			<Header />

			<main>
				<div className='calculator'>
					<div className = 'calculator-controls'>
						{ /* 積立金額 */} 
						<SelectBox
							id="amount"
							label="毎月の積立金額"
							value={amount}
							items={amounts}
							onChange={setAmount}
						/>

						{ /* 利回り */} 
						<SelectBox
							id="rate"
							label="想定利回り(年率)"
							value={rate}
							items={rates}
							onChange={setRate}
						/>

						{ /* 積立期間 */} 
						<SelectBox
							id="year"
							label="積立期間"
							value={year}
							items={years}
							onChange={setYear}
						/>
					</div>

					<div className='arrow'></div>

					<div className='calculator__result'>
						{ /* 元本 */} 
						<TextBox
							id="sumAmount"
							label="元本(A)"
							value={sumAmount}
						/>
						
						{ /* 運用収益 */} 
						<TextBox
							id="profit"
							label="運用収益(B)"
							value={profit}
						/>

						{ /* 資産額 */} 
						<TextBox
							id="result"
							label="資産額(A+B)"
							value={result}
						/>
					</div>
				</div>

				<Charts amount={amount} rate={rate} year={year} sumAmountInt={sumAmountInt} resultInt={resultInt} formatter={formatter} />
			</main>

			<Footer />
    	</>
  	)
}

export default App
