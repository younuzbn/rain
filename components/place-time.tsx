"use client";

import { useEffect, useState } from "react";

export function PlaceTime() {
  const [label, setLabel] = useState("Fort Kochi, Kerala");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(now);
      const hour = Number(
        new Intl.DateTimeFormat("en-GB", {
          hour: "numeric",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(now),
      );
      const part =
        hour < 5 ? "Night" : hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 20 ? "Evening" : "Night";
      setLabel(`${part} in Kochi · ${time}`);
    };

    format();
    const id = window.setInterval(format, 30000);
    return () => window.clearInterval(id);
  }, []);

  return <p className="kicker">{label}</p>;
}
