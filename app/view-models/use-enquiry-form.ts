import { useState, type FormEvent } from "react";

import { CONTACT, ENQUIRY_TYPES } from "@/models/selfswift-content";

type EnquiryType = (typeof ENQUIRY_TYPES)[number]["id"];

const FIELDS = [
  ["name", CONTACT.form.name],
  ["email", CONTACT.form.email],
  ["organization", CONTACT.form.organization],
  ["role", CONTACT.form.role],
  ["region", CONTACT.form.region],
  ["stores", CONTACT.form.stores],
  ["sells", CONTACT.form.sells],
  ["message", CONTACT.form.message],
] as const;

/**
 * There is no inquiry backend yet, so sending composes an email to CONTACT.email in the
 * visitor's mail app. shortcut: mailto delivery, upgrade to a server action when an inbox/API exists.
 */
export function useEnquiryFormViewModel() {
  const [type, setType] = useState<EnquiryType>("investor");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Honeypot: real visitors never fill the hidden "website" field.
    if (String(data.get("website") ?? "").trim()) return;

    const typeLabel = ENQUIRY_TYPES.find((item) => item.id === type)?.label ?? type;
    const lines = [`${CONTACT.form.iAm}: ${typeLabel}`];
    for (const [key, label] of FIELDS) {
      const value = String(data.get(key) ?? "").trim();
      if (value) lines.push(`${label}: ${value}`);
    }
    const subject = `SelfSwift inquiry from ${String(data.get("name") ?? "").trim()} (${typeLabel})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSubmitted(true);
  };

  return {
    types: ENQUIRY_TYPES,
    type,
    selectType: (next: EnquiryType) => {
      setType(next);
      setSubmitted(false);
    },
    submitted,
    submit,
  };
}
