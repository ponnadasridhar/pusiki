import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Booking } from '../types/booking';

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onDateSelect: (date: string) => void;
  bookings: Booking[];
}

export function Calendar({ currentDate, onDateChange, onDateSelect, bookings }: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateKey = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const bookedDates = new Set(bookings.map(booking => booking.booking_date));

  const isDateBooked = (date: Date): boolean => {
    const dateString = formatDateKey(date);
    return bookedDates.has(dateString);
  };

  const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate < today; // Past dates blocked, today allowed
  };

  const handlePrevMonth = () => {
    onDateChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (isPastDate(selectedDate) || isDateBooked(selectedDate)) {
      return;
    }
    const dateString = formatDateKey(selectedDate);
    onDateSelect(dateString);
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isBooked = isDateBooked(date);
    const isPast = isPastDate(date);
    const isDisabled = isBooked || isPast;

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={isDisabled}
        className={`
          aspect-square flex items-center justify-center rounded-lg text-sm font-medium
          transition-all duration-200
          ${isBooked
            ? 'bg-red-100 text-red-800 cursor-not-allowed border-2 border-red-300'
            : isPast
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-blue-50 hover:border-blue-300 border-2 border-gray-200 cursor-pointer'
          }
        `}
      >
        <div className="flex flex-col items-center">
          <span>{day}</span>
          {isBooked && (
            <span className="text-xs font-normal">Booked</span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>

      <div className="mt-6 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <span className="text-gray-600">Past</span>
        </div>
      </div>
    </div>
  );
}
