import { useState, useEffect } from 'react'

export const EditorHeader = () => {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  return (
    <div className="bg-white/40 backdrop-blur-[2px] border-b border-white/20 px-6 py-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-serif text-gray-800">
            <span className="bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
              Write your thoughts
            </span>
          </h1>
          <p className="text-sm text-gray-600 font-light tracking-wide mt-1" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            A moment of clarity in the stream of thoughts
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-gray-500 italic mt-1 mr-[117px]" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            Today is 
          </p>
          <p className="text-lg font-serif text-[#2F4F4F]">{currentDate}</p>

        </div>
      </div>
    </div>
  )
} 