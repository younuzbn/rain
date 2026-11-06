import { parseEnquiry, quoteStay } from "@/lib/stay";

/**
 * Validates a stay request and prices it.
 * Mail, WhatsApp, and storage plug in here when the house server is ready.
 * This route does not keep the enquiry.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send the request as JSON." }, { status: 400 });
  }

  const parsed = parseEnquiry(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  const quote = quoteStay(parsed.value);
  const id = `RH-${Date.now().toString(36).toUpperCase()}`;

  return Response.json({
    id,
    status: "received",
    quote,
  });
}
