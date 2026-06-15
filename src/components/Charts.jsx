import { Line, Bar } from 'react-chartjs-2';

const Charts = ({ amount, rate, year, sumAmountInt, resultInt, formatter }) => {
	// グラフデータの計算 - 年ごとの残高推移
	const mthRate = rate / 12;  //月利
	const month = year * 12;

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

			{ /* 棒グラフ */ }
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
	);
};

export default Charts;
