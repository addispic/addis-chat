import React from 'react'

import './Loading.css'

const Loading = ({mainText}) => {
  return (
    <div className='mt-10p'>
        {/* spinner */}
        <div>
            <ul className='flex items-center gap-x-5 py-1 mb-3'>
                <li id='green-li' className='w-[20px] rounded-full aspect-square bg-green-500 shadow-[0_0_16px_0_rgba(0,0,0,0.3)] shadow-green-600'></li>
                <li id='yellow-li' className='animate-blower delay-[10000ms] w-[20px] rounded-full aspect-square bg-yellow-500 shadow-[0_0_16px_0_rgba(0,0,0,0.3)] shadow-yellow-500'></li>
                <li id='red-li' className='animate-blower delay-[15000ms] w-[20px] rounded-full aspect-square bg-red-500 shadow-[0_0_16px_0_rgba(0,0,0,0.3)] shadow-red-500'></li>
            </ul>
            <div>
                <h3 className='font-semibold text-sm text-green-600'>{mainText}</h3>
            </div>
        </div>
    </div>
  )
}

export default Loading