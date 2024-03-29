import Image from 'next/image'
import React from 'react'

const Gallery = ({ images }) => {
  if (!images) {
    return null
  }

  return (
    <>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className='rounded-lg overflow-hidden border border-gray-300'
        >
          <Image
            src={imageUrl}
            alt={`Image ${index + 1}`}
            width={300}
            height={200}
            className='object-cover w-full h-full'
          />
        </div>
      ))}
    </>
  )
}

export default Gallery
