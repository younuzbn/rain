export function Drop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 1.4c2.3 3.4 4.4 5.4 4.4 8a4.4 4.4 0 1 1-8.8 0c0-2.6 2.1-4.6 4.4-8z"
      />
    </svg>
  );
}

export function NetDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 520"
      fill="none"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.35"
    >
      <path
        d="M12 418c48-22 78 14 126-4s78 18 124 2 86-24 132-6 78 20 120 4 70-16 114-2"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <path d="M16 444h608" stroke="currentColor" strokeOpacity="0.28" />
      <path d="M48 464h540" stroke="currentColor" strokeOpacity="0.18" />
      <path d="M90 482h460" stroke="currentColor" strokeOpacity="0.12" />
      <path
        d="M312 456c22-16 78-18 108-2-10 10-74 16-108 2z"
        stroke="currentColor"
        strokeOpacity="0.55"
      />
      <path d="M78 430C88 352 66 292 96 236" stroke="currentColor" />
      <path d="M96 236c18-28 8-36-6-52M96 236c22-18 48-8 62-28M96 236c-8-30 16-48 10-70" stroke="currentColor" />
      <path d="M206 428 194 92" stroke="currentColor" />
      <path d="M178 104h34" stroke="currentColor" />
      <path d="M78 214 486 268" stroke="currentColor" />
      <path d="M194 124 486 268" stroke="currentColor" />
      <path d="M198 176 486 268" stroke="currentColor" />
      <path d="M196 214 78 214" stroke="currentColor" />
      <path d="M78 214 54 304" stroke="currentColor" />
      <circle cx="46" cy="322" r="18" stroke="currentColor" />
      <circle cx="70" cy="340" r="11" stroke="currentColor" />
      <path d="M54 304 68 328" stroke="currentColor" />
      <path d="M486 268 404 368" stroke="currentColor" />
      <path d="M486 268 470 386" stroke="currentColor" />
      <path d="M486 268 548 392" stroke="currentColor" />
      <path d="M486 268 590 356" stroke="currentColor" />
      <path
        d="M398 364c34-24 104-10 186 2 16 28 2 78-18 98-52 22-132 16-176-10-18-26-16-68 8-90z"
        stroke="currentColor"
      />
      <path d="M430 356 448 446M474 352 486 458M518 356 522 460M558 360 552 444" stroke="currentColor" />
      <path d="M412 392h168M408 418h176M416 444h156" stroke="currentColor" />
    </svg>
  );
}
