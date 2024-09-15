import React from 'react'

// config
// base uri
import { BASE_URI } from '../../config'



const Files = ({files}) => {
    let imageFiles = files?.filter(fileItem => fileItem.split('\\')[4] === "image")
    let videoFiles = files?.filter(fileItem => fileItem.split('\\')[4] === "video")
    let audioFiles = files?.filter(fileItem => fileItem.split('\\')[4] === "audio")
    let applicationFiles = files?.filter(fileItem => fileItem.split('\\')[4] === "application")

  return <div>
    {
        imageFiles?.length > 1 
        ?
        <div className={`grid gap-3 grid-cols-1 md:grid-cols-2 `}>
            {
                imageFiles?.map((imageItem)=>{
                    return <div className={`mt-1.5 max-h-[250px] md:max-h-[350px] overflow-hidden rounded-sm ${imageFiles?.length % 2 === 1 && "md:last:col-span-2"}`}><img className='w-full h-full object-center object-cover' src={`${BASE_URI}/${imageItem}`} alt="" /></div>
                })
            }
        </div>
        :
        imageFiles?.map((imageItem)=>{
            return <div className='mt-1.5 max-h-[250px] md:max-h-[350px] overflow-hidden rounded-sm'><img className='w-full h-full object-center object-cover' src={`${BASE_URI}/${imageItem}`} alt="" /></div>
        })
    }
  </div>
}

export default Files