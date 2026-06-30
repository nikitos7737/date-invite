"use client";

import { useState } from "react";

export default function FoodStep({ foods, onSelect }) {
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState(foods);
  const [custom, setCustom] = useState("");

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((f) => f !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const addFood = () => {
    if (!custom.trim()) return;

    const newFood = custom.trim();

    // добавляем в общий список
    setList([...list, newFood]);

    // сразу выбираем тоже (по желанию UX — можно убрать)
    setSelected([...selected, newFood]);

    setCustom("");
  };

  return (
    <div className="card">
      <h2>Что будем есть? 🍕</h2>

      <div className="food-list">
        {list.map((food) => (
          <label key={food} className="food-item">
            <input
              type="checkbox"
              checked={selected.includes(food)}
              onChange={() => toggle(food)}
            />
            {food}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Добавь своё блюдо 🍰"
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ffd1e1",
            width: "80%"
          }}
        />

        <button className="yes" onClick={addFood} style={{ width: "100%", marginTop: 10 }}>
          Добавить
        </button>
      </div>

      <button
        className="yes"
        style={{ width: "100%", marginTop: 15 }}
        onClick={() => onSelect(selected)}
      >
        Продолжить
      </button>
    </div>
  );
}