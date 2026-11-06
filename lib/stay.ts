import { mealOptions, transferPlaces, type MealId } from "@/lib/places";

export const rates = {
  nightly: 10_000,
  transfer: 1_500,
  meal: 200,
  maxGuests: 16,
} as const;

export const mealLabels: Record<MealId, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export type NearbyPlace = {
  name: string;
  time: string;
  distance: string;
};

/** Distances from the house notes in Kakkanad. */
export const nearby: NearbyPlace[] = [
  { name: "Infopark", time: "", distance: "3 km" },
  { name: "Sunrise Hospital", time: "", distance: "3.8 km" },
  { name: "Water Metro", time: "", distance: "4 km" },
  { name: "SmartCity", time: "12 mins", distance: "4.5 km" },
  { name: "LuLu Mall, Edappally", time: "", distance: "7 km" },
  { name: "Vyttila Hub", time: "20 mins", distance: "8.5 km" },
  { name: "Wonderla", time: "", distance: "9 km" },
  { name: "Marine Drive", time: "", distance: "9 km" },
  { name: "Ernakulam Junction", time: "", distance: "9 km" },
  { name: "Fort Kochi", time: "", distance: "13 km" },
  { name: "Cochin International Airport", time: "", distance: "25 km" },
];

export type Amenity = {
  name: string;
  note?: string;
  icon: string;
  available: boolean;
};

export type AmenityGroup = {
  title: string;
  items: Amenity[];
};

export const amenityGroups: AmenityGroup[] = [
  {
    title: "Bathroom",
    items: [
      { name: "Body soap", icon: "soap", available: true },
      { name: "Hot water", note: "Available through the day and night.", icon: "water", available: true },
    ],
  },
  {
    title: "Bedroom and laundry",
    items: [
      { name: "Washing machine", note: "Top-load.", icon: "washer", available: true },
      { name: "Essentials", note: "Towels, bed sheets, soap, and toilet paper.", icon: "spark", available: true },
      { name: "Hangers", icon: "hanger", available: true },
      { name: "Bed linen", icon: "bed", available: true },
      { name: "Extra pillows and blankets", icon: "pillow", available: true },
      { name: "Room-darkening blinds", icon: "blind", available: true },
      { name: "Iron", icon: "iron", available: true },
      { name: "Clothes storage", icon: "closet", available: true },
    ],
  },
  {
    title: "Entertainment",
    items: [{ name: "TV", note: "Smart TV with Airtel cable and OTT.", icon: "tv", available: true }],
  },
  {
    title: "Heating and cooling",
    items: [
      {
        name: "Air conditioning",
        note: "Three bedrooms have air conditioning. One bedroom does not.",
        icon: "snow",
        available: true,
      },
      { name: "Heating", note: "This house does not have heating.", icon: "slash", available: false },
    ],
  },
  {
    title: "Internet and office",
    items: [
      { name: "Wifi", note: "High-speed wifi, with inverter backup.", icon: "wifi", available: true },
      { name: "Dedicated workspace", icon: "desk", available: true },
    ],
  },
  {
    title: "Kitchen and dining",
    items: [
      { name: "Kitchen", note: "Space where the group can cook.", icon: "kitchen", available: true },
      { name: "Fridge", icon: "fridge", available: true },
      { name: "Cooking basics", note: "Tea, coffee, sugar, and salt.", icon: "utensils", available: true },
      { name: "Crockery and cutlery", note: "Plates, bowls, glasses, and utensils.", icon: "plate", available: true },
      { name: "Cooker", note: "Gas stove, pressure cooker, and an induction cooker.", icon: "pot", available: true },
      { name: "Kettle", icon: "kettle", available: true },
      { name: "Air fryer", icon: "fryer", available: true },
      { name: "Water purifier", icon: "water", available: true },
      { name: "Dining table", icon: "table", available: true },
    ],
  },
  {
    title: "Parking and facilities",
    items: [
      { name: "Free parking on premises", note: "Parking for 8–10 cars.", icon: "parking", available: true },
      { name: "Self check-in", icon: "key", available: true },
    ],
  },
  {
    title: "Not included",
    items: [
      { name: "Exterior security cameras", note: "Not on the property.", icon: "slash", available: false },
      { name: "Tumble dryer", icon: "slash", available: false },
      {
        name: "Smoke alarm",
        note: "This house may not have a smoke detector. Ask the host if you need one.",
        icon: "slash",
        available: false,
      },
      {
        name: "Carbon monoxide alarm",
        note: "This house may not have a carbon monoxide detector. Ask the host if you need one.",
        icon: "slash",
        available: false,
      },
    ],
  },
];

export const featuredAmenities = [
  "Kitchen",
  "Wifi",
  "Dedicated workspace",
  "Free parking on premises",
  "TV",
  "Washing machine",
  "Air conditioning",
  "Fridge",
];

export function allAmenities() {
  return amenityGroups.flatMap((group) => group.items);
}

export function amenityByName(name: string) {
  return allAmenities().find((item) => item.name === name);
}

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  note: string;
  arrive: string;
  depart: string;
  guests: number;
  pickup: boolean;
  pickupPlace: string;
  pickupOther: string;
  dropoff: boolean;
  dropPlace: string;
  dropOther: string;
  meals: Record<MealId, boolean>;
};

export type QuoteLine = {
  label: string;
  amount: number;
};

export type StayQuote = {
  nights: number;
  lines: QuoteLine[];
  total: number;
};

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const knownPlaces = new Set<string>(transferPlaces.flatMap((group) => [...group.places]));

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function nightsOf(arrive: string, depart: string) {
  if (!isoDate.test(arrive) || !isoDate.test(depart) || depart <= arrive) return 0;
  const [ay, am, ad] = arrive.split("-").map(Number);
  const [dy, dm, dd] = depart.split("-").map(Number);
  const start = Date.UTC(ay, am - 1, ad);
  const end = Date.UTC(dy, dm - 1, dd);
  return Math.round((end - start) / 86_400_000);
}

export function quoteStay(input: Pick<EnquiryInput, "arrive" | "depart" | "guests" | "pickup" | "dropoff" | "meals">): StayQuote {
  const nights = nightsOf(input.arrive, input.depart);
  if (nights < 1 || input.guests < 1) return { nights: 0, lines: [], total: 0 };

  const lines: QuoteLine[] = [
    { label: `${inr(rates.nightly)} × ${nights} ${nights === 1 ? "night" : "nights"}`, amount: rates.nightly * nights },
  ];

  if (input.pickup || input.dropoff) {
    const label = input.pickup && input.dropoff ? "Pickup and drop" : input.pickup ? "Pickup" : "Drop";
    lines.push({ label, amount: rates.transfer });
  }

  for (const meal of mealOptions) {
    if (input.meals[meal.id]) {
      lines.push({
        label: `${meal.label} · ${inr(rates.meal)} × ${input.guests} ${input.guests === 1 ? "guest" : "guests"}`,
        amount: rates.meal * input.guests,
      });
    }
  }

  return { nights, lines, total: lines.reduce((sum, line) => sum + line.amount, 0) };
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function placeError(label: string, place: string, other: string) {
  if (!place) return `Choose a ${label} place.`;
  if (place === "other") return other ? "" : `Write the ${label} address.`;
  if (!knownPlaces.has(place)) return `Choose a ${label} place from the list.`;
  return "";
}

export function parseEnquiry(body: unknown): { ok: true; value: EnquiryInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "The request was empty." };
  const raw = body as Record<string, unknown>;
  const mealsRaw = raw.meals && typeof raw.meals === "object" ? (raw.meals as Record<string, unknown>) : {};
  const guests = typeof raw.guests === "number" ? raw.guests : Number(raw.guests);

  const value: EnquiryInput = {
    name: text(raw.name, 80),
    phone: text(raw.phone, 24),
    email: text(raw.email, 120),
    note: text(raw.note, 800),
    arrive: text(raw.arrive, 10),
    depart: text(raw.depart, 10),
    guests,
    pickup: raw.pickup === true,
    pickupPlace: text(raw.pickupPlace, 120),
    pickupOther: text(raw.pickupOther, 160),
    dropoff: raw.dropoff === true,
    dropPlace: text(raw.dropPlace, 120),
    dropOther: text(raw.dropOther, 160),
    meals: {
      breakfast: mealsRaw.breakfast === true,
      lunch: mealsRaw.lunch === true,
      dinner: mealsRaw.dinner === true,
    },
  };

  if (value.name.length < 2) return { ok: false, error: "Add your name." };
  if (value.phone.length < 8) return { ok: false, error: "Add a phone or WhatsApp number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return { ok: false, error: "Add a valid email." };
  if (!isoDate.test(value.arrive) || !isoDate.test(value.depart) || value.depart <= value.arrive) {
    return { ok: false, error: "Choose a check-in and a later check-out." };
  }
  if (!Number.isInteger(value.guests) || value.guests < 1 || value.guests > rates.maxGuests) {
    return { ok: false, error: `Choose between 1 and ${rates.maxGuests} guests.` };
  }

  if (value.pickup) {
    const problem = placeError("pickup", value.pickupPlace, value.pickupOther);
    if (problem) return { ok: false, error: problem };
  }
  if (value.dropoff) {
    const problem = placeError("drop", value.dropPlace, value.dropOther);
    if (problem) return { ok: false, error: problem };
  }

  return { ok: true, value };
}

export function placeLabel(place: string, other: string) {
  if (place === "other") return other.trim();
  return place;
}

export const listingCopy = {
  title: "Rain Homestay",
  subtitle: "Entire home in Kakkanad, Kochi",
  specs: ["4 bedrooms", "3 bathrooms", "One group at a time"],
  highlights: [
    {
      icon: "pin",
      title: "In Kakkanad, near Infopark",
      text: "Satellite Township, Padamughal. About 3 km from Infopark, off the main traffic.",
    },
    {
      icon: "check",
      title: "Full kitchen, laundry, and free parking",
      text: "A gas stove, air fryer, and utensils, a top-load washing machine, and parking for 8–10 cars.",
    },
    {
      icon: "home",
      title: "Spacious, for the whole group",
      text: "Four bedrooms for families, friends, and business travellers. The house is never shared.",
    },
  ],
  about: [
    "Relax with the whole family at this peaceful house. It is spacious, and it suits families, friends, and business travellers.",
    "The entire home is yours for the stay. One group at a time.",
  ],
  space: [
    "A 4,000 sq ft house with four bedrooms and three bathrooms — two attached, and one shared. Three bedrooms have air conditioning. One bedroom does not.",
    "Self check-in. An 80 ft timber verandah, living halls, and a kitchen with a gas stove, induction cooker, pressure cooker, pans, plates, glasses, bowls, a kettle, an air fryer, and a water purifier. Tea, coffee, sugar, and salt are in the kitchen.",
    "Smart TV with Airtel cable and OTT, high-speed wifi, and inverter backup. Hot water through the day and night. A top-load washing machine.",
  ],
  access: "The entire house is for your group. Living halls, kitchen, verandah, and parking stay with the one booking.",
  around:
    "Uber and Rapido are easy to call. Swiggy and Zomato deliver to the house. Instamart and Blinkit deliver groceries. Aryas, Kovai Bhavan, Al-Taza, Barbeque Nation, Palaram, Chiyang, Hoy Punjab, and Club Shawaya are among the restaurants nearby.",
};
