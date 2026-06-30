"use client";

import { useState, useEffect } from "react";

const defaultInvite = {
  question: "Пойдём на свидание? 💗",

  images: {
    first: "/cat1.gif",
    second: "/cat2.gif"
  },

  foods: ["Пицца 🍕", "Суши 🍣", "Бургер 🍔"]
};

export default function useInvite() {
  const [invite, setInvite] = useState(defaultInvite);

  useEffect(() => {
    const saved = localStorage.getItem("invite");
    if (saved) setInvite(JSON.parse(saved));
  }, []);

  const updateInvite = (newData) => {
    const updated = { ...invite, ...newData };
    setInvite(updated);
    localStorage.setItem("invite", JSON.stringify(updated));
  };

  return { invite, updateInvite };
}