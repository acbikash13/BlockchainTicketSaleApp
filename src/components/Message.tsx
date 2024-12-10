import React from 'react'

interface MessageProps {
  message: string
  type: 'success' | 'error'
}


export  function Message({ message, type }: MessageProps) {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'

  return (
    <div className={`${bgColor} ${textColor} px-4 py-2 rounded-md mt-4`}>
      {message}
    </div>
  )
}

