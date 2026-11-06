export const transferPlaces = [
  {
    label: "Airport",
    places: ["Cochin International Airport, Nedumbassery"],
  },
  {
    label: "Railway stations",
    places: [
      "Ernakulam Junction (South)",
      "Ernakulam Town (North)",
      "Aluva",
      "Angamaly",
      "Tripunithura",
      "Edappally",
      "Kalamassery",
      "North Paravur",
      "Chowara",
      "Karukutty",
      "Chottanikkara Road",
      "Mulanthuruthy",
      "Kanjiramattom",
      "Piravom Road",
      "Kumbalam",
    ],
  },
  {
    label: "Bus stands",
    places: [
      "Vyttila Mobility Hub",
      "Ernakulam KSRTC Bus Station, MG Road",
      "Ernakulam Jetty KSRTC, Boat Jetty",
      "Kaloor Bus Stand",
      "Fort Kochi Bus Stand",
      "Aluva KSRTC Bus Station",
      "Angamaly KSRTC Bus Station",
      "Angamaly Private Bus Stand",
      "Tripunithura Bus Stand",
      "North Paravur KSRTC Bus Stand",
      "North Paravur Private Bus Stand",
      "Perumbavoor KSRTC Bus Stand",
      "Perumbavoor Private Bus Stand",
      "Muvattupuzha KSRTC Bus Stand",
      "Kothamangalam KSRTC Bus Stand",
      "Kothamangalam Private Bus Stand",
      "Piravom KSRTC Bus Stand",
      "Koothattukulam KSRTC Bus Stand",
    ],
  },
] as const;

export const mealOptions = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
] as const;

export type MealId = (typeof mealOptions)[number]["id"];
