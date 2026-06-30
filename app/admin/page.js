"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("invite")
        .select("*")
        .eq("id", "main")
        .single();

      setForm(data.data);
    };

    load();
  }, []);

  const save = async () => {
    await supabase
      .from("invite")
      .update({ data: form })
      .eq("id", "main");

    alert("Сохранено 💗");
  };

  if (!form) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Админка</h2>

      <input
        value={form.question}
        onChange={(e) =>
          setForm({ ...form, question: e.target.value })
        }
        placeholder="вопрос"
      />

      <br />

      <input
        value={form.images.first}
        onChange={(e) =>
          setForm({
            ...form,
            images: { ...form.images, first: e.target.value }
          })
        }
        placeholder="image 1"
      />

      <br />

      <input
        value={form.images.second}
        onChange={(e) =>
          setForm({
            ...form,
            images: { ...form.images, second: e.target.value }
          })
        }
        placeholder="image 2"
      />

      <br />

      <textarea
        value={form.foods.join(",")}
        onChange={(e) =>
          setForm({
            ...form,
            foods: e.target.value.split(",")
          })
        }
      />

      <br />

      <button onClick={save}>Сохранить</button>
    </div>
  );
}