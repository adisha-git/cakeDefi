import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const PieChart = (data: any) => {
  console.log("chartData", data)
  return (
    <Pie
      data={{
        labels: data,
        datasets: [
          {
            label: '# of Votes',
            data: data.data,
            backgroundColor: [
              '#ff82d8',
              '#6877ff',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 0.5,
          },
        ],
      }}
    />
  );
};

export default PieChart;
