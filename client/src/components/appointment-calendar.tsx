import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppointmentCalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

export default function AppointmentCalendar({ onDateSelect, selectedDate }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Available slots (yellow highlights) - mock data
  const availableSlots = new Set([
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 2).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 5).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 7).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 8).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 12).padStart(2, '0')}`,
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate() + 14).padStart(2, '0')}`
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDateString = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateAvailable = (day: number) => {
    const dateString = formatDateString(day);
    return availableSlots.has(dateString);
  };

  const isDatePast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  const isDateSelected = (day: number) => {
    const dateString = formatDateString(day);
    return selectedDate === dateString;
  };

  const handleDateClick = (day: number) => {
    if (isDatePast(day) || !isDateAvailable(day)) return;
    const dateString = formatDateString(day);
    onDateSelect(dateString);
  };

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="h-10 flex items-center justify-center">
        {/* Empty cell */}
      </div>
    );
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isPast = isDatePast(day);
    const isAvailable = isDateAvailable(day);
    const isSelected = isDateSelected(day);

    let dayClass = "h-10 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer transition-colors ";
    
    if (isPast) {
      dayClass += "text-gray-400 cursor-not-allowed";
    } else if (isSelected) {
      dayClass += "bg-az-magenta text-white";
    } else if (isAvailable) {
      dayClass += "bg-az-gold text-az-magenta hover:bg-yellow-400";
    } else {
      dayClass += "text-gray-600 hover:bg-gray-100";
    }

    calendarDays.push(
      <div
        key={day}
        className={dayClass}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-xs text-gray-600 pt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-az-gold rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-az-magenta rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}