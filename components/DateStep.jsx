"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DateStep({ onSelect }) {
  return (
    <div className="card">
      <h2>Выбери дату 💕</h2>

      <Calendar
        minDate={new Date()}
        onChange={(date) => onSelect(date)}
      />
    </div>
  );
}