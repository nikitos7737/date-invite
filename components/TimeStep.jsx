"use client";

import { useState } from "react";

export default function TimeStep({ onSelect }) {
  const [hour, setHour] = useState("19");
  const [minute, setMinute] = useState("00");

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  return (
    <div className="card">
      <h2>Во сколько встречаемся? ⏰</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "20px 0" }}>
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ffd1e1",
            fontSize: "18px"
          }}
        >
          {hours.map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>

        <span style={{ fontSize: 22 }}>:</span>

        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ffd1e1",
            fontSize: "18px"
          }}
        >
          {minutes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <button
        className="yes"
        onClick={() => onSelect(`${hour}:${minute}`)}
      >
        Продолжить
      </button>
    </div>
  );
}