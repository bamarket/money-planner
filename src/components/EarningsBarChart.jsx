import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Earnings',
        data: data.map(item => item.earnings),
        backgroundColor: '#E63C92',
        borderRadius: 10,
        barThickness: 20, // Adjust the width of the bars
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove the x-axis grid
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove the y-axis grid
        },
        ticks: {
          callback: function (value) {
            return '$' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false, // This will remove the legend
      },
    },
  };


  return <Bar data={chartData} options={options} />;
};

export default BarChart;