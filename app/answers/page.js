"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Answers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("responses")
        .select("*")
        .order("created_at", { ascending: false });

      setItems(data || []);
    };

    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Ответы 💌</h2>

      {items.map((i) => (
        <div key={i.id} style={{ marginBottom: 10 }}>
          <div>📅 {i.date}</div>
          <div>⏰ {i.time}</div>
          <div>🍕 {i.foods?.join(", ")}</div>
        </div>
      ))}
    </div>
  );
}