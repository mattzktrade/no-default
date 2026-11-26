import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SITE } from "./content";

const enquirySchema = z.object({
  funnel: z.enum(["b2b", "food"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(200).optional().default(""),
  note: z.string().trim().max(4000).optional().default(""),
  size: z.string().trim().max(40).optional().default(""),
  kind: z.string().trim().max(40).optional().default(""),
  hurts: z.array(z.string().max(80)).max(12).optional().default([]),
  honeypot: z.string().max(200).optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

function bodyText(data: EnquiryInput): string {
  if (data.funnel === "food") {
    return [
      "Enquiry: Pub/food website",
      `Name: ${data.name}`,
      `Pub: ${data.organisation || "—"}`,
      `Kind: ${data.kind || "—"}`,
      `What's not working: ${data.hurts.length ? data.hurts.join(", ") : "—"}`,
      "",
      data.note || "",
    ].join("\n");
  }
  return [
    `Name: ${data.name}`,
    `Company: ${data.organisation || "—"}`,
    `Team size: ${data.size || "—"}`,
    `What hurts: ${data.hurts.length ? data.hurts.join(", ") : "—"}`,
    "",
    data.note || "",
  ].join("\n");
}

export function mailtoHref(data: Omit<EnquiryInput, "honeypot">): string {
  const subject =
    data.funnel === "food"
      ? `Pub website chat: ${data.organisation || data.name}`
      : `Chat request: ${data.organisation || data.name}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText({ ...data, honeypot: "" }))}`;
}

export const sendEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }) => {
    if (data.honeypot) return { ok: true as const };

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("Email is not configured yet.");
    }

    const subject =
      data.funnel === "food"
        ? `Pub website chat: ${data.organisation || data.name}`
        : `Chat request: ${data.organisation || data.name}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `no default <${SITE.email}>`,
        to: [SITE.email],
        reply_to: data.email,
        subject,
        text: bodyText(data),
      }),
    });

    if (!response.ok) {
      console.error("Resend failed", await response.text());
      throw new Error("Could not send the message.");
    }

    return { ok: true as const };
  });
