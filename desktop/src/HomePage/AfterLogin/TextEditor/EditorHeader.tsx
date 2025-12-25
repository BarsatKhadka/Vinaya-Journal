import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const EditorHeader = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [quote, setQuote] = useState('')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    setCurrentDate(date.toLocaleDateString(i18n.language, options))
    
    const quotes = t('textEditor.quotes', { returnObjects: true }) as string[];
    if (Array.isArray(quotes) && quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }
  }, [i18n.language, t])

  return (
    <div className="border-b border-[var(--border-color)] px-4 md:px-6 py-3 md:py-4 bg-transparent">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[var(--text-main)]">
            <span className="text-[var(--text-main)]">
              {t('textEditor.writeYourThoughts')}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-light tracking-wide mt-1" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            {quote}
          </p>
        </div>
        
        <div className="text-right md:min-w-[180px]">
          <p className="text-xs text-[var(--text-muted)] italic mt-1" 
             style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            {t('textEditor.todayIs')}
          </p>
          <p className="text-base md:text-lg font-serif text-[var(--text-main)]">{currentDate}</p>
        </div>
      </div>
    </div>
  )
} 