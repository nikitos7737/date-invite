"use client";

import { supabase } from "../lib/supabase";

export default function FinalStep({ data }) {

  const send = async () => {
    const { error } = await supabase.from("responses").insert([
      {
        date: data.date ? data.date.toString() : "",
        time: data.time || "",
        foods: data.foods || []
      }
    ]);

    if (error) {
      console.log("SUPABASE ERROR:", error);
      alert("Ошибка отправки 💔");
      return;
    }

    alert("Отправлено 💗");
  };

  return (
    <div className="card">
      <h2>Готово 💗</h2>

      <div className="summary">
        <p>
          📅{" "}
          {data.date
            ? new Date(data.date).toLocaleDateString()
            : ""}
        </p>

        <p>⏰ {data.time}</p>

        <p>🍽 {data.foods?.join(", ")}</p>
      </div>

      <button className="yes" onClick={send}>
        Отправить 💌
      </button>

      <style jsx>{`
        .summary {
          background: rgba(255, 255, 255, 0.6);
          padding: 12px;
          border-radius: 15px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}