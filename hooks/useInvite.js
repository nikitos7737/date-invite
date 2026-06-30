"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const defaultInvite = {
  question: "",
  images: {
    first: "",
    second: ""
  },
  foods: []
};

export default function useInvite() {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInvite = async () => {
    const { data, error } = await supabase
      .from("invite")
      .select("*")
      .eq("id", "main")
      .single();

    if (error) {
      console.log("fetch error:", error);
      setInvite(defaultInvite);
      setLoading(false);
      return;
    }

    setInvite(data?.data ?? defaultInvite);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvite();

    // 🔥 realtime (если работает — супер, если нет — не ломает всё)
    const channel = supabase
      .channel("invite-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "invite"
        },
        (payload) => {
          const newData = payload?.new?.data;
          if (newData) {
            setInvite(newData);
          }
        }
      )
      .subscribe();

    // 🔥 fallback: если realtime не сработал
    const interval = setInterval(fetchInvite, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const updateInvite = async (newData) => {
    const updated = { ...invite, ...newData };

    setInvite(updated); // мгновенный UI

    const { error } = await supabase
      .from("invite")
      .update({ data: updated })
      .eq("id", "main");

    if (error) {
      console.log("update error:", error);
    }
  };

  return { invite, loading, updateInvite };
}