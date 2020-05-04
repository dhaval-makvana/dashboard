import React, { Component } from 'react';
import styles from './index.module.scss';
import uuid from 'uuid4';

export default class ChartJS extends Component {
    
	chartRef = null;
	setRef = (dom) => this.chartRef = dom;
	chart = undefined;

	componentDidMount() {
		this.buildChart();
	}

	componentDidUpdate() {
		this.buildChart();
	}

	componentWillUnmount() {
		this.destroyChart();
	}

	buildChart = async () => {
		const chartNode = this.chartRef;
		const { input: { type, options, data } } = this.props;
		const config = {
			type,
			data,
			options
		}

		this.destroyChart();

		const { Chart } = await import ('chart.js');
		
		this.chart = new Chart(chartNode, config);
	}

	destroyChart = () => {
		if (this.chart === "undefined") {
			this.chart.destroy();
		}
	}

	render() {
		const { input: { type } } = this.props;

		return (
			<div className={styles[`${type}`]}>
				<canvas
					id={uuid()}
					ref={(dom) => this.chartRef = dom}
					aria-label={type} 
					role={`${type} chart`}
				/>
			</div>
		)
	}
};