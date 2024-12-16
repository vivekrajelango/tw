import React from 'react';
import dayjs from 'dayjs';
import { DateFormats } from '@/constants/constants';

const MatterDetails=({data}:any)=> {
  return (
    <section className='p-10'>
        <div className='flex flex-row gap-3 justify-between'>
        <div className='flex flex-col text-gray-700 '>
            <p className='text-blue-400'>Matter Name</p>
            <p>{data?.matterName}</p>
        </div>
        <div className='flex flex-col text-gray-700'>
            <p className='text-blue-400'>Matter Code</p>
            <p>{data?.matterCode}</p>
        </div>
        <div className='flex flex-col  text-gray-700'>
            <p className='text-blue-400'>Matter Date</p>
            <p>{dayjs(data?.matterDate).format(DateFormats.DATE_WITH_SLASH)}</p>
        </div>
        </div>
        <div className='flex flex-row justify-between text-gray-700 mt-5'>
            <p className='text-blue-400'>Matter Description</p>
        </div>
        <div className='flex flex-row justify-between text-gray-500'>
            <p>{data?.matterDescription}</p>
        </div>
    </section>
  )
}

export default MatterDetails