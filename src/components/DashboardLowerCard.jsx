import React from 'react'

const DashboardLowerCard = ({ card }) => {
    return (
        <div className='bg-white p-4 rounded-md text-center'>
            <button className='bg-secondary p-2 rounded-full mr-4'>
                {card.icon}
            </button>
            <div className='text-lg font-bold'>{card.title}</div>
            <div className='text-sm text-gray-500'>{card.value}</div>
            <div className='flex items-center justify-center'>
                <div className='bg-[#E6FAF2] text-[#009544] px-2 py-1 rounded-full text-[10px] mx-2'>+8.9%</div>
                <div className='text-sm'>From Last Month</div>
            </div>
        </div>
    )
}

export default DashboardLowerCard
