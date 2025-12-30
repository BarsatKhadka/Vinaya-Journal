import { useState, useEffect, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from "../../../store"
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fr, enUS } from 'date-fns/locale';

registerLocale('fr', fr)
registerLocale('en', enUS)

export const EditorHeader = () => {
  const { selectedDate, setSelectedDate } = useAppStore()
  const [quote, setQuote] = useState('')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const quotes = t('textEditor.quotes', { returnObjects: true }) as string[];
    if (Array.isArray(quotes) && quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }
  }, [t])

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  }

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const isToday = selectedDate === today;

  // Custom input component for DatePicker to match the design
  const CustomDateInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <button 
      className="text-base md:text-lg font-serif text-[var(--text-main)] bg-transparent border-none focus:ring-0 text-right cursor-pointer hover:opacity-80"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

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
            {isToday ? t('textEditor.todayIs') : t('textEditor.entryFor')}
          </p>
          <div className="flex justify-end">
            <DatePicker
              selected={new Date(selectedDate)}
              onChange={handleDateChange}
              dateFormat="EEEE, d MMMM yyyy"
              customInput={<CustomDateInput />}
              maxDate={new Date()}
              locale={i18n.language}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 