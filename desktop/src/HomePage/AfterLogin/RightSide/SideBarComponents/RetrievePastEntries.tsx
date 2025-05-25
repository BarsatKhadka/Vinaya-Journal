import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PastEntriesBackground from '../../../../assets/BackgroundImages/PastEntriesBackground.png';
import axios from 'axios';

export const RetrievePastEntries = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [entries, setEntries] = useState<string>("");

    useEffect(() => {
        const fetchEntries = async () => {
            const date = selectedDate.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:8080/retrieve?date=${date}`);
            const data = response.data;
            setEntries(data);
        };
        fetchEntries();
    }, [selectedDate]);

    return (
        <div
            className="flex flex-col items-center h-full relative"
            style={{
                backgroundImage: `url(${PastEntriesBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            
            <style>{`
                .vinaya-calendar .react-datepicker__header {
                    background-color: #e0f2ef;
                    border-bottom: none;
                }
                .vinaya-calendar .react-datepicker__current-month,
                .vinaya-calendar .react-datepicker__day-name {
                    color: #2F4F4F;
                    font-family: 'Fira Sans', serif;
                }
                .vinaya-calendar .react-datepicker__day--selected,
                .vinaya-calendar .react-datepicker__day--keyboard-selected {
                    background-color: #2F4F4F !important;
                    color: #fff !important;
                    border-radius: 0.5rem;
                }
                .vinaya-calendar .react-datepicker__day--today {
                    border-radius: 0.5rem;
                    border: 1.5px solid #2F4F4F;
                    background: #e0f2ef;
                    color: #2F4F4F;
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

            <div className="absolute inset-0 bg-[#f7f4f0]/70 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col items-start ml-8 w-full mt-8 justify-end">
                <DatePicker
                    selected={selectedDate}
                    onChange={date => date && setSelectedDate(date)}
                    inline
                    calendarClassName="vinaya-calendar"
                />
            </div>
            <div className="relative z-10 flex flex-col items-start ml-8 w-full mt-8 justify-end">
                <div className="text-[#2F4F4F]">
                    {entries}
                </div>
            </div>
        </div>
    );
};