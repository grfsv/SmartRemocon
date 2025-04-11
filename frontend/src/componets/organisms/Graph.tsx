import type { EnvLog } from "@/types/envLog";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect, useRef } from "react";

const Chart: React.FC<{ data: EnvLog[] }> = ({ data }) => {
	const chartRef = useRef<am5xy.XYChart | null>(null);

	// 初期チャートの作成
	useLayoutEffect(() => {
		const root = am5.Root.new("chartdiv");

		root.setThemes([am5themes_Animated.new(root)]);

		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				layout: root.verticalLayout,
			}),
		);

		// X軸の作成
		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				renderer: am5xy.AxisRendererX.new(root, {}),
				categoryField: "category",
			}),
		);

		// 1つ目のY軸（温度用）
		const yAxisTemp = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			}),
		);

		// 2つ目のY軸（湿度用）
		const yAxisHumidity = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, { opposite: true }),
			}),
		);

		// データを作成（各データをループして設定）
		const chartData = data.map((entry) => ({
			category: new Date(entry.createdAt).toLocaleTimeString(),
			temperature_sht: Number(entry.temperatureSht),
			humidity: Number(entry.humidity),
			temperature_qmp: Number(entry.temperatureQmp),
			pressure: Number(entry.pressure),
		}));

		// X軸にデータを設定
		xAxis.data.setAll(chartData);

		// 温度の棒グラフ作成（temperature_sht）
		const tempSeries = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: "Temperature (SHT)",
				xAxis: xAxis,
				yAxis: yAxisTemp,
				valueYField: "temperature_sht",
				categoryXField: "category",
				tooltip: am5.Tooltip.new(root, {
					labelText: "{valueY} ℃", // 温度のツールチップ
				}),
			}),
		);
		tempSeries.data.setAll(chartData);

		// 湿度の線グラフ作成（humidity）
		const humiditySeries = chart.series.push(
			am5xy.LineSeries.new(root, {
				name: "Humidity",
				xAxis: xAxis,
				yAxis: yAxisHumidity,
				valueYField: "humidity",
				categoryXField: "category",
				stroke: am5.color(0x00aaff), // 湿度の線の色
				fill: am5.color(0x00aaff),
				tooltip: am5.Tooltip.new(root, {
					labelText: "{valueY} %", // 湿度のツールチップ
				}),
			}),
		);
		humiditySeries.data.setAll(chartData);

		// 凡例の追加
		const legend = chart.children.push(am5.Legend.new(root, {}));
		legend.data.setAll(chart.series.values);

		// カーソルの追加（Y軸に対してのみ）
		chart.set(
			"cursor",
			am5xy.XYCursor.new(root, {
				behavior: "zoomY", // Y軸のみズーム可能
				xAxis: xAxis, // X軸に影響を与えない
			}),
		);

		return () => {
			root.dispose();
		};
	}, [data]); // dataが変更される度に再描画されるように依存配列を追加

	return <div id="chartdiv" className="w-full h-full" />;
};

export default Chart;
