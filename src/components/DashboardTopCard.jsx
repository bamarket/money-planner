import React from 'react'

const DashboardTopCard = ({ card }) => {
    return (
        <div className='bg-white p-4  rounded-md'>
            <div className='flex items-center'>
                <div className='bg-primary p-2 rounded-full mr-4'>
                    {card.icon}
                </div>
                <div className='text-md font-bold'>{card.title}</div>
            </div>

            <div className='flex justify-between items-center my-2'>
                <div className='text-xl font-bold'>{card.value}</div>
                <div className='flex items-center'>
                    <div className='bg-[#E6FAF2] text-[#009544] px-2 py-1 rounded-full text-[10px] mx-2'>+8.9%</div>
                    <div className='text-sm'>From Last Month</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTopCard
