import { useState, useEffect } from 'react'
import { getRandomQuote } from './quotes'

export const EditorHeader = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    setCurrentDate(date.toLocaleDateString('en-US', options))
    setQuote(getRandomQuote())
  }, [])

  return (
    <div className="border-b border-gray-200/90 px-4 md:px-6 py-3 md:py-4 bg-transparent">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-gray-800">
            <span className="bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
              Write your thoughts
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-600 font-light tracking-wide mt-1" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            {quote}
          </p>
        </div>
        
        <div className="text-right md:min-w-[180px]">
          <p className="text-xs text-gray-500 italic mt-1" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            Today is 
          </p>
          <p className="text-base md:text-lg font-serif text-[#2F4F4F]">{currentDate}</p>
        </div>
      </div>
    </div>
  )
} 