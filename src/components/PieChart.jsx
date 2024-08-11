import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Total Happy Stories', 'Approved Happy Stories', 'Pending Happy Stories'],
  datasets: [
    {
      label: '# of Stories',
      data: [50, 30, 20],
      backgroundColor: [
        'rgba(0, 0, 139, 1)', // Total Happy Stories
        'rgba(255, 105, 180, 1)', // Approved Happy Stories
        'rgba(138, 43, 226, 1)', // Pending Happy Stories
      ],
      borderColor: [
        'rgba(255, 255, 255, 1)',
      ],
      borderWidth: 5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Disable the default legend
      position: 'bottom',
    },
  },
};

export default function PieChart() {
  return (
    <div>
      <div className='py-10 w-[80%] flex justify-center items-center'>
        <Pie data={data} options={options} />
      </div>
      <div className="text-center mt-2">
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center">
            <span className="bg-[rgba(0,0,139,1)] rounded-full w-4 h-4 inline-block mr-1"></span>
            <span className='text-xs'>Total Happy Stories</span>
          </div>
          <div className="flex items-center">
            <span className="bg-[rgba(255,105,180,1)] rounded-full w-4 h-4 inline-block mr-1"></span>
            <span className='text-xs'>Approved Happy Stories</span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-1">
          <div className="flex items-center">
            <span className="bg-[rgba(138,43,226,1)] rounded-full w-4 h-4 inline-block mr-1"></span>
            <span className='text-xs'>Pending Happy Stories</span>
          </div>
        </div>
      </div>
    </div>
  );
}
