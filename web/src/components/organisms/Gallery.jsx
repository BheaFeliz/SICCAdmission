import Image from 'next/image'
import React from 'react'

const Gallery = ({ images }) => {
  if (!images) {
    return null
  }

  const normalized = images
    .map((img) => {
      // Accept either string URLs or objects with url/path
      const raw = typeof img === 'string' ? img : img?.url || img?.path || ''
      if (!raw) return null

      // If already absolute or starts with '/storage' or '/', keep as is
      if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('/storage') || raw.startsWith('/')) {
        return raw
      }

      // If looks like a stored public file (e.g., 'registrations/..'), prefix with '/storage/'
      if (/^[\w-]+\//.test(raw)) {
        return `/storage/${raw.replace(/^\/+/, '')}`
      }

      return null
    })
    .filter(Boolean)

  if (!normalized.length) return null

  return (
    <>
      {normalized.map((src, index) => (
        <div key={index} className='rounded-lg overflow-hidden border border-gray-300'>
          <Image
            src={src}
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
