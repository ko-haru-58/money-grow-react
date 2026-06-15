import { useState } from 'react';
import './css/App.css'
import './css/charts.css'
import Header from './components/Header';
import SelectBox from './components/SelectBox';
import TextBox from './components/TextBox';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

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

	const principalData = [];
	for (let y = 0; y <= year; y++) {
		principalData.push(amount * 12 * y);
	}

	// 円グラフデータ - 最終的な元本と運用益
	const pieChartData = [sumAmountInt, resultInt - sumAmountInt];
	const pieChartLabels = ['元本', '運用益'];

	const COLORS = ['#8884d8', '#82ca9d'];

	// Line Chart設定
	const lineChartConfig = {
		labels: lineChartLabels,
		datasets: [
			{
				label: '残高',
				data: lineChartData,
				borderColor: '#8884d8',
				backgroundColor: 'rgba(136, 132, 216, 0.1)',
				tension: 0.1
			},
			{
				label: '元本',
				data: principalData,
				borderColor: '#82ca9d',
				backgroundColor: 'rgba(130, 202, 157, 0.1)',
				tension: 0.1
			}
		]
	};

	// Bar Chart設定 - 積み上げ棒グラフ
	const barChartConfig = {
		labels: ['元本+運用益'],
		datasets: [
			{
				label: '元本',
				data: [sumAmountInt],
				backgroundColor: '#8884d8',
				borderColor: '#fff',
				borderWidth: 1
			},
			{
				label: '運用益',
				data: [resultInt - sumAmountInt],
				backgroundColor: '#82ca9d',
				borderColor: '#fff',
				borderWidth: 1
			}
		]
	};

	return (
    	<>
			{ /* ヘッダー */} 
			<Header />

			<main>
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

					<div className = "output-wrapper">
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

						<div className="charts-container">
							{ /* 折れ線グラフ */ }
							<div className="chart line-chart">
								<h3>残高推移</h3>
								<Line data={lineChartConfig} options={{
									responsive: true,
									plugins: {
										legend: {
											position: 'top',
											labels: {
												usePointStyle: true,
												pointStyle: 'line',
												pointStyleWidth: 30
											},
										},
										title: {
											display: false
										}
									},
									scales: {
										y: {
											title: {
												display: true,
												text: '金額（円）'
											},
											ticks: {
												callback: function(value) {
													return `${(value / 10000).toLocaleString('ja-JP')}万円`;
												}
											},
										},
										x: {
											title: {
												display: true,
												text: '年'
											}
										}
									}
								}} />
							</div>

							{ /* 円グラフ */ }
							<div className="chart bar-chart">
								<h3>最終結果（元本と運用益）</h3>
								<Bar data={barChartConfig} options={{
									responsive: true,
									plugins: {
										legend: {
											position: 'top'
										},
										tooltip: {
											callbacks: {
												label: function(context) {
													return context.dataset.label + ': ' + formatter.format(context.parsed.y);
												}
											}
										}
									},
									scales: {
										x: {
											stacked: true,
											categoryPercentage: 0.5,
											barPercentage: 0.5
										},
										y: {
											stacked: true,
											title: {
												display: true,
												text: '金額（円）'
											},
											ticks: {
												callback: function(value) {
													return `${(value / 10000).toLocaleString('ja-JP')}万円`;
												}
											},
										}
									}
								}} />
							</div>
						</div>
					</div>
				</div>
			</main>
    	</>
  	)
}

export default App
