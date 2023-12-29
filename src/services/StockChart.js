import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

const StockChart = ({ historicalData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map((data) => DateTime.fromISO(data.date).toJSDate()),
        datasets: [
          {
            label: 'Closing Price',
            data: historicalData.map((data) => data.close), // Assuming your API returns a "price" property
            borderColor: '#007bff',
            borderWidth: 2,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            pointHitRadius: 10,
            fill:true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              parser: 'YYYY-MM-DD',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Closing Price',
            },
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Cleanup on component unmount
    };
  }, [historicalData]);

  return <canvas ref={chartRef} />;
};

export default StockChart;
