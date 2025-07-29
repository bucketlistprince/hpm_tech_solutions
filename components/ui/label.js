import React from 'react'

function Label({ className = '', ...props }) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    />
  )
}

export default Label
