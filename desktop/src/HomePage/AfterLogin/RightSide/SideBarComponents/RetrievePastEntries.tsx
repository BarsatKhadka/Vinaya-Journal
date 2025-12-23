import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RetrievePastEntries = () => {
    const { t, i18n } = useTranslation();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [entries, setEntries] = useState<string>("");

    // Get previous months' dates
    const previousMonth = new Date(selectedDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    const twoMonthsAgo = new Date(selectedDate);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Update all calendars when a date is selected
    const handleDateSelect = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                const date = `${year}-${month}-${day}`;
                
                const response = await axios.get(`http://localhost:8080/retrieve?date=${date}`);
                const data = response.data;
                setEntries(data || t('retrievePastEntries.noEntriesFound'));
            } catch (err) {
                setEntries(t('retrievePastEntries.errorRetrieving'));
            }
        };
        fetchEntries();
    }, [selectedDate, t]);

    const navigateDate = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        setSelectedDate(newDate);
    };

    return (
        <div className="flex flex-col h-full bg-[#fae4b2]/30 p-6">
            <style>{`
                .vinaya-calendar .react-datepicker__header {
                    background-color: transparent;
                    border-bottom: none;
                    padding: 0;
                }
                .vinaya-calendar .react-datepicker__current-month {
                    color: #2F4F4F;
                    font-family: 'Roboto Mono','Fira Sans', serif;
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                }
                .vinaya-calendar .react-datepicker__day-name {
                    color: #2F4F4F;
                    font-family: 'Roboto Mono','Fira Sans', serif;
                    font-size: 0.8rem;
                    width: 2rem;
                    margin: 0.1rem;
                }
                .vinaya-calendar .react-datepicker__day {
                    color: #2F4F4F;
                    font-family: 'Roboto Mono','Fira Sans', serif;
                    width: 2rem;
                    height: 2rem;
                    line-height: 2rem;
                    margin: 0.1rem;
                    border-radius: 50%;
                }
                .vinaya-calendar .react-datepicker__day--selected,
                .vinaya-calendar .react-datepicker__day--keyboard-selected {
                    background-color: #2F4F4F !important;
                    color: #fff !important;
                }
                .vinaya-calendar .react-datepicker__day--today {
                    border: 2px solid #2F4F4F;
                    background: transparent;
                    color: #2F4F4F;
                    font-weight: 600;
                }
                .vinaya-calendar .react-datepicker__day:hover {
                    background: #e0f2ef;
                    color: #2F4F4F;
                }
                .vinaya-calendar .react-datepicker__month-dropdown-container,
                .vinaya-calendar .react-datepicker__year-dropdown-container {
                    color: #2F4F4F;
                }
                .vinaya-calendar .react-datepicker__triangle {
                    display: none;
                }
            `}</style>

            <div className="flex items-center mb-4">
                <h2 className="text-[#2F4F4F] font-serif text-xl">{t('retrievePastEntries.title')}</h2>
            </div>

            <div className="flex gap-6 h-[calc(100%-3rem)]">
                <div className="w-64 space-y-4">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        inline
                        calendarClassName="vinaya-calendar"
                        locale={i18n.language}
                    />
                    <div className="pt-2 border-t border-[#2F4F4F]/20">
                        <DatePicker
                            selected={null}
                            openToDate={previousMonth}
                            onChange={handleDateSelect}
                            inline
                            calendarClassName="vinaya-calendar"
                            locale={i18n.language}
                        />
                    </div>
                    <div className="pt-2 border-t border-[#2F4F4F]/20">
                        <DatePicker
                            selected={null}
                            openToDate={twoMonthsAgo}
                            onChange={handleDateSelect}
                            inline
                            calendarClassName="vinaya-calendar"
                            locale={i18n.language}
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <div
                        className="h-[770px] overflow-y-auto border-0 font-serif text-base whitespace-pre-line relative rounded-lg"
                        style={{
                            background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
                            backgroundAttachment: 'local',
                            boxShadow: '0 2px 12px rgba(46, 79, 79, 0.1)',
                            border: '1.5px solid #e6cfa7',
                        }}
                    >
                        <div className="sticky top-0 bg-[#fef1d6] py-2 px-6 z-10 border-b border-[#e6cfa7] flex items-center justify-between">
                            <div className="text-[#2F4F4F] font-serif text-lg">
                                {selectedDate.toLocaleDateString(i18n.language, { 
                                    weekday: 'long',
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </div>
                            <div className="flex items-center space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigateDate('prev')}
                                    className="p-1.5 rounded-full hover:bg-[#2F4F4F]/10"
                                >
                                    <ChevronLeft className="w-5 h-5 text-[#2F4F4F]" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigateDate('next')}
                                    className="p-1.5 rounded-full hover:bg-[#2F4F4F]/10"
                                >
                                    <ChevronRight className="w-5 h-5 text-[#2F4F4F]" />
                                </motion.button>
                            </div>
                        </div>
                        <div className="pl-6">
                            <div className="text-[#6b4f27] text-lg/7 pt-4" style={{ lineHeight: '30px' }}>
                                {entries}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};