import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const RetrievePastEntries = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="mb-4 text-xl font-serif text-[#2F4F4F]">Retrieve Past Entries</h1>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                className="border border-[#e0f2ef] rounded-lg px-3 py-2 text-[#2F4F4F] focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy"
                isClearable
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
            {selectedDate && (
                <div className="mt-4 text-[#2F4F4F]">
                    Selected date: {selectedDate.toLocaleDateString()}
                </div>
            )}
        </div>
    );
};