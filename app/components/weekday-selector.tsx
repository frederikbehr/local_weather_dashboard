import React, { useState } from 'react';

export default function WeekdaySelector({ onSelect }: { onSelect: (date: Date) => void }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onSelect(date);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {days.map((date) => {
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        return (
          <button
            key={date.toDateString()}
            onClick={() => handleSelect(date)}
            className={`flex flex-col items-center px-3 py-1.5 rounded cursor-pointer
              ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <span className="font-semibold text-sm">{date.toLocaleDateString('da-DK', { weekday: 'short' })}</span>
            <span className="text-sm">{date.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}
