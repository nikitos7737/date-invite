"use client";

import { supabase } from "../lib/supabase";

export default function FinalStep({ data }) {

  const send = async () => {
    try {
      // 1. Сохраняем в Supabase
      const { error } = await supabase.from("responses").insert([
        {
          date: data.date ? data.date.toString() : "",
          time: data.time || "",
          foods: data.foods || []
        }
      ]);

      if (error) {
        console.log("SUPABASE ERROR:", error);
        alert("Ошибка Supabase 💔");
        return;
      }

      // 2. Отправка в Telegram (НАПРЯМУЮ)
      const BOT_TOKEN = "8869993922:AAH12UI45EIHvWjjBM1VD0IGz5UL24eTVsM";
      const CHAT_ID = "268412218";

      const text =
`💌 Новое свидание

📅 Дата: ${data.date ? new Date(data.date).toLocaleDateString() : ""}
⏰ Время: ${data.time || ""}
🍽 Еда: ${data.foods?.join(", ") || ""}`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text
          })
        }
      );

      const tgData = await tgRes.json();

      if (!tgData.ok) {
        console.log("TELEGRAM ERROR:", tgData);
        alert("Supabase ок, но Telegram не отправился 💔");
        return;
      }

      alert("Отправлено 💗");

    } catch (err) {
      console.log("UNKNOWN ERROR:", err);
      alert("Что-то сломалось 💔");
    }
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