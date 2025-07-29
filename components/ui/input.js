import React from 'react'

function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export default Input
