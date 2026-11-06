export function StayIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="stay-icon">
      <IconPath name={name} />
    </svg>
  );
}

function IconPath({ name }: { name: string }) {
  switch (name) {
    case "pin":
      return (
        <>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
          <circle cx="12" cy="11" r="2" />
        </>
      );
    case "check":
      return <path d="M5 12.5 9.2 17 19 7" />;
    case "home":
      return (
        <>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M7 10.5V20h10v-9.5" />
        </>
      );
    case "kitchen":
      return (
        <>
          <path d="M6 3v8a3 3 0 0 0 6 0V3" />
          <path d="M9 3v18" />
          <path d="M16 3v7" />
          <path d="M16 7h3v2a3 3 0 0 1-3 3v9" />
        </>
      );
    case "wifi":
      return (
        <>
          <path d="M4.5 9.5a11 11 0 0 1 15 0" />
          <path d="M7.5 12.5a7 7 0 0 1 9 0" />
          <path d="M10.2 15.4a3.2 3.2 0 0 1 3.6 0" />
          <circle cx="12" cy="18.2" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case "desk":
      return (
        <>
          <path d="M4 8h16v8H4z" />
          <path d="M8 16v4" />
          <path d="M12 8V5" />
        </>
      );
    case "parking":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M10 16V8h3.2a2.4 2.4 0 0 1 0 4.8H10" />
        </>
      );
    case "tv":
      return (
        <>
          <rect x="3.5" y="6" width="17" height="11" rx="1.5" />
          <path d="M8 20h8" />
        </>
      );
    case "washer":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="13" r="4" />
          <path d="M7 6h.5" />
        </>
      );
    case "snow":
      return (
        <>
          <path d="M12 3v18" />
          <path d="M5 7.5 19 16.5" />
          <path d="M19 7.5 5 16.5" />
        </>
      );
    case "fridge":
      return (
        <>
          <rect x="6" y="2.5" width="12" height="19" rx="1.5" />
          <path d="M6 10h12" />
          <path d="M9 6.5h.5" />
          <path d="M9 13.5h.5" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="8" cy="12" r="3.2" />
          <path d="M11 12h9l-1.6 1.8" />
          <path d="M16.5 12v2" />
        </>
      );
    case "water":
      return <path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10z" />;
    case "soap":
      return (
        <>
          <rect x="4" y="9" width="16" height="9" rx="2" />
          <path d="M8 9V7.5A2.5 2.5 0 0 1 10.5 5H13" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M12 3.5 13.4 8H18l-3.7 2.8 1.4 4.7L12 13.2 8.3 15.5l1.4-4.7L6 8h4.6z" />
        </>
      );
    case "hanger":
      return <path d="M12 6.5a2 2 0 1 1 2 2c0 1.2-2 1.4-2 3V12l8 5H4l8-5" />;
    case "bed":
      return (
        <>
          <path d="M3 17V8" />
          <path d="M3 13h18v4" />
          <path d="M21 17V11a2 2 0 0 0-2-2H11" />
          <path d="M3 17h18" />
        </>
      );
    case "pillow":
      return <path d="M5 9c2-3 12-3 14 0 2 3 2 6 0 8-2 2-12 2-14 0-2-2-2-5 0-8z" />;
    case "blind":
      return (
        <>
          <path d="M5 5h14" />
          <path d="M5 9h14" />
          <path d="M5 13h14" />
          <path d="M5 17h8" />
        </>
      );
    case "iron":
      return <path d="M4 15h15l1-3a6 6 0 0 0-6-4H8L4 15z" />;
    case "closet":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18" />
          <path d="M10 12h.5" />
          <path d="M13.5 12h.5" />
        </>
      );
    case "utensils":
      return (
        <>
          <path d="M7 3v7a2 2 0 0 0 2 2V3" />
          <path d="M8 3v18" />
          <path d="M16 3c2 2 2 4 0 6v12" />
        </>
      );
    case "plate":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
        </>
      );
    case "pot":
      return (
        <>
          <path d="M5 10h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
          <path d="M8 10V8" />
          <path d="M16 10V8" />
          <path d="M4 8h16" />
        </>
      );
    case "kettle":
      return (
        <>
          <path d="M7 9h8a4 4 0 0 1 0 8H8a3 3 0 0 1-3-3V11a2 2 0 0 1 2-2z" />
          <path d="M15 11h3a2 2 0 0 1 0 4h-2" />
          <path d="M9 6.5 11 9" />
        </>
      );
    case "fryer":
      return (
        <>
          <rect x="6" y="7" width="12" height="13" rx="2" />
          <path d="M9 7V5h6v2" />
          <path d="M9 12h6" />
        </>
      );
    case "table":
      return (
        <>
          <path d="M4 9h16" />
          <path d="M6 9v8" />
          <path d="M18 9v8" />
        </>
      );
    default:
      return <path d="M6 6l12 12M18 6 6 18" />;
  }
}
