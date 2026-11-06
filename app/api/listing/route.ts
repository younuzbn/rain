import { amenityGroups, listingCopy, nearby, rates } from "@/lib/stay";
import { house } from "@/lib/site";

export async function GET() {
  return Response.json({
    listing: {
      name: house.name,
      subtitle: listingCopy.subtitle,
      specs: listingCopy.specs,
      address: house.address,
      geo: { lat: house.lat, lng: house.lng },
      phone: house.phoneTel,
      email: house.email,
      nearby,
      amenities: amenityGroups,
      rates: {
        currency: "INR",
        nightly: rates.nightly,
        transfer: rates.transfer,
        mealPerGuest: rates.meal,
        maxGuests: rates.maxGuests,
      },
    },
  });
}
